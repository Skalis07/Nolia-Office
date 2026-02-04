import type { AssetResolver } from "../../types/index.js";

// ============================================================================
// RESOLVER DE ASSETS
// - Mantiene rutas correctas con BASE_PATH en local y GitHub Pages.
// - asset("audio/x.mp3") => URL absoluta correcta.
// ============================================================================
export function createAssetResolver(baseRaw: string = "/"): AssetResolver {
  const base = baseRaw.endsWith("/") ? baseRaw : `${baseRaw}/`;
  return (path: string) =>
    new URL(String(path).replace(/^\//, ""), location.origin + base).href;
}
