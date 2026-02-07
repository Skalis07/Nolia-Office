# Historial completo de migracion a Tailwind

Este documento consolida el plan y todos los hitos ejecutados durante la migracion a Tailwind.

Se preservan explicaciones y fragmentos de codigo tal como fueron documentados en cada hito.

## Recomendacion
Si quieres comparar visuales de forma rapida, toma screenshots antes/despues (opcional).

## Estado de hitos (ticket de realizado)

- ✅ Hito 0 — Fundamentos

- ✅ Hito 1 — Preparacion e inventario

- ✅ Hito 2 — Instalacion y config base

- ✅ Hito 3 — Tokens y config

- ✅ Hito 4 — Controles (barra)

- ✅ Hito 5 — Layout/Frame/Titulo

- ✅ Hito 6 — Day/Night + Overlay

- ✅ Hito 7 — Responsive/Notion/Fullscreen



---


# PLAN TAILWIND


# Plan de migracion total a Tailwind (gradual y segura)

Este documento es un plan paso a paso para migrar la mayor parte del CSS a Tailwind (dejando excepciones necesarias), pero sin romper nada.
La idea es avanzar por hitos, validar en cada paso y solo despues borrar CSS viejo.

--------------------------------------------------------------------------------
## 0) Conceptos basicos (para empezar desde cero) ✅

### Que es Tailwind
Tailwind es un framework de CSS utilitario. En vez de escribir muchas clases en un archivo CSS,
usas clases pequeñas en el HTML/Astro:

Ejemplo:
```
<div class="flex items-center gap-4 text-sm text-white">
```

Esto significa:
- flex: display flex
- items-center: align-items center
- gap-4: separacion entre hijos
- text-sm: tamano de texto
- text-white: color del texto

### Por que usarlo
- Menos CSS manual.
- Consistencia de estilos.
- Cambios rapidos en el mismo archivo donde esta el HTML.
- Escala mejor cuando crece el proyecto.

### Cosas importantes
- Tailwind escanea tus archivos y SOLO genera las clases que usas.
- Si una clase es dinamica (ej: `bg-${color}`), Tailwind no la ve.
  En ese caso se usa `safelist` o clases fijas.
- Puedes definir tus colores/espaciados/typography en `tailwind.config`.

--------------------------------------------------------------------------------
## Objetivo final de la migracion

- Dejar `src/styles/index.css` con:
  - `@import "tailwindcss";`
  - `@config "../../tailwind.config.cjs";`
  - Un bloque pequeno de variables/animaciones especiales
- Eliminar la mayor parte del CSS custom antiguo.
- Mantener el mismo look y comportamiento.

--------------------------------------------------------------------------------
## Hito 1 - Preparacion y levantamiento

Objetivo: entender lo que existe antes de tocarlo.

Pasos:
1. Hacer branch dedicado (ej: `feat/tailwind-migration`).
   - Pantalla principal (desktop).
   - Mobile (~360x800).
   - Modo dia/noche.
3. Revisar `src/styles/index.css` y listar:
   - Colores principales.
   - Tipografias.
   - Espaciados recurrentes.
   - Z-index importantes.
   - Animaciones y keyframes.
4. Marcar los bloques de UI:
   - Header / titulo.
   - Frame / GIF.
   - Controles (botones y sliders).
   - Overlay / dim / embed.
5. Definir criterios de exito:
   - Layout igual.
   - Controles iguales.
   - Notion embed sin romper.
6. Acordar el orden de migracion (ver hitos siguientes).

Checklist de salida:
- Lista de tokens (colores, tipografias, etc).
- Lista de bloques a migrar.

--------------------------------------------------------------------------------
## Hito 2 - Instalacion y configuracion base de Tailwind

Objetivo: tener Tailwind funcionando SIN cambiar estilos aun.

Pasos:
1. Instalar dependencias (Astro + Vite):
   - tailwindcss
   - @tailwindcss/vite
   - postcss
   - autoprefixer
2. Crear config:
   - `tailwind.config.cjs`
   - `postcss.config.cjs`
3. Configurar `content` para Astro:
   - `./src/**/*.{astro,html,js,jsx,ts,tsx}`
4. En `src/styles/index.css`, agregar al inicio:
   - `@import "tailwindcss";`
   - `@config "../../tailwind.config.cjs";`
5. Mantener todo tu CSS actual DEBAJO de esas lineas.
6. Ejecutar `npm run dev` y confirmar que todo se ve igual.

Checklist de salida:
- Dev server ok.
- No cambia el layout.

--------------------------------------------------------------------------------
## Hito 3 - Definir tokens (colores, tipografia, spacing)

Objetivo: definir un "lenguaje" de estilos para no repetir valores.

Pasos:
1. Crear variables CSS para tema (dia/noche):
   - `:root { --color-bg: ... }`
   - `.is-night { --color-bg: ... }`
2. En `tailwind.config` mapear colores a variables:
   - `colors: { surface: "var(--color-bg)", ... }`
3. Definir tipografias:
   - `fontFamily` en `theme.extend`
4. Definir espaciados clave si aplican.
5. Probar una clase de ejemplo:
   - `class="bg-surface text-primary"`

Checklist de salida:
- Tokens definidos.
- Ya puedes usar `bg-surface`, `text-primary`, etc.

--------------------------------------------------------------------------------
## Hito 4 - Migrar Controles (botones y sliders)

Objetivo: migrar el bloque mas interactivo primero.

Pasos:
1. Elegir un componente: `ControlsBar.astro`.
2. Listar clases CSS que lo afectan en `index.css`.
3. Mapeo clase por clase a Tailwind:
   - layout: flex, gap, justify, align
   - spacing: padding/margin
   - colors: usar tokens definidos
   - borders: `border`, `rounded`
4. Agregar clases Tailwind en el markup.
5. Dejar CSS antiguo sin borrar aun.
6. Comparar visual vs screenshot.
7. Borrar solo el CSS que ya no se usa.

Checklist de salida:
- Controles se ven igual.
- CSS viejo de controles eliminado.

--------------------------------------------------------------------------------
## Hito 5 - Migrar Layout principal (Frame/GIF)

Objetivo: migrar el "cuerpo" del layout.

Pasos:
1. Migrar `Frame.astro` y `GifFrame.astro`.
2. Revisar reglas de:
   - tamanos
   - posiciones
   - z-index
3. Mover a Tailwind (flex/grid/relative/absolute).
4. Asegurar que el GIF mantiene el ratio correcto.
5. Eliminar CSS viejo de ese bloque.

Checklist de salida:
- Frame y GIF quedan iguales.
- CSS de ese bloque eliminado.

--------------------------------------------------------------------------------
## Hito 6 - Migrar Header/Titulo y overlays

Objetivo: terminar con el resto de UI.

Pasos:
1. Migrar `Title.astro`.
2. Migrar `DimOverlay.astro` y el toggle de dia/noche.
3. Revisar estilos de tipografia:
   - `text-*`
   - `font-*`
   - `tracking-*`
4. Definir animaciones si se usan (ver Hito 7).

Checklist de salida:
- Titulo y overlays ok.
- CSS viejo eliminado.

--------------------------------------------------------------------------------
## Hito 7 - Animaciones y limpieza final

Objetivo: dejar el CSS custom al minimo necesario.

Pasos:
1. Identificar animaciones:
   - mover keyframes a `@layer utilities` o `tailwind.config`.
2. Definir `animation` en `tailwind.config` si se repiten.
3. Borrar reglas viejas no usadas.
4. Dejar `index.css` con:
   - tailwind base/components/utilities
   - variables de tema
   - animaciones que no conviene pasar a Tailwind

Checklist de salida:
- CSS viejo eliminado.
- Build igual visualmente.

--------------------------------------------------------------------------------

Objetivo: asegurar que nada se rompio.

Checklist:
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run dev`
  - musica, lluvia, cambio de GIF, dia/noche
  - responsive basico
  - Notion embed (si aplica)

--------------------------------------------------------------------------------
## Tips y errores comunes

- No uses clases dinamicas (Tailwind no las detecta).
- Si necesitas dinamico, usa `safelist` en config.
- Evita `@apply` salvo casos muy claros.
- Si algo no sale igual, revisa el orden de estilos:
  Tailwind base -> custom CSS -> utilities.

--------------------------------------------------------------------------------
## Resultado esperado

Al final:
- CSS custom minimo.
- UI consistente.
- Cambios de estilo rapidos desde el markup.


---


# HITO 0 ✅ - Fundamentos de Tailwind (explicado desde cero)

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
- Total: al final la mayor parte del CSS custom queda minimo.
- Gradual: migras por bloques y no rompes el sitio.

Regla clave:
No borrar CSS viejo hasta validar que el bloque ya funciona con Tailwind.

--------------------------------------------------------------------------------
## 7) Terminos clave (glosario corto)
- **Utility class**: clase pequena que hace una cosa (ej: `p-2`, `text-white`).
- **@import "tailwindcss"**: entrada única de Tailwind v4 (inyecta base/components/utilities).
- **z-index**: orden de capas (que va arriba o abajo).
- **keyframes**: animaciones definidas en CSS.
- **spacing**: padding, margin, gap repetidos.

--------------------------------------------------------------------------------
## Resultado esperado del Hito 0
- Entender como funciona Tailwind.
- Saber que toca codigo en HTML/ASTRO y CSS.
- Tener claro que la migracion debe ser gradual.

--------------------------------------------------------------------------------
## Salida del Hito 0
- ✅ Conceptos base claros.
- ✅ Glosario minimo revisado.
- ✅ Enfoque gradual entendido.


---


# HITO 1 ✅ - Preparacion e inventario (plan detallado)

Objetivo:
Preparar el terreno para la migracion total a Tailwind SIN romper el sitio.
Aqui solo se ordena, se mide y se define el plan. No se migra CSS aun.

--------------------------------------------------------------------------------
Estado actual:
- [x] Rama de trabajo creada (`feat/tailwind-setup`).
- [x] Inventario de estilos (`docs/architecture/tailwind-tokens.md`).
- [x] Mapa de bloques UI (`docs/architecture/ui-blocks.md`).
- [x] Criterios de exito definidos en este documento.
- [x] Orden de migracion definido.

--------------------------------------------------------------------------------
## 1) Crear rama de trabajo
- Crear una rama dedicada (ej: `feat/tailwind-migration`).
- Todo el trabajo de Tailwind va ahi.

--------------------------------------------------------------------------------
Por que:
- Sirven para comparar antes/despues.
- Detectan cambios sutiles que no se ven rapido.

Que capturar:
1. Desktop (1366x768 aprox) en modo dia.
2. Desktop en modo noche.
3. Mobile (360x800 aprox).
4. Embed Notion (si aplica).

Guardar en:

--------------------------------------------------------------------------------
## 3) Inventario de estilos actuales (desde src/styles/index.css)
Objetivo: listar TODO lo que luego sera token o config en Tailwind.

### 3.1 Colores
Lista en tu CSS actual (ejemplos reales):
- Variables en `:root`:
  - `--color-bg`, `--color-text`, `--color-white`
  - `--color-bar`, `--color-bar-border`
- `--white-65`
- Colores hardcodeados (sin variable):
  - `#fff9e8`, `#fff4d1`, `#6b4a00`, `#ffc400`, `#2e2e2e`
  - `rgba(0,0,0,.45)`

**Accion:** pasar estos colores a tokens en Tailwind o convertirlos a variables CSS.

### 3.2 Tipografias
En tu CSS actual:
- `h1` usa `Arial, sans-serif`
- `.badge-fecha` usa `"Arial Rounded MT Bold", "Arial Rounded MT", Arial, sans-serif`

**Accion:** definir `fontFamily` en `tailwind.config`.

### 3.3 Espaciados recurrentes
Variables actuales:
- `--page-pad`, `--bar-pad`, `--bar-pad-compact`
- `--bar-gap`, `--bar-gap-compact`

Uso de valores repetidos:
- `gap:16px`, `padding:8px`, etc.

**Accion:** mapear espaciados clave en Tailwind o mantenerlos como variables.

### 3.4 Radios, bordes y sombras
Variables actuales:
- `--radius-lg`, `--radius-pill`
- `--border-thick`, `--border-btn`
- `--shadow-card`, `--shadow-bar`, `--shadow-thumb-lg`, `--shadow-handle`, `--shadow-handle-hover`

**Accion:** mapear a `borderRadius`, `boxShadow`, `borderWidth` en Tailwind.

### 3.5 Z-index (capas)
Valores actuales:
- `.title-wrap` -> 10
- `.img-redondeada img` -> 1
- `.badge-fecha` -> 2
- `.barra-musica` -> 20
- `.dim-overlay` -> 25
- `.right-handle` -> 30

**Accion:** documentar y respetar ese orden en Tailwind.

### 3.6 Animaciones y transiciones
En tu CSS:
- `@keyframes stretch`
- Varias `transition` en botones, overlay, etc.

**Accion:** decidir si se pasan a Tailwind (config `animation`) o se mantienen como CSS custom.

--------------------------------------------------------------------------------
## 4) Marcar bloques de UI (que migraremos por partes)
En tu proyecto los bloques son:
1. Barra de controles (`ControlsBar.astro`)
2. Frame/GIF (`Frame.astro`, `GifFrame.astro`)
3. Titulo (`Title.astro`)
4. Toggle dia/noche (`DayNightToggle.astro`)
5. Overlay (`DimOverlay.astro`)
6. Layout base (`BaseLayout.astro`, `index.astro`)

**Accion:** validar este orden antes de migrar.

--------------------------------------------------------------------------------
## 5) Definir criterios de exito
Checklist:
- Layout igual al actual.
- Controles con mismo comportamiento.
- Z-indexes correctos.
- Notion embed sin cortes.
- Responsive ok.

--------------------------------------------------------------------------------
## 6) Definir decision final del alcance
Se acuerda explicitamente:
- Migracion total, pero gradual.
- No borrar CSS viejo hasta validar cada bloque.

--------------------------------------------------------------------------------
## Salida del Hito 1
- ✅ Lista de tokens (colores, tipografias, spacing, sombras).
- ✅ Orden de bloques aprobado.
- ✅ Checklist de exito.
- ✅ Archivos generados: `docs/architecture/tailwind-tokens.md`, `docs/architecture/ui-blocks.md`.


---


# HITO 2 ✅ - Instalacion y activacion base de Tailwind (v4)

Objetivo:
Tener Tailwind funcionando en el proyecto SIN cambiar estilos aun.
Al finalizar este hito, el sitio debe verse exactamente igual.

--------------------------------------------------------------------------------
Estado actual:
- [x] Tailwind instalado con `npx astro add tailwind`.
- [x] `@import "tailwindcss"` activo en `src/styles/index.css`.
- [x] Decision de configuracion avanzada tomada en Hito 3.

--------------------------------------------------------------------------------
## 1) Instalar Tailwind con Astro
Comando recomendado:
```
npx astro add tailwind
```

Esto:
- instala `tailwindcss` y el plugin `@tailwindcss/vite`
- ajusta `astro.config.mjs` para usar el plugin

--------------------------------------------------------------------------------
## 2) Activar Tailwind en el CSS global

En `src/styles/index.css`, al inicio:
```
@import "tailwindcss";
```

Importante:
- Dejar TODO tu CSS actual debajo de ese import.
- Asegurar que `src/styles/index.css` ya se importe en el layout
  (por ejemplo en `BaseLayout.astro`).

--------------------------------------------------------------------------------
## 3) Configuracion avanzada (se decide en Hito 3)

En Tailwind v4 NO necesitas `tailwind.config` ni `postcss.config`
para arrancar. La decision de crear esos archivos se toma en el Hito 3.

--------------------------------------------------------------------------------
## Salida del Hito 2
- ✅ Tailwind esta instalado y funcionando.
- ✅ El CSS viejo sigue intacto.
- ✅ No hay cambios visuales.


---


# HITO 3 ✅ - Tokens base (colores y tipografias)

Objetivo:
Definir un "lenguaje" de estilos (tokens) para no repetir valores,
sin migrar todavia el HTML/Astro.

Prerequisitos:
- HITO 1 y HITO 2 completados.
- Inventario listo en `docs/architecture/tailwind-tokens.md`.

--------------------------------------------------------------------------------
Estado actual:
- [x] `tailwind.config.cjs` creado con tokens reales.
- [x] `postcss.config.cjs` creado.
- [x] Variables base dia/noche ya existen en `src/styles/index.css`.
- [x] `@config` agregado en `src/styles/index.css`.
- [x] Tokens extra (spacing, radios, sombras, z-index, animacion) incluidos.
- [x] Fix visual aplicado: `h1` recupero negrita con `font-weight: 700` en `src/styles/index.css`
      (Preflight de Tailwind elimina la negrita por defecto).

--------------------------------------------------------------------------------
## 1) Decision tomada: usaremos config clasica

Para aprender Tailwind "full", en este hito **SI creamos**:
- `tailwind.config.cjs`
- `postcss.config.cjs`

Esto nos permite:
- definir tokens en `theme.extend`
- practicar el flujo clasico

--------------------------------------------------------------------------------
## 2) Definir los tokens reales en `tailwind.config.cjs`

Los tokens se definen en `theme.extend`.
Se apoyan en tus variables actuales (para respetar dia/noche).

Ejemplo (ya aplicado en el archivo):
```
colors: {
  surface: "var(--color-bg)",
  ink: "var(--color-text)",
  bar: "var(--color-bar)",
  ...
},
fontFamily: {
  title: ["Arial", "sans-serif"],
  badge: ["Arial Rounded MT Bold", ...]
}
```

--------------------------------------------------------------------------------
## 3) Mantener variables base (dia/noche)

Estos son los valores que YA tienes en `docs/architecture/tailwind-tokens.md`.
Los convertimos a tokens con nombres estables.

### Colores basados en variables actuales
(estos respetan dia/noche porque ya cambian en `:root` / `.is-night`)

- `surface`  -> `var(--color-bg)`          -> clases: `bg-surface`, `text-surface`
- `ink`      -> `var(--color-text)`        -> clases: `text-ink`
- `white`    -> `var(--color-white)`       -> clases: `text-white`, `bg-white`
- `bar`      -> `var(--color-bar)`         -> clases: `bg-bar`
- `bar-line` -> `var(--color-bar-border)`  -> clases: `border-bar-line`
- `white-65` -> `var(--white-65)`          -> clases: `text-white-65`

### Colores hardcodeados (no varian con el tema)
(si algun dia necesitas modo noche, los pasamos a variables)

- `paper`      -> `#fff9e8`        -> `bg-paper`
- `paper-2`    -> `#fff4d1`        -> `bg-paper-2`
- `accent`     -> `#ffc400`        -> `text-accent`, `bg-accent`
- `accent-dark`-> `#6b4a00`        -> `text-accent-dark`
- `ink-2`      -> `#2e2e2e`        -> `text-ink-2`
- `shadow-45`  -> `rgba(0,0,0,.45)`-> `shadow-shadow-45` (si lo usamos en shadow)

### Tipografias
- `title` -> `Arial, sans-serif` (para el titulo principal)
- `badge` -> `"Arial Rounded MT Bold", "Arial Rounded MT", Arial, sans-serif`

Reglas:
- Nombres cortos y consistentes (surface/ink/accent).
- Un valor = un nombre (no duplicar).

--------------------------------------------------------------------------------
## 4) Activar la config en el CSS

En `src/styles/index.css`, justo despues del import:
```
@import "tailwindcss";
@config "../../tailwind.config.cjs";
```

Esto conecta el CSS con tu `tailwind.config.cjs`.

Las variables actuales en `:root` y `.is-night` siguen siendo la fuente real.
No se tocan aun. Solo se "mapean" a tokens de Tailwind.

Ejemplo (ya existe en tu CSS):
```
:root {
  --color-bg: #2a5b3d;
  --color-text: #000;
}

.is-night {
  --color-bg: #0f1f16;
  --color-text: #fff;
}
```

--------------------------------------------------------------------------------
## 5) Resultado practico

Ya puedes usar clases como:
- `bg-surface`, `text-ink`, `bg-bar`
- `text-accent`, `bg-paper`
- `font-title`, `font-badge`

--------------------------------------------------------------------------------
## 5.1) Cheatsheet de clases (segun el config actual)

### Espaciados
- `p-page-pad` -> `padding: var(--page-pad)`
- `gap-bar-gap` -> `gap: var(--bar-gap)`
- `gap-bar-gap-compact` -> `gap: var(--bar-gap-compact)`

### Bordes y radios
- `rounded-lg` -> `border-radius: var(--radius-lg)`
- `rounded-pill` -> `border-radius: var(--radius-pill)`
- `border-thick` -> `border-width: var(--border-thick)`
- `border-btn` -> `border-width: var(--border-btn)`

### Sombras
- `shadow-card` -> `var(--shadow-card)`
- `shadow-bar` -> `var(--shadow-bar)`
- `shadow-thumb-lg` -> `var(--shadow-thumb-lg)`
- `shadow-handle` -> `var(--shadow-handle)`
- `shadow-handle-hover` -> `var(--shadow-handle-hover)`

### Z-index
- `z-img` -> 1
- `z-badge` -> 2
- `z-title` -> 10
- `z-bar` -> 20
- `z-overlay` -> 25
- `z-handle` -> 30

### Animaciones

--------------------------------------------------------------------------------
## 6) Tokens extra mas adelante

Si quieres mapear spacing, radius o shadows:
- hazlo en otro paso, cuando ya uses Tailwind en markup.
- evita tocar todo ahora para no mezclar objetivos.

--------------------------------------------------------------------------------
## Salida del Hito 3
- ✅ Tokens definidos en `tailwind.config.cjs` (`theme.extend`).
- ✅ Variables dia/noche siguen intactas.
- ✅ Sin cambios visuales permanentes.


---


# HITO 4 ✅ - Migrar Controles (botones y sliders)

Objetivo:
Migrar el bloque de controles (barra + botones + sliders) a Tailwind
sin cambiar el comportamiento ni el diseño.

Componentes objetivo:
- `src/components/ControlsBar.astro`
- (si aplica) clases relacionadas en `src/styles/index.css`

--------------------------------------------------------------------------------
## 1) Preparacion

1. Identificar todas las clases CSS usadas por los controles:
   - `.barra-musica`
   - `.icon-btn`
   - `.volume-slider`
   - estilos de `input[type="range"]` relacionados
2. Ubicar sus reglas en `src/styles/index.css`.
3. Confirmar tokens disponibles en `tailwind.config.cjs`:
   - colores (`bar`, `bar-line`, `white-65`, etc.)
   - spacing (`bar-pad`, `bar-gap`)
   - bordes (`border-btn`, `border-thick`)
   - radios (`rounded-pill`)
   - sombras (`shadow-bar`). La sombra del thumb se mantiene en CSS puro.

### Resultado 4.1 (hecho)

**Fuentes revisadas**
- `src/components/ControlsBar.astro`: estructura HTML, clases e IDs que usa el cliente (TS/JS).
- `src/styles/index.css`: reglas reales que hoy dan el look & feel.

**Clases/estados activos del bloque**
- `.barra-musica`
  - Base visual: fondo `var(--color-bar)`, borde `4px`, radio `var(--radius-pill)`, padding `var(--bar-pad)`, gap `var(--bar-gap)`, sombra `var(--shadow-bar)`.
  - Comportamiento: `flex`, `align-items:center`, `justify-content:center`, `flex-wrap:nowrap`, `z-index:20`.
  - Estado oscuro: `.oscuro .barra-musica` aplica opacidad y filtro.
  - Contexto: `.frame .barra-musica` fuerza ancho y `margin-top: var(--frame-gap)`.
  - Notion: `html.embed-notion .barra-musica` fuerza `flex-wrap`, padding/gap compactos y sin sombras/bordes.

- `.icon-btn`
  - Tamaño: `44x44` (y `36x36` en mobile chico).
  - Visual: borde `var(--border-btn)`, color `var(--color-white)`, fondo transparente.
  - Estados: `:hover` usa `--white-12`, `.active` usa `--white-18`, `:active` escala leve.
  - SVG interno fijo a `20x20`.
  - Notion: se le quita `box-shadow` por limpieza visual.

- `.volume-slider`
  - Track: alto `var(--slider-track-h)`, fondo `--white-65`, radio `pill`.
  - Thumb: estilos especificos `::-webkit-slider-thumb` y `::-moz-range-thumb`.
  - Responsive: reduce tamano del thumb en moviles.
  - Notion: se reordena y ocupa 100% del ancho (`order:2`, `flex:1 1 100%`).

**Tokens disponibles para mapear a Tailwind**
- Colores: `bar`, `bar-line`, `white`, `white-65`.
- Radios: `rounded-pill`.
- Bordes: `border-btn` (3px). **Nota**: la barra usa borde `4px` -> usar `border-4` (clase nativa).
- Spacing: `bar-pad-x`, `bar-pad-y`, `bar-gap`, `bar-pad-compact-x`, `bar-pad-compact-y`, `bar-gap-compact`.
- Sombras: `shadow-bar`, `shadow-thumb-lg`.
- Z-index: `z-bar`.
- Tamaños utilitarios que calzan: `w-11/h-11` (44px), `w-9/h-9` (36px), `w-5/h-5` (20px).

**Decisiones para la migracion**
- El `input[type=range]` se mantiene en CSS por los pseudo-elementos (Tailwind no cubre `::thumb`/`::track`).
- La barra y los botones si migran a clases Tailwind completas.
- Overrides de Notion y moviles se mantienen; se migran despues de estabilizar el bloque base.

--------------------------------------------------------------------------------
## 2) Migrar estilos del bloque (sin tocar HTML)

Meta: mantener el HTML corto y mover estilos a Tailwind usando `@apply` en CSS.

Estrategia (sin re-trabajo):
1) **No tocar `ControlsBar.astro`**: se mantienen las clases actuales (`barra-musica`, `icon-btn`, `volume-slider`).
2) **Mover estilo base a Tailwind** usando `@apply` en `src/styles/index.css`.
3) **Dejar en CSS solo lo que Tailwind no cubre** (pseudo-elementos del slider + overrides especiales).

Ejemplo de mapeo con `@apply` (se ajusta en el archivo real):
- `.barra-musica` -> `@apply flex items-center justify-center flex-nowrap w-full bg-bar border-4 border-bar-line rounded-pill px-bar-pad-x py-bar-pad-y gap-bar-gap shadow-bar relative z-bar transition duration-200;`
- `.icon-btn` -> `@apply grid place-items-center h-11 w-11 flex-none rounded-full border-btn border-white bg-transparent text-white transition duration-200 active:scale-[.98];`
- `.volume-slider` -> `@apply flex-1 min-w-0 max-w-[320px] h-slider-track-h rounded-pill bg-white-65 cursor-pointer appearance-none outline-none;`

Nota:
Los estilos complejos del slider (thumb/track) siguen en CSS por compatibilidad.

### Resultado 4.2 (hecho)

**Cambios aplicados en `src/styles/index.css`**

> Objetivo: mantener **el mismo orden visual** que tenía el CSS original y mover lo que se puede a Tailwind con `@apply`.

#### `.barra-musica`
**Antes (CSS original)**
```css
width:100%;
margin-inline:auto;
background:var(--turquesa);
border:4px solid var(--borde-claro);
border-radius:var(--radius-pill);
padding:var(--bar-pad);
display:flex;
align-items:center;
justify-content:center;
flex-wrap:nowrap;
gap:var(--bar-gap);
box-shadow:var(--shadow-bar);
position:relative;
z-index:20;
transition:opacity .2s, filter .2s;
```

**Después (Tailwind `@apply`, mismo orden lógico)**
```css
@apply w-full mx-auto;              /* width + margin */
@apply bg-bar;                      /* background (token) */
@apply border-4 border-bar-line;    /* border (token) */
@apply rounded-pill;                /* radius (token) */
@apply px-bar-pad-x py-bar-pad-y;   /* padding (token) */
@apply flex items-center justify-center;
@apply flex-nowrap;
@apply gap-bar-gap;                 /* gap (token) */
@apply shadow-bar;                  /* shadow (token) */
@apply relative z-bar;              /* position + z */
transition: opacity .2s, filter .2s; /* se mantiene */
```
**Importante:** el `background` ya no usa `--turquesa` directo, sino el token `bg-bar`, que apunta al mismo color (`--color-bar`).  
`--turquesa` **se mantiene** porque el slider usa ese valor en el thumb.

#### `.icon-btn`
**Antes (CSS original)**
```css
width:44px; height:44px; flex:0 0 44px;
border-radius:50%;
border:var(--border-btn) solid var(--color-white);
background:transparent;
color:var(--color-white);
display:grid;
place-items:center;
cursor:pointer;
transition:background-color .2s, transform .05s, opacity .2s;
```

**Después (Tailwind `@apply`, mismo orden)**
```css
@apply h-11 w-11 flex-none;              /* size */
@apply rounded-full;                     /* radius */
@apply border-btn border-white;          /* border (token) */
@apply bg-transparent text-white;        /* colors */
@apply grid place-items-center;          /* layout */
@apply cursor-pointer;                   /* cursor */
transition: background-color .2s, transform .05s, opacity .2s;
```

**Icono dentro del botón**
```css
/* Antes */
.icon-btn svg{ width:20px; height:20px; display:block; }

/* Después */
.icon-btn svg{ @apply h-5 w-5; display:block; }
```

**Estados que se dejaron en CSS (no en Tailwind)**
```css
.icon-btn:hover{ background-color:var(--white-12); }
.icon-btn:active{ transform:scale(.98); }
.icon-btn.active{ background-color:var(--white-18); }
```
**Por qué se dejan:** son estados específicos y mantenerlos en CSS hace el HTML más limpio.

#### `.volume-slider`
**Antes (CSS original)**
```css
-webkit-appearance:none; appearance:none;
flex:1 1 160px;
min-width:0;
max-width:320px;
height:var(--slider-track-h);
border-radius:var(--radius-pill);
background:var(--white-65);
outline:none;
cursor:pointer;
```

**Después (Tailwind `@apply`, mismo orden)**
```css
appearance:none;        /* mantiene el reset */
-webkit-appearance:none;
flex:1 1 160px;         /* se mantiene en CSS */
max-width:320px;        /* se mantiene en CSS */
@apply min-w-0;         /* evita overflow */
@apply h-slider-track-h;
@apply rounded-pill;
@apply bg-white-65;
@apply outline-none;
@apply cursor-pointer;
@apply appearance-none;
```

**Pseudoelementos que NO se tocaron**
```css
.volume-slider::-webkit-slider-thumb{ ... }
.volume-slider::-moz-range-thumb{ ... }
.volume-slider::-moz-range-track{ ... }
```
**Por qué se dejan:** Tailwind no puede aplicar estilos a pseudo‑elementos del `range`.

#### Qué NO se migró (y por qué)
- **Variables internas** (`--turquesa`, `--borde-claro`): necesarias para el thumb del slider.
- **Transiciones**: combinaciones específicas, más claro dejarlas en CSS.
- **Estados hover/active**: mantener HTML corto.
- **Overrides de Notion y media queries**: son reglas contextuales y específicas, no ganamos nada migrándolas aún.

#### Resumen del “antes/después”
- **Antes:** CSS puro en `.barra-musica`, `.icon-btn`, `.volume-slider`.
- **Después:** base visual y layout migrados con `@apply`, manteniendo **orden original** y dejando lo no compatible en CSS.

--------------------------------------------------------------------------------
## 4) Limpieza de CSS viejo

Cuando el bloque ya use Tailwind:
- eliminar reglas CSS **solo** de las clases ya migradas.
- dejar intacto el CSS del slider si aun se usa.

### Resultado 4.4 (hecho)
- No hubo duplicados ni reglas viejas separadas que eliminar.
- El bloque ya quedó migrado **in-place**, así que no hay limpieza pendiente.

--------------------------------------------------------------------------------
## Salida del Hito 4
- ✅ Controles migrados a Tailwind.
- ✅ CSS antiguo de controles eliminado (no había duplicado).
- ✅ Slider funcionando igual.

---

# HITO 5 ✅ - Migrar Layout Base + Frame + Título

Objetivo:
Migrar el **layout base** y el **frame del GIF** a Tailwind usando `@apply`,
manteniendo el HTML corto y sin cambiar el diseño.

Archivos objetivo:
- `src/styles/index.css` (único archivo que se toca en este hito)

--------------------------------------------------------------------------------
## Alcance (qué sí se migra en este hito)

Bloques a migrar a `@apply`:

1) **Base / página**
   - `html, body`
   - `body`
   - `.page`

2) **Frame y tarjeta del GIF**
   - `.frame`
   - `.img-redondeada`
   - `.img-redondeada img`
   - `.badge-fecha`

3) **Título**
   - `.title-wrap`
   - `#pageTitle`
   - `h1`

--------------------------------------------------------------------------------
## Fuera de alcance (se dejan en CSS puro y por qué)

- **`background-image: var(--bg-url)`** → Tailwind no genera `background-image` dinámico.
- **`object-fit` / `object-position`** → mejor dejar explícito en CSS (más claro).
- **`font-size: clamp(...)`** → Tailwind no maneja clamp sin clases arbitrarias.
- **`transform`, `transform-origin`, `will-change`, `transition`** → precisión y legibilidad.
- **`@media` y overrides de Notion** → se tocarán en el siguiente hito (para no mezclar).

--------------------------------------------------------------------------------
## 5.1 Preparación (tokens a validar)

Confirmar que estos tokens existen en `tailwind.config.cjs`:
- Colores: `surface`, `ink`, `white`
- Radios: `rounded-lg`, `rounded-pill`
- Bordes: `border-thick`
- Sombras: `shadow-card`
- Spacing: `page-pad`
- Z-index: `title`, `badge`, `img`

Si falta alguno, se agrega **solo si es necesario**.

### Resultado 5.1 (hecho)
- Se reutilizaron tokens existentes; **no** fue necesario agregar nuevos.

--------------------------------------------------------------------------------
## 5.2 Migrar base de página (`html`, `body`, `.page`)

**Antes (CSS directo):**
- `html, body`: `margin: 0`, `overflow-x: hidden`
- `body`: `text-align: center`, `background: var(--color-bg)`
- `.page`: layout flex, `min-height`, padding, gap, `background-image`

**Después (con `@apply`):**
- `@layer base` para `html, body, h1`
- `@layer components` para `.page`

**Qué queda en CSS puro**
- `background-image: var(--bg-url)` y `background-repeat/position/size`

**Motivo**
Separar “layout base” de estilo dinámico sin tocar HTML.

### Resultado 5.2 (hecho)
- `html, body` migrados a `@layer base` con `@apply m-0 overflow-x-hidden`.
- `body` migrado con `@apply text-center bg-surface`.
- `.page` migrado a `@layer components` con `@apply min-h-screen flex flex-col items-center gap-4 px-page-pad pt-page-pad pb-0 relative`.
- Se **mantuvo** el bloque de `background-image/repeat/position/size` en CSS puro.

--------------------------------------------------------------------------------
## 5.3 Migrar Frame del GIF

Clases:
- `.frame`
  - `width:100%` → `@apply w-full`
  - `max-width: var(--frame-max)` → **se mantiene en CSS**
  - `margin-inline:auto` → `@apply mx-auto`

- `.img-redondeada`
  - `max-width` → **se mantiene en CSS**
  - `width:100%` → `@apply w-full`
  - `border-radius` → `@apply rounded-lg`
  - `border` → `@apply border-thick border-white`
  - `box-shadow` → `@apply shadow-card`
  - `overflow:hidden` → `@apply overflow-hidden`
  - `position:relative` → `@apply relative`

- `.img-redondeada img`
  - `display:block` → `@apply block`
  - `width:100%` → `@apply w-full`
  - `height:auto` → `@apply h-auto`
  - `object-fit/position` → se mantiene en CSS

- `.badge-fecha`
  - `position:absolute` → `@apply absolute`
  - `left/bottom` → `@apply left-0 bottom-0`
  - `color` → `@apply text-white`
  - `z-index` → `@apply z-badge`
  - `padding` → se puede mapear a `px-`/`py-` si corresponde, si no, se queda en CSS

**Motivo**
Estas clases son visuales puras y se benefician de tokens consistentes.

### Resultado 5.3 (hecho)
- `.frame` migrado con `@apply w-full mx-auto`, manteniendo `max-width` en CSS.
- `.img-redondeada` migrado con `@apply w-full rounded-lg border-thick border-white shadow-card overflow-hidden relative`, manteniendo `max-width` en CSS.
- `.img-redondeada img` migrado con `@apply block w-full h-auto relative z-img`, manteniendo `object-fit` y `object-position` en CSS.
- `.badge-fecha` migrado con `@apply absolute left-0 bottom-0 text-white font-badge font-black text-left whitespace-pre-line select-none z-badge`, manteniendo `background`, `padding`, `border-top-right-radius`, `font-size clamp`, `line-height` y `letter-spacing` en CSS.

--------------------------------------------------------------------------------
## 5.4 Migrar Título

Clases:
- `.title-wrap`
  - `width/margin-inline` → `@apply w-full mx-auto` (el `max-width` se mantiene en CSS)
  - `overflow: visible` → `@apply overflow-visible`
  - `padding-top: 4px` → `@apply pt-1` (si el valor calza)
  - `position/z-index` → `@apply relative z-title`

- `h1`
  - `margin:0` → `@apply m-0`
  - `color` → `@apply text-ink`
  - `font-family` → `@apply font-title`
  - **importante**: mantener `font-weight:700` porque Tailwind Preflight lo borra

- `#pageTitle`
  - `display:inline-block` → `@apply inline-block`
  - `white-space: nowrap` → `@apply whitespace-nowrap`
  - `line-height` y `font-size clamp` → se mantienen en CSS

**Motivo**
Evitar clases repetidas y mantener tipografía consistente.

### Resultado 5.4 (hecho)
- `.title-wrap` migrado con `@apply w-full mx-auto overflow-visible pt-1 relative z-title`, manteniendo `max-width`, `transition` y `will-change` en CSS.
- `#pageTitle` migrado con `@apply inline-block whitespace-nowrap`, manteniendo `transform-origin`, `line-height`, `font-size clamp`, `transition` y `will-change` en CSS.
- `h1` migrado con `@apply m-0 text-ink font-title font-bold`.

--------------------------------------------------------------------------------
## Salida del Hito 5
- ✅ Layout base migrado con `@apply`.
- ✅ Frame y título migrados sin cambios estructurales.
- ✅ CSS complejo (clamp, background-image, object-fit, overrides Notion) sigue intacto.

---

# HITO 6 ✅ - Migrar Tirita Día/Noche + Dim Overlay

Objetivo:
Migrar la **tirita sol/luna** (day/night) y el **overlay** a Tailwind usando `@apply`,
sin tocar HTML y sin cambiar el diseño.

Archivos objetivo:
- `src/styles/index.css`

--------------------------------------------------------------------------------
## Alcance (qué sí se migra en este hito)

1) **Tirita sol/luna**
   - `.right-handle`
   - `.right-handle .track`
   - `.right-handle .thumb`
   - `.right-handle .thumb svg`
   - `.right-handle.activo .thumb`
   - `:hover` de `.track` y `.thumb` (solo si conviene)

2) **Dim overlay**
   - `.dim-overlay`
   - `.dim-overlay.activo`

--------------------------------------------------------------------------------
## Fuera de alcance (se dejan en CSS puro)

- `@keyframes stretch` (Tailwind no mejora keyframes complejos).
- `calc(...)` (ej. `margin-bottom: calc(var(--thumb)*.5)`).
- `transform` con `translateX` + `scale` (precisión y legibilidad).
- `transition` con múltiples propiedades (se mantiene explícito).

--------------------------------------------------------------------------------
## 6.1 Preparación (tokens a validar)

Confirmar tokens en `tailwind.config.cjs`:
- Colores: `paper`, `paper-2`, `accent`, `accent-dark`, `ink-2`, `shadow-45`
- Sombras: `shadow-handle`, `shadow-handle-hover`, `shadow-thumb-lg`
- Z-index: `overlay`, `handle`

Si falta alguno, se agrega **solo si es necesario**.

### Resultado 6.1 (hecho)
- Tokens ya existían; **no** se agregaron nuevos.

--------------------------------------------------------------------------------
## 6.2 Migrar tirita sol/luna

**Meta:** usar `@apply` para layout, tamaños y colores, manteniendo `calc()` y `transform` en CSS.

Clases:
- `.right-handle`
  - `position:fixed` → `@apply fixed`
  - `top:0` → `@apply top-0`
  - `right:16px` → `@apply right-4`
  - `z-index:30` → `@apply z-handle`
  - `pointer-events:none` → `@apply pointer-events-none`
  - `display:flex` → `@apply flex`
  - `align-items:flex-start` → `@apply items-start`
  - `justify-content:center` → `@apply justify-center`

- `.right-handle .track`
  - `position:relative` → `@apply relative`
  - `width:24px` → `@apply w-6`
  - `background:#fff9e8` → `@apply bg-paper`
  - `border-radius:0` → `@apply rounded-none`
  - `box-shadow:var(--shadow-handle)` → `@apply shadow-handle`
  - `pointer-events:auto` → `@apply pointer-events-auto`
  - `cursor:pointer` → `@apply cursor-pointer`

- `.right-handle .track:hover`
  - `background:#fff4d1` → `@apply bg-paper-2`
  - `box-shadow:var(--shadow-handle-hover)` → `@apply shadow-handle-hover`

- `.right-handle .thumb`
  - `position:absolute` → `@apply absolute`
  - `border-radius:50%` → `@apply rounded-full`
  - `border:var(--border-btn) solid #fff` → `@apply border-btn border-white`
  - `display:grid` → `@apply grid place-items-center`
  - `cursor:pointer` → `@apply cursor-pointer`
  - `color:#6b4a00` → `@apply text-accent-dark`
  - `background:#ffc400` → `@apply bg-accent`
  - `box-shadow:var(--shadow-thumb-lg)` → `@apply shadow-thumb-lg`
  - `pointer-events:auto` → `@apply pointer-events-auto`

- `.right-handle.activo .thumb`
  - `background:#2e2e2e` → `@apply bg-ink-2`
  - `color:#fff` → `@apply text-white`

### Resultado 6.2 (hecho)
- `.right-handle` migrado con `@apply fixed top-0 right-4 z-handle pointer-events-none flex items-start justify-center`.
- `.right-handle .track` migrado con `@apply relative w-6 bg-paper rounded-none shadow-handle pointer-events-auto cursor-pointer`, manteniendo `height`, `margin-bottom`, `transform-origin` y `transition`.
- Hover del track migrado con `@apply bg-paper-2 shadow-handle-hover`.
- `.right-handle .thumb` migrado con `@apply absolute rounded-full border-btn border-white grid place-items-center cursor-pointer text-accent-dark bg-accent shadow-thumb-lg pointer-events-auto`, manteniendo `transform`, `width/height`, `bottom` y `transition`.
- Estado activo (`.right-handle.activo .thumb`) migrado con `@apply bg-ink-2 text-white`.
- `@keyframes stretch` y `.track.stretch` se mantienen en CSS puro.

--------------------------------------------------------------------------------
## 6.3 Migrar dim overlay

- `.dim-overlay`
  - `position:fixed` → `@apply fixed`
  - `inset:0` → `@apply inset-0`
  - `background:rgba(0,0,0,.45)` → `@apply bg-shadow-45`
  - `opacity:0` → `@apply opacity-0`
  - `visibility:hidden` → `@apply invisible`
  - `z-index:25` → `@apply z-overlay`
  - `pointer-events:none` → `@apply pointer-events-none`

- `.dim-overlay.activo`
  - `opacity:1` → `@apply opacity-100`
  - `visibility:visible` → `@apply visible`

### Resultado 6.3 (hecho)
- `.dim-overlay` migrado con `@apply fixed inset-0 bg-shadow-45 opacity-0 invisible z-overlay pointer-events-none`, manteniendo `transition`.
- `.dim-overlay.activo` migrado con `@apply opacity-100 visible`.

--------------------------------------------------------------------------------
## Salida del Hito 6
- ✅ Tirita migrada con `@apply`.
- ✅ Overlay migrado con `@apply`.
- ✅ Keyframes y transforms se mantienen en CSS puro.

---

# HITO 7 ✅ - Migrar Responsive + Overrides Notion + Fullscreen

Objetivo:
Migrar las reglas **contextuales** (responsive + Notion + fullscreen) a Tailwind
cuando sea útil, dejando en CSS puro lo que no aporta claridad.

Archivos objetivo:
- `src/styles/index.css`

--------------------------------------------------------------------------------
## Alcance (qué sí se migra en este hito)

1) **Fullscreen**
   - `html.browser-fullscreen`

2) **Responsive móvil**
   - `@media (max-width:520px)`
   - `@media (max-width:380px)`
   - `@media (max-width:320px)`

3) **Notion embeds**
   - `html.embed-notion`
   - `html.embed-notion body`
   - `html.embed-notion .page`
   - `html.embed-notion .frame`
   - `html.embed-notion .img-redondeada`
   - `html.embed-notion .barra-musica`
   - `html.embed-notion .right-handle`, `.dim-overlay`
   - `html.embed-notion .volume-slider`
   - `html.embed-notion #musicToggle`, `#rainToggle`, `#gifShuffle`

--------------------------------------------------------------------------------
## Fuera de alcance (se dejan en CSS puro)

- `!important` en Notion (necesario para sobrescribir el iframe).
- `@media` y `@supports` (Tailwind no reemplaza reglas con `!important` mejor).
- Reglas que dependen de `calc()` o variables dinámicas.

--------------------------------------------------------------------------------
## 7.1 Preparación (tokens a validar)

Confirmar en `tailwind.config.cjs`:
- Z-index: `overlay`, `handle`
- Spacing: `bar-pad-compact-x`, `bar-pad-compact-y`, `bar-gap-compact`

Si algo falta, se agrega **solo si es necesario**.

### Resultado 7.1 (hecho)
- Tokens existentes fueron suficientes; no se agregaron nuevos.

--------------------------------------------------------------------------------
## 7.2 Fullscreen

`html.browser-fullscreen { --frame-max: min(1400px, 92vw); }`

**Se mantiene en CSS puro** (es una variable con `min()`).

### Resultado 7.2 (hecho)
- Fullscreen se mantiene intacto en CSS.

--------------------------------------------------------------------------------
## 7.3 Responsive móvil

Se pueden migrar reglas simples a `@apply`, por ejemplo:
- `.barra-musica` → `@apply px-bar-pad-compact-x py-bar-pad-compact-y gap-bar-gap-compact`
- `.icon-btn` → `@apply w-9 h-9`
- `.volume-slider` → `@apply max-w-none`

Pero:
- `width:12px` del thumb → se deja en CSS.
- `height:72vh` y `max-height:80vh` en `.img-redondeada` → se deja en CSS.

### Resultado 7.3 (hecho)
- `.barra-musica` → `@apply px-bar-pad-compact-x py-bar-pad-compact-y gap-bar-gap-compact`.
- `.icon-btn` (520px) → `@apply w-9 h-9`, manteniendo `flex-basis:36px` en CSS.
- `.volume-slider` (520px) → `@apply min-w-0 max-w-none`.
- `.frame .img-redondeada` (520px) → `@apply w-full`, manteniendo alturas en CSS.
- `.frame .img-redondeada img` (520px) → `@apply w-full h-full`, manteniendo `object-fit`/`object-position`.
- `.page` (380px) → `@apply px-2 pt-2 pb-0`.
- `.right-handle` (380px) → `@apply right-2`, manteniendo `--strip-h`.
- `.icon-btn` (380px) → `@apply w-10 h-10`.
- `.right-handle` (320px) → `@apply hidden`.

--------------------------------------------------------------------------------
## 7.4 Notion overrides

Se puede migrar **lo básico** a `@apply`, por ejemplo:
- `background:transparent` → `@apply bg-transparent`
- `display:none` → `@apply hidden`
- `max-width:100%` → `@apply max-w-full`

Pero:
- `!important` se mantiene en CSS (Tailwind no lo evita).
- `order`, `flex` y `width` se dejan en CSS si llevan `!important`.

### Resultado 7.4 (hecho)
- Se decidió **mantener overrides de Notion en CSS puro** por el uso de `!important` y reglas específicas.

--------------------------------------------------------------------------------
## Salida del Hito 7
- ✅ Responsive migrado con `@apply` cuando convino.
- ✅ Notion se mantiene en CSS puro (decisión final).
- ✅ Override de Notion en Tailwind: Se decidió mantenerlos en CSS puro por !important y reglas específicas del embed.

---

# Anexos


## ANEXO A — Tailwind Tokens


# Tailwind Tokens - Inventario actual (CSS)

Este archivo resume los valores actuales del CSS para convertirlos en tokens de Tailwind.
Fuente: `src/styles/index.css`.

--------------------------------------------------------------------------------
## Colores (variables en :root)
- --color-bg: #2a5b3d
- --color-text: #000
- --color-white: #fff
- --color-bar: #5aa7a6
- --color-bar-border: rgba(255,255,255,.75)
- --white-65: rgba(255,255,255,.65)

--------------------------------------------------------------------------------
## Colores hardcodeados (sin variable)
Estos aparecen directo en reglas y conviene mapearlos a tokens:
- #fff9e8
- #fff4d1
- #6b4a00
- #ffc400
- #2e2e2e
- rgba(0,0,0,.45)

--------------------------------------------------------------------------------
## Tipografias
- h1: Arial, sans-serif
- .badge-fecha: "Arial Rounded MT Bold", "Arial Rounded MT", Arial, sans-serif

--------------------------------------------------------------------------------
## Espaciados y tamaños base
- --page-pad: 10px
- --bar-pad: 10px 16px
- --bar-pad-compact: 8px 10px
- --bar-gap: 10px
- --bar-gap-compact: 8px
- gap frecuente: 16px (en `.page`)

--------------------------------------------------------------------------------
## Radios, bordes y sombras
- --radius-lg: 20px
- --radius-pill: 9999px
- --border-thick: 5px
- --border-btn: 3px
- --shadow-card: 0 4px 15px rgba(0,0,0,.3)
- --shadow-bar: 0 4px 12px rgba(0,0,0,.25)
- --shadow-thumb-lg: 0 3px 6px rgba(0,0,0,.25)
- --shadow-handle: inset 0 2px 0 rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.15)
- --shadow-handle-hover: inset 0 2px 0 rgba(0,0,0,.1), 0 3px 10px rgba(0,0,0,.2)

--------------------------------------------------------------------------------
## Slider (volumen)
- --slider-track-h: 6px

--------------------------------------------------------------------------------
## Z-index (capas)
- .img-redondeada img: 1
- .badge-fecha: 2
- .title-wrap: 10
- .barra-musica: 20
- .dim-overlay: 25
- .right-handle: 30

--------------------------------------------------------------------------------
## Animaciones y transiciones
- transiciones presentes en botones, barra, overlay y handle

--------------------------------------------------------------------------------
Este inventario se usa para definir `theme.extend` en Tailwind y evitar valores duplicados.


## ANEXO B — UI Blocks


# UI Blocks - Mapa de componentes (para migracion Tailwind)

Este archivo define los bloques visuales que se migraran por partes.
Sirve para no tocar todo de golpe.

--------------------------------------------------------------------------------
## 1) Page shell (layout general)
- `src/layouts/BaseLayout.astro`
- `src/pages/index.astro`

Responsabilidad:
- Estructura base (html, head, body).
- Wrapper principal `.page` y fondo.

--------------------------------------------------------------------------------
## 2) Titulo
- `src/components/Title.astro`

Responsabilidad:
- `.title-wrap`
- `#pageTitle`
- Estilos del h1

--------------------------------------------------------------------------------
## 3) Frame + GIF
- `src/components/Frame.astro`
- `src/components/GifFrame.astro`

Responsabilidad:
- `.frame`
- `.img-redondeada`
- `.badge-fecha`

--------------------------------------------------------------------------------
## 4) Barra de controles
- `src/components/ControlsBar.astro`

Responsabilidad:
- `.barra-musica`
- `.icon-btn`
- `.volume-slider`

--------------------------------------------------------------------------------
## 5) Toggle dia/noche
- `src/components/DayNightToggle.astro`

Responsabilidad:
- `.right-handle`
- `.track`
- `.thumb`

--------------------------------------------------------------------------------
## 6) Overlay
- `src/components/DimOverlay.astro`

Responsabilidad:
- `.dim-overlay`

--------------------------------------------------------------------------------
## 7) Overrides Notion (embed)
Actualmente en `src/styles/index.css` con selectores:
- `html.embed-notion ...`

Responsabilidad:
- Ajustes de layout dentro del iframe de Notion.

--------------------------------------------------------------------------------
## Orden sugerido de migracion
1. Barra de controles
2. Frame + GIF
3. Titulo
4. Toggle dia/noche
5. Overlay
6. Page shell
7. Overrides Notion
