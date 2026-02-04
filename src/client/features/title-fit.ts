// ============================================================================
// AJUSTE DE TITULO (una sola linea)
// - Escala horizontalmente el texto para evitar salto de linea.
// - Usa ResizeObserver + requestAnimationFrame para suavidad.
// - Se desactiva en embeds de Notion.
// ============================================================================
export function setupTitleFit() {
  try {
    /* -------------------------------------------------------------------------
       SALIDA TEMPRANA PARA NOTION EMBED
       ------------------------------------------------------------------------- */
    if (document.documentElement.classList.contains("embed-notion")) return;

    /* -------------------------------------------------------------------------
       REFERENCIAS AL DOM
       ------------------------------------------------------------------------- */
    const root = document.documentElement;
    const wrap = document.querySelector<HTMLElement>(".title-wrap");
    const title = document.getElementById("pageTitle");
    if (!wrap || !title) return;
    const safeWrap = wrap;
    const safeTitle = title;

    /* -------------------------------------------------------------------------
       VARIABLES DE CONTROL Y CACHÉ
       ------------------------------------------------------------------------- */
    let rafId = 0;
    let lastAvail = NaN;
    let lastScale = NaN;
    let lastSpacing = NaN;
    let lastHeight = NaN;
    let lastFull: boolean | null = null;

    /* -------------------------------------------------------------------------
       CÁLCULO Y APLICACIÓN DEL ESCALADO
       ------------------------------------------------------------------------- */
    // Calcula la escala y la aplica al titulo.
    function computeAndApply() {
      rafId = 0;
      const avail = safeWrap.clientWidth || 0;
      const isFull = root.classList.contains("browser-fullscreen");

      const modeUnchanged = lastFull !== null && isFull === lastFull;
      if (modeUnchanged && isFinite(lastAvail) && Math.abs(avail - lastAvail) < 1)
        return;
      lastAvail = avail;
      lastFull = isFull;

      const prevLetter = safeTitle.style.letterSpacing;
      safeTitle.style.letterSpacing = "0px";
      const base = safeTitle.scrollWidth || 1;
      safeTitle.style.letterSpacing = prevLetter;
      if (!isFinite(base)) return;

      const textLen = (safeTitle.textContent || "").length;
      const gaps = Math.max(1, textLen - 1);

      let spacing = 0;
      let scale = 1;
      let origin = "left top";

      if (avail >= base) {
        if (isFull) {
          const neededSpacing = (avail - base) / gaps;
          const spacingWeight = 0.45;
          const maxSpacing = 3.5;
          spacing = Math.min(maxSpacing, Math.max(0, neededSpacing * spacingWeight));

          const expanded = base + spacing * gaps;
          if (expanded > 0 && expanded < avail) {
            const maxExpandScale = 1.18;
            scale = Math.min(maxExpandScale, avail / expanded);
            if (scale > 1) origin = "center top";
          }
        }
      } else {
        spacing = 0;
        scale = Math.max(0.25, avail / base);
      }

      if (
        !isFinite(lastScale) ||
        Math.abs(scale - lastScale) > 0.005 ||
        Math.abs(spacing - lastSpacing) > 0.25
      ) {
        safeTitle.style.letterSpacing = spacing ? `${spacing}px` : "0px";
        safeTitle.style.transformOrigin = origin;
        safeTitle.style.transform = `scaleX(${scale})`;
        lastScale = scale;
        lastSpacing = spacing;

        const h = safeTitle.getBoundingClientRect().height;
        if (!isFinite(lastHeight) || Math.abs(h - lastHeight) > 0.5) {
          safeWrap.style.height = h + "px";
          lastHeight = h;
        }
      }
    }

    /* -------------------------------------------------------------------------
       PLANIFICACIÓN SUAVIZADA DEL RECÁLCULO
       ------------------------------------------------------------------------- */
    // Evita recálculos innecesarios y agrupa en RAF.
    function schedule() {
      if (rafId) return;
      rafId = requestAnimationFrame(computeAndApply);
    }

    /* -------------------------------------------------------------------------
       OBSERVADORES DE CAMBIO DE TAMAÑO
       ------------------------------------------------------------------------- */
    // Observa cambios de tamaño del contenedor.
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(schedule);
      ro.observe(safeWrap);
    }

    // Fallback de resize + fullscreen API.
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("fullscreenchange", schedule);

    // Si cambia la clase en <html>, recalcula (ej: F11 detectado por script).
    if (typeof MutationObserver !== "undefined") {
      const mo = new MutationObserver(() => schedule());
      mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    }

    // Primera ejecución inicial.
    schedule();
  } catch (err) {
    console.error("Title fit error:", err);
  }
}
