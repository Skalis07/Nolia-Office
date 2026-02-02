# Overview de arquitectura

Este documento resume cómo está organizada la app y por qué.

---

## 1) Capas principales

**Páginas (Astro)**
- `src/pages/index.astro`
- Define la ruta `/` y prepara datos en build (frontmatter).

**Layout**
- `src/layouts/BaseLayout.astro`
- Construye `<html>`, `<head>` y `<body>`.

**Componentes UI**
- `src/components/`
- Partes del HTML divididas por responsabilidad:
  - `Title.astro`
  - `Frame.astro`
  - `GifFrame.astro`
  - `ControlsBar.astro`
  - `DayNightToggle.astro`
  - `DimOverlay.astro`

**Scripts del cliente**
- `src/client/`
- JS que conecta la UI y los eventos.

**Estilos**
- `src/styles/index.css`
- CSS global de la página.

**Assets**
- `src/assets/` → assets que se procesan en build (GIFs).
- `public/` → assets estáticos servidos “tal cual”.

---

## 2) Decisiones clave (resumen)

- **GIFs en `src/assets/`**: se descubren en build con `import.meta.glob`.
- **Audio e íconos en `public/`**: rutas directas sin import.
- **Layout separado**: `<head>` y `<body>` centralizados.
- **Componentes pequeños**: facilitan cambios y evitan un `index.astro` gigante.

---

## 3) Estructura visual (simple)

```
index.astro
  └─ BaseLayout
       └─ page wrapper
            ├─ Title
            └─ Frame
                 ├─ GifFrame
                 └─ ControlsBar
       ├─ DayNightToggle
       └─ DimOverlay
```

---

## 4) Dónde editar según necesidad

- **Cambiar título** → `src/pages/index.astro`
- **Cambiar HTML del bloque central** → `src/components/Frame.astro`
- **Cambiar controles** → `src/components/ControlsBar.astro`
- **Cambiar GIFs** → `src/assets/gifs/`
- **Cambiar fondo/estilos globales** → `src/styles/index.css`

