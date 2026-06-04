const { GoogleAuth } = require('google-auth-library');

export default async function handler(req, res) {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileData, mimeType, fileName } = req.body;
    
    if (!fileData) {
      return res.status(400).json({ error: '파일 데이터가 없습니다' });
    }

    // 환경변수에서 서비스 계정 키 로드
    const serviceAccountKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    
    // JWT 토큰 발급
    const auth = new GoogleAuth({
      credentials: serviceAccountKey,
      scopes: ['https://www.googleapis.com/auth/drive']
    });
    const accessToken = await auth.getAccessToken();

    // 1. 구글 드라이브에 파일 업로드 (OCR 변환)
    const base64Data = fileData.split(',')[1] || fileData;
    const byteArray = Buffer.from(base64Data, 'base64');
    
    const metadata = JSON.stringify({
      name: fileName || 'ocr_temp',
      mimeType: 'application/vnd.google-apps.document'
    });

    // multipart 업로드
    const boundary = 'boundary_ocr_upload';
    const body = Buffer.concat([
      Buffer.from(`--${boundary}\r\nContent-Type: application/json\r\n\r\n${metadata}\r\n--${boundary}\r\nContent-Type: ${mimeType || 'application/pdf'}\r\n\r\n`),
      byteArray,
      Buffer.from(`\r\n--${boundary}--`)
    ]);

    const uploadResponse = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': `multipart/related; boundary=${boundary}`,
          'Content-Length': body.length
        },
        body
      }
    );

    if (!uploadResponse.ok) {
      const err = await uploadResponse.text();
      throw new Error(`업로드 실패: ${err}`);
    }

    const { id: fileId } = await uploadResponse.json();

    // 2. OCR 텍스트 추출
    const textResponse = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain`,
      { headers: { 'Authorization': `Bearer ${accessToken}` } }
    );

    const ocrText = await textResponse.text();

    // 3. 임시 파일 삭제
    await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    // 4. 비용청구서 파싱
    const parsed = parseLegalDocument(ocrText);
    
    return res.status(200).json({ 
      success: true, 
      text: ocrText,
      parsed 
    });

  } catch (error) {
    console.error('OCR 오류:', error);
    return res.status(500).json({ error: error.message });
  }
}

function parseLegalDocument(text) {
  const result = {};
  
  // 재단 접수번호
  const numMatch = text.match(/(국부|서금)\s*([\d]{2}-[\d]+)/) || 
                   text.match(/재단\s*접수번호[:\s]*([\d\-]+)/);
  if (numMatch) result.accNum = (numMatch[2] || numMatch[1]).trim();

  // 사건명
  const caseMatch = text.match(/사건명[:\s]*([^\n\r]+)/);
  if (caseMatch) result.caseName = caseMatch[1].trim();

  // 의뢰인
  const clientMatch = text.match(/의\s*뢰\s*자[:\s]*([가-힣\s]+?)(?:\s{2,}|\r|\n)/);
  if (clientMatch) result.client = clientMatch[1].trim();

  // 상대방
  const opponentMatch = text.match(/상\s*대\s*방[:\s]*([가-힣\s]+?)(?:\s{2,}|\r|\n)/);
  if (opponentMatch) result.opponent = opponentMatch[1].trim();

  // 변호사
  const lawyerMatch = text.match(/변\s*호\s*사\s+([가-힣]{2,4})\s*[①인\(]/);
  if (lawyerMatch) result.lawyer = lawyerMatch[1].trim();

  // 착수금/금액
  const amtMatch = text.match(/착\s*수\s*금[:\s]*([\d,]+)/) || 
                   text.match(/합\s*계[:\s]*([\d,]+)/);
  if (amtMatch) result.amount = amtMatch[1].replace(/,/g, '');

  // 계좌번호
  const acctMatch = text.match(/입금\s*계좌번호[:\s]*([^\n\r]+)/);
  if (acctMatch) result.account = acctMatch[1].trim();

  // 사건번호
  const caseNumMatch = text.match(/사건번호[:\s]*([^\n\r]+)/);
  if (caseNumMatch) result.caseNumber = caseNumMatch[1].trim();

  return result;
}
