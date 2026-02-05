# HITO 0 - Fundamentos de Tailwind (explicado desde cero)

Estado actual:
- [x] Documento base creado y revisado.

Este hito es SOLO conceptual. No se toca codigo. La idea es entender como funciona Tailwind y
que significa migrar CSS a Tailwind de forma gradual.

--------------------------------------------------------------------------------
## 1) Que es Tailwind
Tailwind es un framework de CSS utilitario. En vez de escribir clases propias en un archivo CSS,
usas clases pequenas directamente en el HTML/ASTRO.

Ejemplo:
```
<button class="p-2 text-white bg-surface rounded-full">
```

Tailwind "genera" el CSS real para esas clases en el build.

--------------------------------------------------------------------------------
## 2) Que significa "genera el CSS"
Con CSS tradicional:
- Tu escribes `.icon-btn { ... }` y el navegador lo usa.

Con Tailwind:
- Tu escribes clases utilitarias en el markup.
- Tailwind escanea tus archivos y crea un CSS final con SOLO esas clases.
- Si una clase no aparece escrita, NO se genera.

--------------------------------------------------------------------------------
## 3) Que es una clase dinamica y por que es un problema
Ejemplo dinamico:
```
const color = "red"
const className = `bg-${color}-500`
```
Tailwind no ve `bg-red-500` en el archivo y no la genera.

Solucion:
- Usar clases fijas.
- O agregar la clase en `safelist` en tailwind.config.

--------------------------------------------------------------------------------
## 4) Que son tokens
Tokens = valores estables de diseno:
- colores
- tipografias
- espaciados
- sombras
- radios

En lugar de repetir valores directos, los defines una vez y los reusas:
```
colors: { surface: "var(--color-bg)" }
```
Luego usas `bg-surface` en el HTML.

--------------------------------------------------------------------------------
## 5) Que se migra realmente
La migracion NO es solo CSS. Se toca:
- Archivos .astro (porque ahi van las clases)
- `src/styles/index.css` (se elimina CSS viejo)
- `tailwind.config` (tokens y theme)

--------------------------------------------------------------------------------
## 6) Que significa migracion total pero gradual
- Total: al final TODO el CSS custom queda minimo.
- Gradual: migras por bloques y no rompes el sitio.

Regla clave:
No borrar CSS viejo hasta validar que el bloque ya funciona con Tailwind.

--------------------------------------------------------------------------------
## 7) Terminos clave (glosario corto)
- **Utility class**: clase pequena que hace una cosa (ej: `p-2`, `text-white`).
- **@tailwind base/components/utilities**: capas de Tailwind.
- **z-index**: orden de capas (que va arriba o abajo).
- **keyframes**: animaciones definidas en CSS.
- **spacing**: padding, margin, gap repetidos.

--------------------------------------------------------------------------------
## Resultado esperado del Hito 0
- Entender como funciona Tailwind.
- Saber que toca codigo en HTML/ASTRO y CSS.
- Tener claro que la migracion debe ser gradual.
