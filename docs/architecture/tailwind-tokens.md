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
- --white-18: rgba(255,255,255,.18)
- --white-12: rgba(255,255,255,.12)

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
- --frame-max: 1200px
- --page-pad: 10px
- --bar-pad: 10px 16px
- --bar-pad-compact: 8px 10px
- --bar-gap: 10px
- --bar-gap-compact: 8px
- --frame-gap: 12px
- gap frecuente: 16px (en `.page`)

--------------------------------------------------------------------------------
## Radios, bordes y sombras
- --radius-lg: 20px
- --radius-pill: 9999px
- --border-thick: 5px
- --border-btn: 3px
- --shadow-card: 0 4px 15px rgba(0,0,0,.3)
- --shadow-bar: 0 4px 12px rgba(0,0,0,.25)
- --shadow-thumb: 0 1px 2px rgba(0,0,0,.25)
- --shadow-thumb-lg: 0 3px 6px rgba(0,0,0,.25)
- --shadow-handle: inset 0 2px 0 rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.15)
- --shadow-handle-hover: inset 0 2px 0 rgba(0,0,0,.1), 0 3px 10px rgba(0,0,0,.2)

--------------------------------------------------------------------------------
## Slider (volumen)
- --slider-track-h: 6px
- --slider-thumb: 16px

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
- keyframes: `stretch` (escala vertical en la barra dia/noche)
- transiciones presentes en botones, barra, overlay y handle

--------------------------------------------------------------------------------
## Nota
Este inventario se usa para definir `theme.extend` en Tailwind y evitar valores duplicados.

