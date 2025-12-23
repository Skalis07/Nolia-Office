/* eslint-env node */
// @ts-check
import { defineConfig } from "astro/config";

/**
 * Detección automática de entorno:
 * - GitHub Pages  → subpath /Nolia-Office/
 * - Vercel Preview → raíz /
 * - Docker / local → raíz /
 */

// 1. Override explícito (máxima prioridad)
const baseFromEnv = process.env.BASE_PATH;

// 2. Detección de Vercel Preview
const isVercel = process.env.VERCEL === "1";
const isVercelPreview = isVercel && process.env.VERCEL_ENV === "preview";

// 3. Base final
const base =
  baseFromEnv ??
  (isVercelPreview ? "/" : "/Nolia-Office/");

export default defineConfig({
  site: "https://Skalis07.github.io/Nolia-Office",
  base,
});
