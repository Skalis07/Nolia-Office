# Plan de migracion total a Tailwind (gradual y segura)

Este documento es un plan paso a paso para migrar TODO el CSS a Tailwind, pero sin romper nada.
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
  - `@tailwind base;`
  - `@tailwind components;`
  - `@tailwind utilities;`
  - Un bloque pequeno de variables/animaciones especiales
- Eliminar la mayor parte del CSS custom antiguo.
- Mantener el mismo look y comportamiento.

--------------------------------------------------------------------------------
## Hito 1 - Preparacion y levantamiento

Objetivo: entender lo que existe antes de tocarlo.

Pasos:
1. Hacer branch dedicado (ej: `feat/tailwind-migration`).
2. Tomar screenshots de:
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
- Capturas de referencia.

--------------------------------------------------------------------------------
## Hito 2 - Instalacion y configuracion base de Tailwind

Objetivo: tener Tailwind funcionando SIN cambiar estilos aun.

Pasos:
1. Instalar dependencias:
   - tailwindcss
   - postcss
   - autoprefixer
2. Crear config:
   - `tailwind.config.cjs`
   - `postcss.config.cjs`
3. Configurar `content` para Astro:
   - `./src/**/*.{astro,html,js,jsx,ts,tsx}`
4. En `src/styles/index.css`, agregar al inicio:
   - `@tailwind base;`
   - `@tailwind components;`
   - `@tailwind utilities;`
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
## Hito 8 - QA y cierre

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
