
# Ads Front (Sept 2025)

Tres variantes de landing **compliant** (sin cloaking, sin marcas de terceros, con páginas legales visibles) pensadas para Google Ads.

## Estructura
- `shared.css`: estilos base compartidos
- `variant-1-minimal/` → buscador simple + rutas populares
- `variant-2-grid/` → grid de destinos con CTA
- `variant-3-calendar/` → selector de mes + tips
- `about.html`, `terms.html`, `privacy.html`, `contact.html`

## Cómo usar en Vercel
1. Sube la carpeta completa a un repo (privado o público).
2. En Vercel, crea un proyecto estático apuntando a esta carpeta.
3. Elige una variante para la ruta `/`:
   - Opción A: en Vercel define `Root Directory` a `variant-1-minimal` (o 2/3).
   - Opción B: mantén la raíz y crea un `vercel.json` con rewrites de `/` a la variante.
4. Asegúrate de que el dominio del anuncio coincide con el dominio de destino final (sin redirecciones adicionales).
5. No añadas scripts de rastreo agresivo ni redirecciones por IP/dispositivo.

## Personalización
- Cambia el nombre de marca “PromoNacionales” si lo deseas, evitando marcas registradas de terceros.
- El botón “Buscar vuelos” redirige a `/vuelos` (ajústalo a tu ruta real).
- Añade tu pixel de Google Ads/Analytics de forma estándar (sin ocultamiento).

