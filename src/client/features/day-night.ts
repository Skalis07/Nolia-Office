import type { AssetResolver } from "../../types/index.js";

// ============================================================================
// MODO DIA / NOCHE
// - Tirita lateral con sol/luna.
// - Aplica overlay y clases visuales.
// - Reproduce sonido al alternar.
// ============================================================================
type DayNightOptions = {
  asset?: AssetResolver;
};

export function setupDayNight({ asset }: DayNightOptions = {}) {
  /* ---------------------------------------------------------------------------
     REFERENCIAS AL DOM
     --------------------------------------------------------------------------- */
  const handle = document.getElementById("rightHandle") as HTMLElement | null;
  const track = document.getElementById("rightTrack") as HTMLElement | null;
  const thumb = document.getElementById("modeThumb") as HTMLElement | null;
  const overlay = document.getElementById("dimOverlay") as HTMLElement | null;

  // Seguridad: si falta algún elemento crítico, abortamos todo el bloque.
  if (!handle || !track || !thumb || !overlay) return;
  const safeHandle = handle;
  const safeTrack = track;
  const safeThumb = thumb;
  const safeOverlay = overlay;

  /* ---------------------------------------------------------------------------
     ICONOS SVG (INLINE) PARA LA BOLITA
     --------------------------------------------------------------------------- */
  // Iconos inline (sol/luna)
  const ICON_SUN =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zm9-10v-2h-3v2h3zm-2.93 7.07l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM12 6a6 6 0 100 12 6 6 0 000-12zm7.24-1.16l-1.8-1.79-1.79 1.79 1.79 1.79 1.8-1.79zM4.84 17.24l-1.79 1.79 1.79 1.79 1.79-1.79-1.79-1.79z"/>' +
    "</svg>";

  const ICON_MOON =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>' +
    "</svg>";

  /* ---------------------------------------------------------------------------
     SONIDO DEL INTERRUPTOR (CLICK DE LA TIRITA)
     - Respeta BASE_PATH con el helper asset().
     --------------------------------------------------------------------------- */
  // Sonido del interruptor (respeta BASE_PATH si viene asset)
  const SWITCH_URL = asset
    ? asset("audio/light_switch.mp3")
    : "audio/light_switch.mp3";
  const switchSfx = new Audio(SWITCH_URL);
  switchSfx.preload = "auto";
  switchSfx.volume = 0.7;
  switchSfx.playbackRate = 1.0;

  // Reproduce el sonido sin romper si el navegador bloquea autoplay.
  function playSwitch() {
    try {
      switchSfx.currentTime = 0;
      const p = switchSfx.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {});
      }
    } catch {
      // Ignorado
    }
  }

  /* ---------------------------------------------------------------------------
     ESTADO INTERNO
     --------------------------------------------------------------------------- */
  let oscuro = false;

  /* ---------------------------------------------------------------------------
     APLICAR ESTADO VISUAL SEGÚN EL MODO
     --------------------------------------------------------------------------- */
  // Aplica clases y el icono correcto.
  function aplicarEstado() {
    safeOverlay.classList.toggle("activo", oscuro);
    safeHandle.classList.toggle("activo", oscuro);
    document.body.classList.toggle("oscuro", oscuro);
    safeThumb.setAttribute("aria-pressed", String(oscuro));
    safeThumb.innerHTML = oscuro ? ICON_MOON : ICON_SUN;
  }

  /* ---------------------------------------------------------------------------
     ANIMACIÓN BREVE DE “ESTIRAMIENTO” DEL RIEL
     --------------------------------------------------------------------------- */
  // Mini animación del riel.
  function estirarTirita() {
    safeTrack.classList.add("stretch");
    setTimeout(() => safeTrack.classList.remove("stretch"), 230);
  }

  /* ---------------------------------------------------------------------------
     CAMBIAR ENTRE MODO DÍA / NOCHE
     --------------------------------------------------------------------------- */
  // Alterna entre día y noche.
  function alternar() {
    oscuro = !oscuro;
    aplicarEstado();
    estirarTirita();
    playSwitch();
  }

  /* ---------------------------------------------------------------------------
     EVENTOS DE INTERACCIÓN
     --------------------------------------------------------------------------- */
  safeTrack.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (target === safeThumb) return;
    alternar();
  });

  safeThumb.addEventListener("click", (e: MouseEvent) => {
    e.stopPropagation();
    alternar();
  });

  // Estado inicial al cargar: modo día
  aplicarEstado();
}
