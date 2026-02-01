// ============================================================================
// DETECCIÓN DE EMBED EN NOTION
// - Agrega la clase "embed-notion" al <html> cuando la página está embebida.
// - Esto activa estilos especiales para Notion (sin bordes, sin sombra, etc.).
// ============================================================================
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
  }
}
