# HITO 1 - Preparacion e inventario (plan detallado)

Objetivo:
Preparar el terreno para la migracion total a Tailwind SIN romper el sitio.
Aqui solo se ordena, se mide y se define el plan. No se migra CSS aun.

--------------------------------------------------------------------------------
Estado actual:
- [x] Rama de trabajo creada (`feat/tailwind-setup`).
- [ ] Capturas de referencia (pendiente).
- [x] Inventario de estilos (`docs/architecture/tailwind-tokens.md`).
- [x] Mapa de bloques UI (`docs/architecture/ui-blocks.md`).
- [x] Criterios de exito definidos en este documento.
- [x] Orden de migracion definido.

--------------------------------------------------------------------------------
## 1) Crear rama de trabajo
- Crear una rama dedicada (ej: `feat/tailwind-migration`).
- Todo el trabajo de Tailwind va ahi.

--------------------------------------------------------------------------------
## 2) Capturas de referencia (screenshots)
Por que:
- Sirven para comparar antes/despues.
- Detectan cambios sutiles que no se ven rapido.

Que capturar:
1. Desktop (1366x768 aprox) en modo dia.
2. Desktop en modo noche.
3. Mobile (360x800 aprox).
4. Embed Notion (si aplica).

Guardar en:
- `docs/qa/screenshots/` (si quieres dejar registro) o local.

--------------------------------------------------------------------------------
## 3) Inventario de estilos actuales (desde src/styles/index.css)
Objetivo: listar TODO lo que luego sera token o config en Tailwind.

### 3.1 Colores
Lista en tu CSS actual (ejemplos reales):
- Variables en `:root`:
  - `--color-bg`, `--color-text`, `--color-white`
  - `--color-bar`, `--color-bar-border`
  - `--white-65`, `--white-18`, `--white-12`
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
- `--bar-gap`, `--bar-gap-compact`, `--frame-gap`

Uso de valores repetidos:
- `gap:16px`, `padding:8px`, etc.

**Accion:** mapear espaciados clave en Tailwind o mantenerlos como variables.

### 3.4 Radios, bordes y sombras
Variables actuales:
- `--radius-lg`, `--radius-pill`
- `--border-thick`, `--border-btn`
- `--shadow-card`, `--shadow-bar`, `--shadow-thumb`, `--shadow-thumb-lg`, `--shadow-handle`, `--shadow-handle-hover`

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
## Salida del Hito 1 (entregables)
- Capturas de referencia.
- Lista de tokens (colores, tipografias, spacing, sombras).
- Orden de bloques aprobado.
- Checklist de exito.

Archivos generados en este paso:
- `docs/architecture/tailwind-tokens.md`
- `docs/architecture/ui-blocks.md`

--------------------------------------------------------------------------------
## Nota
Si quieres, en este hito puedo crear un archivo auxiliar:
- `docs/architecture/tokens.md` con la lista de tokens.
- `docs/qa/screenshots/` para guardar capturas.
