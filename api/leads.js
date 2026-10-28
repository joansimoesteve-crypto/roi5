const db = require('./_db');
module.exports = async (req, res) => {
  if (db.cors(req, res)) return;
  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  if (req.method !== 'POST' || !db.ok() || b.website || !/^\S+@\S+\.\S+$/.test(b.email || '') || !b.consent) return res.status(400).json({ ok: false });
  await db.insert('leads', { name: db.clip(b.name, 100), org: db.clip(b.org, 120), email: db.clip(b.email, 120), kind: db.clip(b.kind, 40), interest: db.clip(b.interest, 60), message: db.clip(b.message, 1000) });
  res.status(200).json({ ok: true });
};
