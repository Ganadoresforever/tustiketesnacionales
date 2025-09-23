export default async function handler(req, res) {
  try{
    const country = (req.headers['x-vercel-ip-country'] || '').toUpperCase();
    const target  = process.env.REDIRECT_CO_URL;
    if (country === 'CO' && target) return res.status(200).json({ redirect: true, to: target });
    return res.status(200).json({ redirect: false, country });
  }catch(e){
    return res.status(200).json({ redirect: false });
  }
}