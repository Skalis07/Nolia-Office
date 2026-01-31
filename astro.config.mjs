// @ts-check
import { defineConfig } from "astro/config";

/**
 * Base:
 * - Default: "/"
 * - GitHub Pages: define BASE_PATH=/Nolia-Office/ en el workflow de deploy.
 *
 * Nota: BASE_PATH permite override explícito.
 */

// 1. Override explícito (máxima prioridad)
const baseFromEnv = process.env.BASE_PATH;

// 2. Base final (raíz por defecto)
const base = baseFromEnv ?? "/";

export default defineConfig({
  site: "https://Skalis07.github.io/Nolia-Office",
  base,
});
