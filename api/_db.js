const U = process.env.SUPABASE_URL, K = process.env.SUPABASE_SERVICE_KEY;
const H = { apikey: K, Authorization: 'Bearer ' + K, 'Content-Type': 'application/json' };
exports.cors = (req, res) => { res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); if (req.method === 'OPTIONS') { res.status(204).end(); return true; } };
exports.ok = () => !!(U && K);
exports.insert = (table, row) => fetch(`${U}/rest/v1/${table}`, { method: 'POST', headers: { ...H, Prefer: 'return=minimal' }, body: JSON.stringify(row) });
exports.select = async q => (await fetch(`${U}/rest/v1/${q}`, { headers: H })).json();
exports.clip = (v, n) => (typeof v === 'string' ? v.trim().slice(0, n) : null);
