// @ts-check
import { defineConfig } from "astro/config";

/**
 * Detección automática de entorno:
 * - GitHub Pages  → subpath /Nolia-Office/
 * - Vercel (Preview/Production) → raíz /
 * - Docker / local → subpath /Nolia-Office/ (si estás replicando GH Pages)
 *
 * Nota: BASE_PATH permite override explícito.
 */

// 1. Override explícito (máxima prioridad)
const baseFromEnv = process.env.BASE_PATH;

// 2. Detección de Vercel (preview o production)
const isVercel = process.env.VERCEL === "1";

// 3. Base final
const base = baseFromEnv ?? (isVercel ? "/" : "/Nolia-Office/");

export default defineConfig({
  site: "https://Skalis07.github.io/Nolia-Office",
  base,
});
