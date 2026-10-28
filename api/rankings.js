const db = require('./_db');
module.exports = async (req, res) => {
  if (db.cors(req, res)) return;
  if (!db.ok()) return res.status(503).json({ error: 'sin configurar' });
  const rows = await db.select('ratings?select=type,subject,site,mood,lat,lng&order=ts.desc&limit=20000');
  if (!Array.isArray(rows)) return res.status(500).json({});
  const G = { webs: {}, places: {}, projects: {}, orgs: {} };
  for (const r of rows) {
    const k = r.type === 'place' ? 'places' : r.type === 'project' ? 'projects' : r.type === 'org' ? 'orgs' : 'webs';
    const name = k === 'webs' ? (r.site || r.subject) : r.subject; if (!name) continue;
    const g = G[k][name] || (G[k][name] = { name, s: 0, n: 0, la: 0, lo: 0, c: 0 });
    g.s += r.mood + 1; g.n++; if (r.lat != null && r.lng != null) { g.la += r.lat; g.lo += r.lng; g.c++; }
  }
  const out = {}; for (const k in G) out[k] = Object.values(G[k]).map(g => ({ name: g.name, avg: +(g.s / g.n).toFixed(2), n: g.n, lat: g.c ? g.la / g.c : undefined, lng: g.c ? g.lo / g.c : undefined }));
  res.setHeader('Cache-Control', 's-maxage=60'); res.status(200).json(out);
};
