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

    console.log('OCR TEXT:\n', ocrText);
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

  // 재단 접수번호 - 다양한 형태 처리
  for (const line of lines) {
    // "국부 26-110" 또는 "서금 26-110"
    const m1 = line.match(/(국\s*부|서\s*금)\s*(\d{2}\s*-\s*\d+)/);
    if (m1) {
      const prefix = m1[1].replace(/\s/g,'') === '국부' ? '국부' : '서금';
      r.accNum = prefix + ' ' + m1[2].replace(/\s/g,'');
      break;
    }
    // 재단 접수번호 라인
    if (/재단\s*접수번호/.test(line)) {
      const m2 = line.match(/(\d{2}\s*-\s*\d+)/);
      if (m2) { r.accNum = m2[1].replace(/\s/g,''); break; }
    }
    // "법률구조 전 26-110" 형태 (전자계산서)
    const m3 = line.match(/법률구조\s*전\s*(\d{2}\s*-\s*\d+)/);
    if (m3) { r.accNum = m3[1].replace(/\s/g,''); break; }
  }
  // 전체 텍스트에서 XX-숫자 패턴 추출
  if (!r.accNum) {
    const m = text.match(/재단\s*접수번호[^\d]*(2[0-9]\s*-\s*\d+)/) ||
              text.match(/법률구조\s*전\s*(2[0-9]\s*-\s*\d+)/);
    if (m) r.accNum = m[1].replace(/\s/g,'');
  }

  // 사건명: "사건명" 다음 내용, "사건번호" 앞까지
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/사\s*건\s*명\s+(.*)/);
    if (m) {
      // "사건번호" 가 같은 줄에 있으면 그 앞까지만
      let val = m[1].replace(/사건번호.*$/, '').trim();
      val = val.replace(/\s+/g, ' ').trim();
      if (val) { r.caseName = val; break; }
    }
  }

  // 의뢰자: "의 뢰 자" 행 아래 이름 (상대방 이름이 같이 오면 분리)
  for (let i = 0; i < lines.length; i++) {
    if (/의\s*뢰\s*자/.test(lines[i])) {
      // 다음 줄에서 한글 이름 추출 (상대방 이름 제거)
      for (let j = i+1; j < Math.min(i+4, lines.length); j++) {
        const m = lines[j].match(/^([가-힣\s]{2,8}?)(?:\s{3,}|\t)([가-힣\s]{1,10})$/);
        if (m) {
          r.client = m[1].replace(/\s/g,'').trim();
          r.opponent = m[2].replace(/\s/g,'').trim();
          break;
        }
        // 이름만 있는 경우
        const single = lines[j].match(/^([가-힣\s]{2,10})$/);
        if (single && !r.client) {
          r.client = single[1].replace(/\s/g,'').trim();
        }
      }
      break;
    }
  }

  // 상대방: 별도 처리 (의뢰자에서 못 잡은 경우)
  if (!r.opponent) {
    for (let i = 0; i < lines.length; i++) {
      if (/상\s*대\s*방/.test(lines[i])) {
        for (let j = i+1; j < Math.min(i+4, lines.length); j++) {
          const m = lines[j].match(/([가-힣\s]{1,10})\s*$/);
          if (m && !lines[j].includes('의') && !lines[j].includes('뢰')) {
            r.opponent = m[1].replace(/\s/g,'').trim();
            break;
          }
        }
        break;
      }
    }
  }

  // 변호사: "변호사 권 우 상" 형태 - 보수합계/보수 등 제외
  for (const line of lines) {
    const m = line.match(/변\s*호\s*사\s+([가-힣\s]{2,10})(?:\s*[①인\(\)◯]|$)/);
    if (m) {
      const name = m[1].replace(/\s/g,'').trim();
      // 보수, 합계 등 잘못된 값 제외
      if (!['보수합계','보수','합계','회'].includes(name) && name.length >= 2 && name.length <= 4) {
        r.lawyer = name;
        break;
      }
    }
  }

  // 착수금/합계 금액
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
              line.match(/(신한|국민|기업|농협|우리|하나|SC|씨티)\s+[\d\-]+.*/);
    if (m) {
      r.account = (m[1]||m[0]).trim();
      break;
    }
  }

  // 법원명
  for (const line of lines) {
    const m = line.match(/법\s*원\s*명\s+([^\s]+)/);
    if (m) { r.lawCourt = m[1].trim(); break; }
  }

  // 법무법인/사무소
  for (const line of lines) {
    // "법무법인 동북아" 형태
    const m = line.match(/(법무법인\s*[\S가-힣]+|법률사무소\s*[\S가-힣]+)/);
    if (m && !/(계좌|번호|신한|국민|농협|기업|우리|하나)/.test(m[1])) {
      r.firm = m[1].replace(/\s+/g,' ').trim();
      break;
    }
  }
  // 계좌번호 라인에서 법무법인 추출
  if (!r.firm && r.account) {
    const m = r.account.match(/(법무법인\s*[\S가-힣]+|법률사무소\s*[\S가-힣]+)/);
    if (m) r.firm = m[1].replace(/\s+/g,' ').trim();
  }
  // 전체 텍스트에서 마지막 시도
  if (!r.firm) {
    const m = text.match(/(법무법인\s*[가-힣]+)/);
    if (m) r.firm = m[1].replace(/\s+/g,' ').trim();
  }

  return r;
}
