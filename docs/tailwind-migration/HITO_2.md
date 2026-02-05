# HITO 2 - Instalacion y activacion base de Tailwind (v4)

Objetivo:
Tener Tailwind funcionando en el proyecto SIN cambiar estilos aun.
Al finalizar este hito, el sitio debe verse exactamente igual.

--------------------------------------------------------------------------------
Estado actual:
- [x] Tailwind instalado con `npx astro add tailwind`.
- [x] `@import "tailwindcss"` activo en `src/styles/index.css`.
- [x] Decision de configuracion avanzada tomada en Hito 3.
- [ ] Verificacion visual completa (pendiente).

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
## 4) Verificacion basica

Pasos:
1. Ejecutar `npm run dev`.
2. Revisar que el sitio se ve igual (comparar con screenshots del Hito 1 si existen).

Checklist:
- Layout igual.
- Controles iguales.
- No hay errores en consola.

--------------------------------------------------------------------------------
## 5) Salida del Hito 2

Al terminar este hito:
- Tailwind esta instalado y funcionando.
- El CSS viejo sigue intacto.
- No hay cambios visuales.

--------------------------------------------------------------------------------
## Nota
No migrar ninguna clase aun. Ese es el Hito 3 en adelante.
