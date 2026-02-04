// ============================================================================
// DETECCIÓN DE FULLSCREEN (F11 / API)
// - Agrega la clase "browser-fullscreen" al <html> cuando corresponde.
// - Esta clase ajusta el layout (por ejemplo --frame-max).
// ============================================================================
type FullscreenOptions = {
  threshold?: number;
};

export function setupFullscreenClass({
  threshold = 8,
}: FullscreenOptions = {}) {
  const root = document.documentElement;

  function isDesktop() {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }

  function detectFullscreen() {
    if (root.classList.contains("embed-notion")) return;

    const apiFullscreen = !!document.fullscreenElement;
    const nearScreen =
      Math.abs(window.innerWidth - screen.width) <= threshold &&
      Math.abs(window.innerHeight - screen.height) <= threshold;

    const active = apiFullscreen || (isDesktop() && nearScreen);
    root.classList.toggle("browser-fullscreen", active);
  }

  window.addEventListener("resize", detectFullscreen, { passive: true });
  document.addEventListener("fullscreenchange", detectFullscreen);
  window.addEventListener("load", detectFullscreen, { once: true });
}
