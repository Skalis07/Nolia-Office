// ============================================================================
// RELOJ / FECHA
// - Escribe fecha y hora en el elemento indicado.
// - Respeta el idioma del navegador.
// ============================================================================
export function setupClock({ el } = {}) {
  if (!el) return;

  const locale = navigator.language || "es-ES";

  function actualizarReloj() {
    const ahora = new Date();

    const fecha = ahora.toLocaleDateString(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const hora = ahora.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });

    el.textContent = `${fecha}\n${hora}`;
  }

  actualizarReloj();
  setInterval(actualizarReloj, 1000 * 30);
}
