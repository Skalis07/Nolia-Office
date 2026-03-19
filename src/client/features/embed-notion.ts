// ============================================================================
// DETECCIÓN DE EMBED EN NOTION
// - Agrega la clase "embed-notion" al <html> cuando la página está embebida.
// - Esto activa estilos especiales para Notion (sin bordes, sin sombra, etc.).
// ============================================================================
function setupEmbedBodyBackground() {
  const setBodyBackground = () => {
    try {
      const isDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.body.style.background = isDark ? "#191919" : "#ffffff";
    } catch {
      document.body.style.background = "#ffffff";
    }
  };

  if (window.matchMedia) {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", setBodyBackground);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(setBodyBackground);
    }
  }

  setBodyBackground();
}

export function setupNotionEmbedClass() {
  const qs = new URLSearchParams(window.location.search);

  const inIframe = (() => {
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  })();

  const referrer = document.referrer || "";
  const ancestorOrigins = Array.from(window.location.ancestorOrigins || []);

  const isNotion =
    qs.has("notion") ||
    qs.has("embed") ||
    /notion\.(so|site|app)/i.test(referrer) ||
    ancestorOrigins.some((origin) => /notion\.(so|site|app)/i.test(origin));

  if (inIframe && isNotion) {
    document.documentElement.classList.add("embed-notion");
    setupEmbedBodyBackground();
  }
}
