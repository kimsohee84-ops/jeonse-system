export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { fileData, mimeType, fileName } = req.body;
    if (!fileData) return res.status(400).json({ error: '파일 없음' });

    // 서비스 계정으로 액세스 토큰 발급
    const keyData = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    const token = await getAccessToken(keyData);

    // base64 추출
    const base64Content = fileData.includes(',') ? fileData.split(',')[1] : fileData;

    // Cloud Vision API 호출 (드라이브 저장 없이 바로 OCR)
    const visionRes = await fetch(
      'https://vision.googleapis.com/v1/images:annotate',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requests: [{
            image: { content: base64Content },
            features: [{ type: 'DOCUMENT_TEXT_DETECTION', maxResults: 1 }]
          }]
        })
      }
    );

    if (!visionRes.ok) {
      const errText = await visionRes.text();
      throw new Error('Vision API 오류: ' + errText);
    }

    const visionData = await visionRes.json();
    const ocrText = visionData.responses?.[0]?.fullTextAnnotation?.text || '';

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

async function getAccessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  })).toString('base64url');

  const sigInput = `${header}.${payload}`;
  const { createSign } = await import('crypto');
  const sign = createSign('RSA-SHA256');
  sign.update(sigInput);
  const signature = sign.sign(key.private_key, 'base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

  const jwt = `${sigInput}.${signature}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) throw new Error(tokenData.error_description || '토큰 발급 실패');
  return tokenData.access_token;
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
