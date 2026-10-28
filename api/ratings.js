const db = require('./_db');
const TYPES = ['page', 'element', 'place', 'web', 'org', 'project'];
module.exports = async (req, res) => {
  if (db.cors(req, res)) return;
  if (req.method !== 'POST' || !db.ok()) return res.status(400).json({ ok: false });
  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  if (!TYPES.includes(b.type) || !(b.mood >= 0 && b.mood <= 4) || !b.subject) return res.status(400).json({ ok: false });
  const p = b.place || {}, num = v => (typeof v === 'number' && isFinite(v) ? v : null);
  await db.insert('ratings', { type: b.type, subject: db.clip(b.subject, 120), site: db.clip(b.site, 120), mood: Math.round(b.mood), tags: Array.isArray(b.tags) ? b.tags.slice(0, 3).map(t => db.clip(t, 30)) : [], comment: db.clip(b.comment, 600), url: db.clip(b.url, 300), address: db.clip(p.address, 200), lat: num(p.lat), lng: num(p.lng) });
  res.status(200).json({ ok: true });
};
