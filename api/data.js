// 사용자별 회계 데이터 저장/불러오기 (Upstash Redis REST)
// - GET  /api/data?user=<아이디>            → { data: <저장된 JSON> | null }
// - POST /api/data?user=<아이디>  body=JSON  → { ok: true }
// 환경변수: KV_REST_API_URL, KV_REST_API_TOKEN (Upstash 연결 시 자동 생성됨)

const BASE  = process.env.KV_REST_API_URL;
const TOKEN = process.env.KV_REST_API_TOKEN;

function keyFor(user) {
  const safe = String(user || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64);
  return safe ? `jeonse:${safe}` : null;
}

export default async function handler(req, res) {
  if (!BASE || !TOKEN) {
    res.status(500).json({ error: 'storage_not_configured' });
    return;
  }

  const key = keyFor(req.query.user);
  if (!key) {
    res.status(400).json({ error: 'missing_user' });
    return;
  }

  try {
    if (req.method === 'GET') {
      // 이력 조회: /api/data?user=x&history=1 → 최근 백업 목록(최신순)
      if (req.query.history) {
        const r = await fetch(`${BASE}/lrange/${key}:hist/0/9`, {
          headers: { Authorization: `Bearer ${TOKEN}` }
        });
        const j = await r.json();
        res.status(200).json({ history: (j && j.result) || [] });
        return;
      }
      const r = await fetch(`${BASE}/get/${key}`, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });
      const j = await r.json();
      let data = null;
      if (j && j.result) {
        try { data = JSON.parse(j.result); } catch { data = null; }
      }
      res.status(200).json({ data });
      return;
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch { /* keep string */ }
      }
      const value = typeof body === 'string' ? body : JSON.stringify(body || {});

      // ── 자동 백업: 덮어쓰기 전에 현재 값을 이력에 보관(최근 10개) ──
      // 실수로 덮어써도 되돌릴 수 있게 함.
      try {
        const cur = await fetch(`${BASE}/get/${key}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
        const cj = await cur.json();
        if (cj && cj.result) {
          await fetch(`${BASE}/lpush/${key}:hist`, {
            method: 'POST', headers: { Authorization: `Bearer ${TOKEN}` }, body: cj.result
          });
          await fetch(`${BASE}/ltrim/${key}:hist/0/9`, {
            method: 'POST', headers: { Authorization: `Bearer ${TOKEN}` }
          });
        }
      } catch (e) { /* 백업 실패해도 저장은 진행 */ }

      const r = await fetch(`${BASE}/set/${key}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${TOKEN}` },
        body: value
      });
      const j = await r.json();
      res.status(200).json({ ok: true, result: j && j.result });
      return;
    }

    res.status(405).json({ error: 'method_not_allowed' });
  } catch (e) {
    res.status(500).json({ error: String(e && e.message || e) });
  }
}
