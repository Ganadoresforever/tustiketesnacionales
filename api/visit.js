
let COUNT = 0;

function getClientIP(req) {
  const xfwd = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.headers['x-vercel-forwarded-for'] || '';
  if (Array.isArray(xfwd)) return xfwd[0];
  return String(xfwd).split(',')[0].trim();
}

function getGeo(req) {
  const country = req.headers['x-vercel-ip-country'] || req.headers['x-country'] || '';
  const region  = req.headers['x-vercel-ip-country-region'] || '';
  const city    = req.headers['x-vercel-ip-city'] || '';
  return { country, region, city };
}

async function notifyTelegram(text) {
  const token = process.env.TELEGRAM_TOKEN;
  const chat  = process.env.TELEGRAM_CHAT_ID;
  const enabled = process.env.TELEGRAM_ENABLED ?? '1';
  if (!token || !chat || enabled === '0') return;
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text })
    });
  } catch {}
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'POST') {
    COUNT += 1;
    let body = {};
    try { body = JSON.parse(req.body || '{}'); } catch {}
    const event = body?.event || 'view';
    const page  = body?.page  || '/';
    const ip    = getClientIP(req) || 'desconocida';
    const {country, region, city} = getGeo(req);
    const ua    = (req.headers['user-agent'] || '').slice(0,180);
    const now   = new Date().toISOString().replace('T',' ').slice(0,19);

    const msg   = `Tustiketesbaratos · Nueva visita
Evento: ${event}
Página: ${page}
IP: ${ip}
Geo: ${country || 'NA'}-${region || 'NA'} ${city || ''}
UA: ${ua}
Total (runtime): ${COUNT}
Hora: ${now}`;

    await notifyTelegram(msg);
    return res.status(200).send(JSON.stringify({ count: COUNT }));
  }

  return res.status(200).send(JSON.stringify({ count: COUNT }));
}
