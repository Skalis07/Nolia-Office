# Flujo de la página (Astro)

Este documento explica, paso a paso, cómo se renderiza la página y cómo se conectan
los componentes. La idea es que puedas “ver el dibujo” del flujo.

---

## 1) Punto de entrada (por dónde empieza)

**Archivo principal:** `src/pages/index.astro`

Este archivo es la página. Astro lo trata como la ruta `/`.
Aquí empieza la lectura: primero el frontmatter y luego el HTML.

### Qué pasa primero (frontmatter)

El bloque entre `---` se ejecuta antes de renderizar el HTML:

```astro
---
import type { ImageMetadata } from 'astro';
import '../styles/index.css';
import BaseLayout from '../layouts/BaseLayout.astro';
import Title from '../components/Title.astro';
import Frame from '../components/Frame.astro';
import DayNightToggle from '../components/DayNightToggle.astro';
import DimOverlay from '../components/DimOverlay.astro';

const gifModules = import.meta.glob('../assets/gifs/*.gif', {
  eager: true,
  import: 'default'
}) as Record<string, ImageMetadata>;

const gifEntries = Object.entries(gifModules)
  .sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }));

const gifUrls = gifEntries.map(([, img]) => img.src);
const initialGif = gifUrls[0] ?? '';
---
```

**Para qué sirve esto:**
- Importa CSS y componentes.
- Genera la lista de GIFs en build.
- Prepara `gifUrls` (para `data-gifs`) y `initialGif` (para el `<img>` inicial).

---

## 2) Salto al layout (desde index)

Cuando en `index.astro` aparece:

```astro
<BaseLayout title="Para mi princesa <3">
  ...contenido...
</BaseLayout>
```

Astro “salta” a `src/layouts/BaseLayout.astro` y lo renderiza.

## 3) Layout base (carcasa HTML)

**Archivo:** `src/layouts/BaseLayout.astro`

Este layout define la estructura HTML real: `<html>`, `<head>`, `<body>`.

```astro
---
const { title } = Astro.props;
---
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="color-scheme" content="light only" />
    <link rel="icon" type="image/svg+xml"
          href={import.meta.env.BASE_URL + "icons/favicon.svg"} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

**Importante:** el `<slot />` es “el hueco” donde se inserta el contenido de `index.astro`.
Después de leer el layout, Astro **vuelve** al contenido de `index.astro` y lo
coloca dentro del `<slot />`.

---

## 4) Wrapper de la página (de vuelta en index)

Dentro del layout, `index.astro` renderiza el wrapper principal:

```astro
<div class="page"
     data-base={import.meta.env.BASE_URL}
     data-gifs={JSON.stringify(gifUrls)}
     style={`--bg-url: url(${import.meta.env.BASE_URL}img/fondo.png)`}>
  ...
</div>
```

**Qué hace el wrapper:**
- Envuelve todo lo visible.
- Define el fondo con `--bg-url`.
- Expone datos a JS (`data-base`, `data-gifs`).

---

## 5) Componentes internos (desde index)

Dentro del wrapper se renderizan:
- **`<Title />`**: solo el título.
- **`<Frame />`**: bloque central.

Y fuera del wrapper pero dentro del layout:
- **`<DayNightToggle />`**: control día/noche.
- **`<DimOverlay />`**: capa oscura.
- `<script src="../client/main.js">` al final.

---

## 6) Desglose del bloque central (desde Frame)

**`Frame`** agrupa:
```
Frame
├─ GifFrame
└─ ControlsBar
```

- **`GifFrame`**: GIF + reloj + YouTube + audio lluvia.
- **`ControlsBar`**: botones y sliders.

---

## 7) Dibujo completo (árbol)

```
index.astro
  └─ BaseLayout
       └─ <slot />
            └─ Wrapper (div.page)
                 ├─ Title
                 └─ Frame
                      ├─ GifFrame
                      └─ ControlsBar
       ├─ DayNightToggle
       ├─ DimOverlay
       └─ script main.js
```

---

## 8) Flujo narrado (secuencia)

1. Astro ejecuta el frontmatter de `index.astro`.
2. Se crean `gifUrls` e `initialGif`.
3. `index.astro` llama a `BaseLayout`.
4. `BaseLayout` construye `<html>`, `<head>`, `<body>`.
5. Dentro del `<slot />` se inyecta el wrapper `div.page`.
6. Dentro del wrapper se renderizan `Title` y `Frame`.
7. `Frame` inserta `GifFrame` y `ControlsBar`.
8. Fuera del wrapper se renderizan `DayNightToggle` y `DimOverlay`.
9. El script `main.js` se ejecuta cuando el HTML ya está listo.

---

## 9) Qué tocar si cambias algo

- **Nuevo GIF:** solo agrega el archivo en `src/assets/gifs/`.
- **Nuevo botón:** edita `ControlsBar.astro`.
- **Nuevo overlay:** edita `GifFrame.astro`.
- **Cambiar título:** edita el prop en `index.astro`.
