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
  // 원본 줄 (탭 보존)
  const rawLines = text.split('\n').filter(l => l.trim());

  // ── 납부확인서(법원 전자납부 영수증) 판별 ──
  // 청구서의 증빙일 뿐이므로 별도 건으로 등록하지 않고 프론트에서 건너뛰게 함.
  // (가상계좌번호를 계좌로 오인식하거나 "미인식" 유령 행이 생기는 문제 방지)
  if (/납\s*부\s*확\s*인\s*서/.test(text) ||
      (/결\s*제\s*확\s*인\s*정\s*보/.test(text) && /가\s*상\s*계\s*좌/.test(text))) {
    return { docType: '납부확인서', skip: true };
  }

  // 재단 접수번호
  // OCR이 "국토부 26:110", "국부 26-110", "(국)26262", "국토부 26.215"(마침표) 등 다양하게 읽음
  // "접수번호" 바로 뒤(최대 20자) 숫자만 추출 → 같은 줄의 계좌번호 등 오인식 방지
  for (const line of lines) {
    if (/재단\s*접수번호/.test(line)) {
      const after = line.replace(/.*재단\s*접수번호/, '').slice(0, 20);
      // "-", ":", "." 모두 구분자로 허용 (예: 26-110, 26:110, 26.215)
      let m = after.match(/(\d{2})\s*[-:.]\s*(\d+)/);
      if (m) { r.accNum = m[1] + '-' + m[2]; break; }
      // "(국)26262" / "(서)26262" 형식 (구분자 없음)
      m = after.match(/[\(（]\s*(?:국|서)\s*[\)）]\s*(\d{2})(\d{3,4})(?!\d)/);
      if (m) { r.accNum = m[1] + '-' + m[2]; break; }
      // 괄호 없이 구분자 없는 5~6자리 숫자: 26262 → 26-262
      m = after.match(/^\s*(\d{2})(\d{3,4})(?!\d)/);
      if (m) { r.accNum = m[1] + '-' + m[2]; break; }
    }
    const m1 = line.match(/(국\s*부|서\s*금)\s*(\d{2})\s*[-:.]\s*(\d+)/);
    if (m1) {
      const prefix = m1[1].replace(/\s/g,'') === '국부' ? '국부' : '서금';
      r.accNum = prefix + ' ' + m1[2] + '-' + m1[3];
      break;
    }
    const m2 = line.match(/국토부[^\d]*(\d{2})\s*[-:.]\s*(\d+)/);
    if (m2) { r.accNum = m2[1] + '-' + m2[2]; break; }
    const m3 = line.match(/서민금융[^\d]*(\d{2})\s*[-:.]\s*(\d+)/);
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
  // OCR 결과: "강은 지	서 광" — 탭으로 구분됨
  for (let i = 0; i < lines.length; i++) {
    if (/의\s*뢰\s*자/.test(lines[i])) {
      for (let j = i+1; j < Math.min(i+5, lines.length); j++) {
        const line = lines[j];
        // 탭으로 구분된 경우 (가장 우선)
        if (line.includes('	')) {
          const parts = line.split('	');
          const c = parts[0].replace(/\s/g,'').trim();
          const o = parts[1] ? parts[1].replace(/\s/g,'').trim() : '';
          if (c && /^[가-힣]{2,8}$/.test(c)) {
            r.client = c;
            if (o && /^[가-힣]{1,8}$/.test(o)) r.opponent = o;
            break;
          }
        }
        // 공백 2칸 이상으로 구분된 경우
        const parts2 = line.split(/\s{2,}/);
        if (parts2.length >= 2) {
          const c = parts2[0].replace(/\s/g,'').trim();
          const o = parts2[parts2.length-1].replace(/\s/g,'').trim();
          if (c && /^[가-힣]{2,8}$/.test(c)) {
            r.client = c;
            if (o && /^[가-힣]{1,8}$/.test(o) && o !== c) r.opponent = o;
            break;
          }
        }
        // 이름 하나만 있는 경우
        const single = line.replace(/\s/g,'');
        if (/^[가-힣]{2,6}$/.test(single) && !r.client) {
          r.client = single;
        }
      }
      break;
    }
  }

  // 상대방 별도 처리
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

  // 금액 (착수금/보수) — 라벨과 다음 라벨 사이 구간에서 마지막 숫자를 채택
  // (취소선으로 정정된 금액이 나란히 적힌 경우, 정정된 값이 뒤에 오는 경우가 많음)
  function lastAmountAfterLabel(labelPattern, stopPattern) {
    // 주의: 멀티라인(m) 플래그를 쓰면 $ 가 줄 끝에 걸려, 라벨과 금액이
    // 서로 다른 줄(표 셀)에 있을 때 다음 줄 금액을 놓친다. 문서 전체 끝($)만
    // 종료로 보도록 m 플래그를 제거한다.
    const re = new RegExp(labelPattern.source + '([\\s\\S]{0,60}?)(?=' + stopPattern.source + '|$)');
    const m = text.match(re);
    if (!m) return null;
    const chunk = m[1];
    const nums = [...chunk.matchAll(/(\d{1,3}(?:,\d{3})+|\d{3,})/g)].map(x => x[1].replace(/,/g,''));
    const valid = nums.filter(n => parseInt(n,10) > 0);
    return valid.length ? valid[valid.length-1] : null;
  }

  // 2단 표(왼쪽 인지대/송달료/보관금 | 오른쪽 착수금/보수)에서 OCR이 행 단위로
  // 읽으면, 오른쪽 칸 금액(예: 착수금 600,000)이 왼쪽 항목(송달료) 줄 뒤에 붙어
  // "마지막 숫자" 방식이 옆 칸 값을 잘못 물어온다. 라벨 뒤 첫 '열 간격'(탭 2개+ 또는
  // 공백 3개+)에서 잘라 같은 칸 숫자만 보게 한다. (같은 칸 내 정정값 처리는 그대로 유지)
  function colAmountAfterLabel(labelPattern, stopPattern) {
    const re = new RegExp(labelPattern.source + '([\\s\\S]{0,60}?)(?=' + stopPattern.source + '|$)');
    const m = text.match(re);
    if (!m) return null;
    const chunk = m[1].split(/\t{2,}| {3,}/)[0];   // 첫 열 간격 앞까지만
    const nums = [...chunk.matchAll(/(\d{1,3}(?:,\d{3})+|\d{3,})/g)].map(x => x[1].replace(/,/g,''));
    const valid = nums.filter(n => parseInt(n,10) > 0);
    return valid.length ? valid[valid.length-1] : null;
  }

  const STOP_LABELS = /착\s*수\s*금|보\s*관\s*금|인\s*지\s*대|송\s*달\s*료|합\s*계|입\s*금\s*계좌|기지급금/;

  // 인지대 / 송달료 / 보관금 — 착수금(보수)보다 먼저 뽑아서, 합계를 보수로 잘못 대체하지 않도록 함
  // 양식: "( O ) 인지대   221,000" / "(0)인지대 221,000" / "(추납) 송달료 100,000원" 등
  // 정정선(취소선)으로 두 금액이 나란히 있거나, 표 셀 특성상 라벨과 금액이 줄바꿈으로 분리된 경우도 처리
  {
    const v = colAmountAfterLabel(/인\s*지\s*대/, STOP_LABELS);
    if (v) r.stamp = v;
  }
  {
    const v = colAmountAfterLabel(/송\s*달\s*료/, STOP_LABELS);
    if (v) r.delivery = v;
  }
  {
    const v = colAmountAfterLabel(/보\s*관\s*금/, STOP_LABELS);
    if (v) r.deposit = v;
  }

  // ── 열 단위로 읽힌 표 보정 ──
  // 어떤 OCR은 표를 "라벨 뭉치 → 값 뭉치"로 읽어, 라벨 바로 뒤에 숫자가 없다.
  //   예)  인지대 / 송달료 / 보관금  (줄줄이)  →  900 / 33,840  (줄줄이)
  // 위 1차 추출로 인지대·송달료가 비었을 때만 동작한다(정상 인식 문서는 건드리지 않음).
  // 라벨이 값 없이 연달아 나온 '라벨 블록' 직후의 숫자들을 순서대로 매핑한다.
  if (!r.stamp || !r.delivery) {
    const isCostLabel = s => /인\s*지\s*대|송\s*달\s*료|보\s*관\s*금/.test(s);
    const keyOf = s => /인\s*지\s*대/.test(s) ? 'stamp' : /송\s*달\s*료/.test(s) ? 'delivery' : 'deposit';
    const numsIn = s => [...s.matchAll(/(\d{1,3}(?:,\d{3})+|\d{3,})/g)].map(x => parseInt(x[1].replace(/,/g,''),10)).filter(n => n > 0);

    const pending = [];        // 값 대기 중인 라벨 큐 (등장 순서)
    const found   = {};        // key -> 금액
    const posAssigned = new Set(); // '값 블록'에서 위치로 배정된 key (= 열 단위 표 신호)
    for (const ln of rawLines) {
      // 보수/착수금/합계/기지급 줄은 소송비용 항목이 아니므로 제외
      if (/착\s*수\s*금|변\s*호\s*사\s*보\s*수|합\s*계|기지급/.test(ln)) continue;
      const label = isCostLabel(ln);
      const nums  = numsIn(ln);
      if (label && nums.length === 0) {
        pending.push(keyOf(ln));                 // 라벨만 → 대기
      } else if (label && nums.length > 0) {
        found[keyOf(ln)] = nums[0];              // 같은 줄에 값 → 바로 배정
      } else if (!label && nums.length > 0 && pending.length > 0) {
        for (const n of nums) { if (pending.length) { const k = pending.shift(); found[k] = n; posAssigned.add(k); } }
      }
    }

    if (posAssigned.size > 0) {
      // 열 단위 표 확정: 마지막 라벨이 값 블록 전체를 빨아들이는 등 1차 추출이 어긋나므로
      // 위치 매핑(found)을 항목 값의 기준으로 삼는다. found에 없는 항목은 오인식으로 보고 제거.
      for (const k of ['stamp','delivery','deposit']) {
        if (found[k] != null) r[k] = String(found[k]);
        else delete r[k];
      }
    } else {
      // 행 단위 등 일반 배치: 비어 있는 항목만 채운다.
      if (!r.stamp    && found.stamp    != null) r.stamp    = String(found.stamp);
      if (!r.delivery && found.delivery != null) r.delivery = String(found.delivery);
      if (!r.deposit  && found.deposit  != null) r.deposit  = String(found.deposit);
    }
  }

  // 금액 (착수금/보수)
  // 1) 착수금이 직접 읽히면 그대로 사용
  // 2) 안 읽히면(예: "보수기준표에 따름" + 손글씨) 합계로 역산:
  //    - 인지대/송달료/보관금이 있으면  보수 = 합계 − (인지대+송달료+보관금)
  //      · 양육비 청구서처럼 합계가 곧 송달료면 결과가 0 → 건너뜀(중복 방지)
  //      · 이 문서처럼 합계에 보수가 포함돼 있으면 손글씨 보수를 역산으로 복구
  //    - 항목이 아예 없으면(순수 착수금 청구서) 합계 자체를 보수로 사용
  {
    const hasItemized = !!(r.stamp || r.delivery || r.deposit);
    let amt = lastAmountAfterLabel(/착\s*수\s*금/, STOP_LABELS);
    if (!amt) {
      const total = lastAmountAfterLabel(/합\s*계/, STOP_LABELS);
      if (total) {
        if (hasItemized) {
          const items = (parseInt(r.stamp)||0) + (parseInt(r.delivery)||0) + (parseInt(r.deposit)||0);
          const fee = parseInt(total) - items;
          if (fee > 0) amt = String(fee);   // 합계 > 소송비용일 때만(보수가 합계에 포함된 경우)
        } else {
          amt = total;
        }
      }
    }
    if (amt) r.amount = amt;
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

  // 사건번호 (예: 2026가단205392, 2026가합12345)
  {
    const m = text.match(/사\s*건\s*번\s*호\s+(\d{4}[가-힣]{1,3}\d+)/);
    if (m) r.courtCaseNum = m[1].trim();
    else {
      const m2 = text.match(/(\d{4}(?:가단|가합|가소|고단|고합|고정|느단|느합|드단|드합|구단|구합|카단|카합|타경|차전|차)\d+)/);
      if (m2) r.courtCaseNum = m2[1].trim();
    }
  }

  return r;
}
