import { createSign } from 'crypto';

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

    console.log('OCR TEXT:', ocrText);
    const parsed = parseDoc(ocrText);
    return res.status(200).json({ success: true, text: ocrText, parsed });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

function parseDoc(text) {
  const r = {};
  const lines = text.split('\n').map(l => l.trim()).filter(l => l);

  // 재단 접수번호
  // OCR이 "국토부 26:110" 또는 "국부 26-110" 등 다양하게 읽음
  // "-" 와 ":" 둘 다 허용
  for (const line of lines) {
    if (/재단\s*접수번호/.test(line)) {
      const m = line.match(/(\d{2})\s*[-:]\s*(\d+)/);
      if (m) { r.accNum = m[1] + '-' + m[2]; break; }
    }
    const m1 = line.match(/(국\s*부|서\s*금)\s*(\d{2})\s*[-:]\s*(\d+)/);
    if (m1) {
      const prefix = m1[1].replace(/\s/g,'') === '국부' ? '국부' : '서금';
      r.accNum = prefix + ' ' + m1[2] + '-' + m1[3];
      break;
    }
    const m2 = line.match(/국토부[^\d]*(\d{2})\s*[-:]\s*(\d+)/);
    if (m2) { r.accNum = m2[1] + '-' + m2[2]; break; }
    const m3 = line.match(/서민금융[^\d]*(\d{2})\s*[-:]\s*(\d+)/);
    if (m3) { r.accNum = m3[1] + '-' + m3[2]; break; }
  }
  if (!r.accNum) {
    const m = text.match(/재단\s*접수번호[^\n]{0,30}?(\d{2})\s*[-:]\s*(\d+)/s);
    if (m) r.accNum = m[1] + '-' + m[2];
  }

  // 사건명
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/사\s*건\s*명\s+(.*)/);
    if (m) {
      let val = m[1].replace(/사건번호.*$/, '').trim();
      val = val.replace(/\s+/g, ' ').trim();
      if (val) { r.caseName = val; break; }
    }
  }

  // 의뢰자 + 상대방
  // "의 뢰 자" 행 다음 줄: "강 은 지          서 광" 형태
  // 또는 각각 따로 있는 경우
  for (let i = 0; i < lines.length; i++) {
    if (/의\s*뢰\s*자/.test(lines[i])) {
      for (let j = i+1; j < Math.min(i+5, lines.length); j++) {
        const line = lines[j];
        // 두 이름이 공백으로 구분된 경우 "강 은 지     서 광"
        // 먼저 긴 공백(3칸 이상)으로 나누기 시도
        const parts = line.split(/\s{2,}/);
        if (parts.length >= 2) {
          const c = parts[0].replace(/\s/g,'').trim();
          const o = parts[parts.length-1].replace(/\s/g,'').trim();
          if (c && /^[가-힣]{2,6}$/.test(c)) {
            r.client = c;
            if (o && /^[가-힣]{1,8}$/.test(o) && o !== c) r.opponent = o;
            break;
          }
        }
        // 이름 하나만 있는 경우
        const single = line.replace(/\s+/g,'');
        if (/^[가-힣]{2,6}$/.test(single) && !r.client) {
          r.client = single;
        }
      }
      break;
    }
  }

  // 상대방 별도 처리 (위에서 못 잡은 경우)
  if (!r.opponent) {
    for (let i = 0; i < lines.length; i++) {
      if (/상\s*대\s*방/.test(lines[i])) {
        for (let j = i+1; j < Math.min(i+4, lines.length); j++) {
          const s = lines[j].replace(/\s/g,'').trim();
          if (/^[가-힣]{1,8}$/.test(s)) {
            r.opponent = s;
            break;
          }
        }
        break;
      }
    }
  }

  // 변호사
  for (const line of lines) {
    const m = line.match(/변\s*호\s*사\s+([가-힣\s]{2,10})(?:\s*[①인\(\)◯]|$)/);
    if (m) {
      const name = m[1].replace(/\s/g,'').trim();
      if (!['보수합계','보수','합계','회'].includes(name) && name.length >= 2 && name.length <= 4) {
        r.lawyer = name;
        break;
      }
    }
  }

  // 금액
  for (const line of lines) {
    const m = line.match(/착\s*수\s*금\s+([\d,\s]+)/) ||
              line.match(/합\s*계\s+([\d,\s]+)/);
    if (m) {
      r.amount = m[1].replace(/[\s,]/g,'').trim();
      if (r.amount && parseInt(r.amount) > 0) break;
    }
  }

  // 입금 계좌번호
  for (const line of lines) {
    const m = line.match(/계\s*좌\s*번\s*호\s+(.+)/) ||
              line.match(/(신한|국민|기업|농협|우리|하나|SC)\s+[\d\-]+.*/);
    if (m) { r.account = (m[1]||m[0]).trim(); break; }
  }

  // 법무법인/사무소
  for (const line of lines) {
    const m = line.match(/(법무법인\s*[\S가-힣]+|법률사무소\s*[\S가-힣]+)/);
    if (m && !/(계좌|번호|신한|국민|농협|기업|우리|하나)/.test(m[1])) {
      r.firm = m[1].replace(/\s+/g,' ').trim();
      break;
    }
  }
  if (!r.firm && r.account) {
    const m = r.account.match(/(법무법인\s*[\S가-힣]+|법률사무소\s*[\S가-힣]+)/);
    if (m) r.firm = m[1].replace(/\s+/g,' ').trim();
  }
  if (!r.firm) {
    const m = text.match(/(법무법인\s*[가-힣]+)/);
    if (m) r.firm = m[1].replace(/\s+/g,' ').trim();
  }

  // 법원명
  for (const line of lines) {
    const m = line.match(/법\s*원\s*명\s+([^\s]+)/);
    if (m) { r.lawCourt = m[1].trim(); break; }
  }

  return r;
}
