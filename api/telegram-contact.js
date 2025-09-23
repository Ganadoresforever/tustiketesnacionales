export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try{
    const { nombre, email, mensaje } = req.body || {};
    const token = process.env.TELEGRAM_TOKEN;
    const chat  = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chat) return res.status(500).json({ ok:false, error:'Missing TELEGRAM envs' });

    const text = `✈️ Nueva consulta\n👤 Nombre: ${nombre || '-'}\n📧 Email: ${email || '-'}\n💬 Mensaje: ${mensaje || '-'}`;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text })
    });
    return res.status(200).json({ ok:true });
  }catch(e){
    return res.status(500).json({ ok:false, error: e.message });
  }
}