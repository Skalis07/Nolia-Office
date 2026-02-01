// ============================================================================
// RESOLVER DE ASSETS
// - Mantiene rutas correctas con BASE_PATH en local y GitHub Pages.
// - asset("audio/x.mp3") => URL absoluta correcta.
// ============================================================================
export function createAssetResolver(baseRaw = "/") {
  const base = baseRaw.endsWith("/") ? baseRaw : `${baseRaw}/`;
  return (path) =>
    new URL(String(path).replace(/^\//, ""), location.origin + base).href;
}
