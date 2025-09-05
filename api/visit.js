
// Vercel Serverless Function: /api/visit
// Simple anonymous counter. No IP stored, no fingerprint.
let COUNT = 0;

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'POST') {
    COUNT += 1;
    return res.status(200).send(JSON.stringify({ count: COUNT }));
  }
  // GET → read only
  return res.status(200).send(JSON.stringify({ count: COUNT }));
}

/*
For persistence across redeploys, wire Vercel KV (Upstash) and replace the in-memory COUNT with KV get/set.
Example sketch (not enabled here):
import { kv } from '@vercel/kv';
...
if (req.method==='POST'){ const c = (await kv.incr('visits')) || 0; return res.status(200).json({ count: c }); }
if (req.method==='GET'){ const c = (await kv.get('visits')) || 0; return res.status(200).json({ count: c }); }
*/
