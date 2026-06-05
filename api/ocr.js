export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { fileData, mimeType, fileName } = req.body;
    if (!fileData) return res.status(400).json({ error: '파일 없음' });

    const base64Content = fileData.includes(',') ? fileData.split(',')[1] : fileData;

    // OCR.space API 호출
    const formData = new URLSearchParams();
    formData.append('apikey', process.env.OCR_API_KEY || 'K89320929588957');
    formData.append('base64Image', 'data:' + (mimeType || 'application/pdf') + ';base64,' + base64Content);
    formData.append('language', 'kor');
    formData.append('isOverlayRequired', 'false');
    formData.append('detectOrientation', 'true');
    formData.append('scale', 'true');
    formData.append('OCREngine', '2');
    formData.append('isTable', 'true');

    const ocrRes = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    });

    if (!ocrRes.ok) throw new Error('OCR API 오류: ' + ocrRes.status);

    const ocrData = await ocrRes.json();
    if (ocrData.IsErroredOnProcessing) throw new Error('OCR 오류: ' + ocrData.ErrorMessage);

    const ocrText = ocrData.ParsedResults?.[0]?.ParsedText || '';
    if (!ocrText) return res.status(200).json({ success: true, text: '', parsed: {} });

    console.log('OCR TEXT:', ocrText); // 디버깅용

    const parsed = parseDoc(ocrText);
    return res.status(200).json({ success: true, text: ocrText, parsed });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

function parseDoc(text) {
  const r = {};

  // 띄어쓰기 제거한 버전도 같이 체크
  const compact = text.replace(/\s+/g, '');

  // 재단 접수번호 - 다양한 형태 처리
  // "국부 26-110" 또는 "국부26-110" 또는 "재단 접수번호 국부 26-110"
  const numM = text.match(/(국\s*부|서\s*금)\s*([\d]{2}\s*-\s*[\d]+)/) ||
               text.match(/재단\s*접수번호\s*(국\s*부|서\s*금)\s*([\d]{2}\s*-\s*[\d]+)/);
  if (numM) {
    const prefix = numM[1].replace(/\s/g,'') === '국부' ? '국부' : '서금';
    const num = (numM[2]||numM[3]||'').replace(/\s/g,'');
    r.accNum = prefix + ' ' + num;
  }

  // 사건명 - "사건명 전세금반환소송" 형태
  const caseM = text.match(/사\s*건\s*명\s+([^\n\r\t]+?)(?:\s{2,}|사건번호|$)/m) ||
                text.match(/사건명\s*([^\n\r]+)/);
  if (caseM) r.caseName = (caseM[1]||'').replace(/\s+/g,' ').trim();

  // 의뢰자 - "강 은 지" 형태 (글자 사이 공백 있음)
  // 의뢰자 행 다음 줄에 이름이 나옴
  const clientM = text.match(/의\s*뢰\s*자[\s\S]*?\n\s*([가-힣\s]{2,10})\s*\n/) ||
                  text.match(/의\s*뢰\s*자\s+([가-힣\s]{2,10})(?:\s{2,}|\t)/);
  if (clientM) r.client = (clientM[1]||'').replace(/\s+/g,'').trim();

  // 상대방 - "서 광" 형태
  const opponentM = text.match(/상\s*대\s*방[\s\S]*?\n\s*([가-힣\s]{1,15})\s*\n/) ||
                    text.match(/상\s*대\s*방\s+([가-힣\s]+?)(?:\s{2,}|\n|$)/);
  if (opponentM) r.opponent = (opponentM[1]||'').replace(/\s+/g,' ').trim();

  // 변호사 - "권 우 상" 형태
  const lawyerM = text.match(/변\s*호\s*사\s+([가-힣\s]{2,8})(?:\s*[①인\(◯]|\s*\(인\)|\s*\n)/);
  if (lawyerM) r.lawyer = (lawyerM[1]||'').replace(/\s+/g,'').trim();

  // 착수금/합계 금액
  const amtM = text.match(/착\s*수\s*금\s+([\d,\s]+)/) ||
               text.match(/합\s*계\s+([\d,\s]+)/);
  if (amtM) r.amount = (amtM[1]||'').replace(/[\s,]/g,'').trim();

  // 입금 계좌번호
  const acctM = text.match(/입금\s*계좌번호\s+([^\n\r]+)/) ||
                text.match(/계좌번호\s+([^\n\r]+)/);
  if (acctM) r.account = (acctM[1]||'').trim();

  // 법원명
  const courtM = text.match(/법\s*원\s*명\s+([^\n\r\t\s]+)/);
  if (courtM) r.lawCourt = (courtM[1]||'').trim();

  // 사건번호
  const caseNumM = text.match(/사\s*건\s*번\s*호\s+([^\n\r]+)/);
  if (caseNumM) r.caseNumber = (caseNumM[1]||'').trim();

  // 법무법인 (계좌번호에서 추출)
  if (r.account) {
    const firmM = r.account.match(/법무법인\s*\S+|법률사무소\s*\S+/);
    if (firmM) r.firm = firmM[0];
  }

  return r;
}
