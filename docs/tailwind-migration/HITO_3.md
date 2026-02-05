# HITO 3 - Tokens base (colores y tipografias)

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
- [x] Verificacion visual completa (sin cambios).
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
- `white-18` -> `var(--white-18)`          -> clases: `bg-white-18`
- `white-12` -> `var(--white-12)`          -> clases: `bg-white-12`

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
- `gap-frame-gap` -> `gap: var(--frame-gap)`
- `max-w-frame-max` -> `max-width: var(--frame-max)`

### Bordes y radios
- `rounded-lg` -> `border-radius: var(--radius-lg)`
- `rounded-pill` -> `border-radius: var(--radius-pill)`
- `border-thick` -> `border-width: var(--border-thick)`
- `border-btn` -> `border-width: var(--border-btn)`

### Sombras
- `shadow-card` -> `var(--shadow-card)`
- `shadow-bar` -> `var(--shadow-bar)`
- `shadow-thumb` -> `var(--shadow-thumb)`
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
- `animate-stretch` -> `stretch 230ms ease`

--------------------------------------------------------------------------------
## 6) (Opcional) Tokens extra mas adelante

Si quieres mapear spacing, radius o shadows:
- hazlo en otro paso, cuando ya uses Tailwind en markup.
- evita tocar todo ahora para no mezclar objetivos.

--------------------------------------------------------------------------------
## 7) Verificacion basica

1. Ejecuta `npm run dev`.
2. Prueba un token en un elemento pequeño (ej: un titulo):
   - agrega temporalmente `class="text-text"` y ver si respeta el color.
3. Si funciona, deja los tokens listos y vuelve a quitar el cambio temporal.

--------------------------------------------------------------------------------
## 8) Salida del Hito 3

Checklist:
- Tokens definidos con `@theme`.
- Variables dia/noche siguen intactas.
- Sin cambios visuales permanentes.

--------------------------------------------------------------------------------
## Nota

Si mas adelante necesitas un `tailwind.config.cjs` (plugins, safelist, etc),
lo agregamos en el Hito 4 o 5.
