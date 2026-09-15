const ALLOWED = new Set([
  "query1.finance.yahoo.com",
  "query2.finance.yahoo.com",
  "stooq.com",
  "convextrade.com"
]);

export default async function handler(req, res) {
  try {
    const raw = req.query?.url;
    if (!raw || typeof raw !== "string") {
      return res.status(400).json({ error: "Missing url" });
    }
    const target = new URL(raw);
    if (target.protocol !== "https:" || !ALLOWED.has(target.hostname)) {
      return res.status(403).json({ error: "Target not allowed" });
    }

    const upstream = await fetch(target.toString(), {
      headers: { "User-Agent": "crack-spread-dashboard/1.0" },
      cache: "no-store",
    });

    const body = await upstream.text();
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", upstream.headers.get("content-type") || "text/plain; charset=utf-8");
    return res.status(upstream.status).send(body);
  } catch (err) {
    return res.status(502).json({ error: "Upstream fetch failed", detail: String(err?.message || err) });
  }
}
