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

