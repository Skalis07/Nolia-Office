import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // =========================
  // Código que corre en browser
  // =========================
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["scripts/**"],

    plugins: { js },
    extends: ["js/recommended"],

    languageOptions: {
      globals: globals.browser,
    },

    rules: {
      // No bloquear desarrollo ahora
      "no-console": "off",

      // Evitar errores reales
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      // Más claridad en condiciones
      eqeqeq: ["warn", "always"],

      // Evitar bugs con variables no definidas
      "no-undef": "error",
    },
  },

  // =========================
  // Scripts Node.js (build, utils)
  // =========================
  {
    files: ["scripts/**/*.{js,mjs,cjs}"],

    languageOptions: {
      globals: globals.node,
    },
  },
]);
