# HITO 4 - Migrar Controles (botones y sliders)

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
   - sombras (`shadow-bar`, `shadow-thumb`, etc.)

--------------------------------------------------------------------------------
## 2) Migrar `ControlsBar.astro`

Meta: reemplazar clases antiguas por clases Tailwind equivalentes.

Ejemplo de mapeo (se ajusta en el archivo real):
- `.barra-musica` -> `flex items-center gap-bar-gap bg-bar border-btn border-bar-line rounded-pill shadow-bar`
- `.icon-btn` -> `grid place-items-center rounded-full border-btn border-white-65 bg-white-12 shadow-thumb`
- `.volume-slider` -> usar clases para tamaño + colores del track y thumb (puede requerir CSS residual)

Nota:
Los estilos complejos del slider (thumb/track) probablemente quedaran en CSS
por compatibilidad cross-browser. En ese caso, mantenerlos en `index.css`.

--------------------------------------------------------------------------------
## 3) Verificacion visual

Checklist:
- Barra igual en desktop.
- Botones redondos iguales.
- Slider igual (track + thumb).
- Hover/active sin cambios raros.
- No afecta modo dia/noche.

--------------------------------------------------------------------------------
## 4) Limpieza de CSS viejo

Cuando el bloque ya use Tailwind:
- eliminar reglas CSS **solo** de las clases ya migradas.
- dejar intacto el CSS del slider si aun se usa.

--------------------------------------------------------------------------------
## 5) Salida del Hito 4

Checklist:
- Controles migrados a Tailwind.
- CSS antiguo de controles eliminado.
- Slider funcionando igual.

