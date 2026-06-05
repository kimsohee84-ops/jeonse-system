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

    // OCR.space API 호출 (무료, 카드 불필요)
    const formData = new URLSearchParams();
    formData.append('apikey', process.env.OCR_API_KEY || 'K89320929588957');
    formData.append('base64Image', 'data:' + (mimeType || 'application/pdf') + ';base64,' + base64Content);
    formData.append('language', 'kor');
    formData.append('isOverlayRequired', 'false');
    formData.append('detectOrientation', 'true');
    formData.append('scale', 'true');
    formData.append('OCREngine', '2');

    const ocrRes = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    });

    if (!ocrRes.ok) {
      throw new Error('OCR API 오류: ' + ocrRes.status);
    }

    const ocrData = await ocrRes.json();
    
    if (ocrData.IsErroredOnProcessing) {
      throw new Error('OCR 처리 오류: ' + ocrData.ErrorMessage);
    }

    const ocrText = ocrData.ParsedResults?.[0]?.ParsedText || '';

    if (!ocrText) {
      return res.status(200).json({ 
        success: true, 
        text: '', 
        parsed: {},
        message: '텍스트를 인식하지 못했습니다'
      });
    }

    const parsed = parseDoc(ocrText);
    return res.status(200).json({ success: true, text: ocrText, parsed });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

function parseDoc(text) {
  const r = {};
  const m = (p) => { const x = text.match(p); return x ? (x[2]||x[1]).trim() : null; };
  
  r.accNum = m(/(국부|서금)\s*([\d]{2}-[\d]+)/) || m(/재단\s*접수번호[:\s]*([\w\-]+)/);
  r.caseName = m(/사건명[:\s]*([^\n\r]+)/);
  r.client = m(/의\s*뢰\s*자[:\s]*([가-힣]+)/);
  r.opponent = m(/상\s*대\s*방[:\s]*([가-힣\s]+?)(?:\s{2,}|\n)/);
  r.lawyer = m(/변호사\s+([가-힣]{2,4})\s*[①인\(◯]/);
  r.amount = m(/착\s*수\s*금[:\s]*([\d,]+)/) || m(/합\s*계[:\s]*([\d,]+)/);
  r.account = m(/입금\s*계좌번호[:\s]*([^\n\r]+)/);
  r.caseNumber = m(/사건번호[:\s]*([^\n\r]+)/);
  r.lawCourt = m(/법원명[:\s]*([^\n\r\s]+)/);

  if (r.amount) r.amount = r.amount.replace(/,/g, '');
  return r;
}
