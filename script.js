// ===== Config Form (Telegram) =====
const TELEGRAM_TOKEN = "8214088433:AAEnRDOL1jLaij9o2S7bEvjD_zp6bFvFkB4";
const TELEGRAM_CHAT = "-4618392153";

// ===== Flights Data (editable) =====
const vuelosNacionales = [
  { ciudad: "Bogotá", desde: "89.000 COP", img: "destino-bog.jpg", tag: "Ida y vuelta" },
  { ciudad: "Medellín", desde: "98.000 COP", img: "destino-med.jpg", tag: "Solo ida" },
  { ciudad: "Cali", desde: "95.000 COP", img: "destino-cal.jpg", tag: "Promo hoy" },
  { ciudad: "Cartagena", desde: "120.000 COP", img: "destino-car.jpg", tag: "Alta demanda" },
  { ciudad: "Barranquilla", desde: "110.000 COP", img: "destino-baq.jpg", tag: "Flexible" },
  { ciudad: "Bucaramanga", desde: "99.000 COP", img: "destino-buc.jpg", tag: "Ida y vuelta" },
  { ciudad: "Pereira", desde: "92.000 COP", img: "destino-per.jpg", tag: "Solo ida" },
  { ciudad: "Santa Marta", desde: "129.000 COP", img: "destino-san.jpg", tag: "Playas" }
];

const vuelosInternacionales = [
  { ciudad: "Miami", desde: "249 USD", img: "destino-miami.jpg", tag: "Ida y vuelta" },
  { ciudad: "Madrid", desde: "499 USD", img: "destino-madrid.jpg", tag: "Escala" },
  { ciudad: "Panamá", desde: "199 USD", img: "destino-panama.jpg", tag: "Directo" },
  { ciudad: "Cancún", desde: "289 USD", img: "destino-cancun.jpg", tag: "Resort" },
  { ciudad: "Santiago", desde: "269 USD", img: "destino-santiago.jpg", tag: "Promo" },
  { ciudad: "Buenos Aires", desde: "329 USD", img: "destino-buenos.jpg", tag: "Ida y vuelta" },
  { ciudad: "Lima", desde: "219 USD", img: "destino-lima.jpg", tag: "Directo" },
  { ciudad: "Ciudad de México", desde: "299 USD", img: "destino-mex.jpg", tag: "Gastronomía" }
];

// ===== Render Helpers =====
function crearCardVuelo(v) {
  const div = document.createElement('div');
  div.className = 'card flight-card';
  div.innerHTML = `
    <div class="flight-media"><img src="${v.img}" alt="Vuelo a ${v.ciudad}" /></div>
    <div class="flight-body">
      <h3>​​ ${v.ciudad}</h3>
      <div class="price">Desde ${v.desde}</div>
      <div class="tags"><span class="tag">${v.tag}</span><span class="tag">Cupos limitados</span></div>
      <div style="margin-top:12px">
        <a href="#contacto" class="btn btn-primary" data-ciudad="${v.ciudad}">Reservar</a>
      </div>
    </div>
  `;
  return div;
}

function renderVuelos() {
  const gN = document.getElementById('grid-nacionales');
  const gI = document.getElementById('grid-internacionales');
  vuelosNacionales.forEach(v => gN.appendChild(crearCardVuelo(v)));
  vuelosInternacionales.forEach(v => gI.appendChild(crearCardVuelo(v)));

  // Prefill message when clicking "Reservar"
  document.querySelectorAll('[data-ciudad]').forEach(btn => {
    btn.addEventListener('click', () => {
      const ciudad = btn.getAttribute('data-ciudad');
      const textarea = document.querySelector('#contactForm textarea[name="mensaje"]');
      if (textarea) {
        textarea.value = `Quiero cotizar vuelo a ${ciudad}. -Fechas:  -Pasajeros: `;
      }
    });
  });
}

// ===== Formulario → Telegram =====
function setupForm() {
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();
    if (!nombre || !email || !mensaje) {
      msg.textContent = "Por favor completa todos los campos.";
      return;
    }
    msg.textContent = "Enviando...";

    const text = encodeURIComponent(`✈️ Informacion de cliente
👤 Nombre: ${nombre}
📧 Email: ${email}
💬 Mensaje: ${mensaje}`);

    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT}&text=${text}`;
      const res = await fetch(url, { method: 'GET', keepalive: true });
      if (res.ok) {
        msg.textContent = "✅ Mensaje enviado con éxito. Te contactaremos pronto.";
        form.reset();
      } else {
        msg.textContent = "❌ Error al enviar. Intenta nuevamente.";
      }
    } catch (err) {
      msg.textContent = "❌ Error de conexión. Intenta nuevamente.";
    }
  });
}

// ===== Visit Tracker (no modificar tu API) =====
function trackVisit() {
  // Intenta con sendBeacon (silencioso); fallback a fetch GET
  const url = "/api/visit.js";
  try {
    if (navigator.sendBeacon) {
      const data = new Blob([JSON.stringify({ t: Date.now(), ref: document.referrer || null })], { type: 'application/json' });
      const ok = navigator.sendBeacon(url, data);
      if (ok) return;
    }
  } catch(_) {}
  // Fallback ligero (no bloqueante)
  fetch(url + "?t=" + Date.now(), { method: "GET", cache: "no-store", keepalive: true }).catch(() => {});
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  renderVuelos();
  setupForm();
  trackVisit();
});
