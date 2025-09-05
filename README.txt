
Tustiketesbaratos · Colombia (landing compliant)
-----------------------------------------------
- 100% Colombia (sin Ecuador), sin marcas de terceros, sin cloaking.
- Index con:
  - Formulario (Origen/Destino/Fecha/Pasajeros) → al enviar, vuelve a "/" como pediste.
  - Tiles de ciudades colombianas con precios promocionales entre 98.000 y 320.000 COP.
  - KPIs (mínimo, promedio, total de rutas, visitas anónimas).
  - Secciones: Cómo funciona, Tips, FAQs, Cumplimiento.
- Páginas legales visibles (about, terms, privacy, contact).
- Stats: /stats.html muestra contador anónimo.
- API /api/visit: contador de visitas (en memoria). Para persistencia usa Vercel KV.

Deploy en Vercel
1) Sube todo este folder a un repo.
2) Importa el repo en Vercel como "Other". Build Command vacío; Output Directory ".".
3) Dominios: añade tu dominio y verifica SSL.
4) (Opcional) Activa Vercel KV y reemplaza el contador de /api/visit por KV para persistencia.
