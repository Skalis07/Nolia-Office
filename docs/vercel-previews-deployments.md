# Vercel Preview Deployments

## ¿Qué es una Preview Deployment?

Una **Preview Deployment** es un despliegue automático del proyecto que se genera para
cada rama o Pull Request, permitiendo revisar los cambios **antes de hacer merge a `main`**.

En este proyecto, las previews son gestionadas por **Vercel** y se integran directamente
con **GitHub Pull Requests**.

---

## ¿Cuándo se genera una Preview?

Se genera automáticamente cuando ocurre cualquiera de estos eventos:

- Se crea un **Pull Request**
- Se hace **push** a una rama con un PR abierto
- Se actualiza un PR existente

Cada push actualiza la preview correspondiente.

---

## Acceso a las Preview Deployments

Las Preview Deployments **no necesariamente son públicas**.

El acceso depende de la configuración del proyecto en Vercel. En general:

- Requieren estar **logueado en Vercel**
- El usuario debe tener **acceso al proyecto**
- En modo incógnito o sin permisos, el acceso puede estar bloqueado

Esto es el comportamiento esperado y forma parte del flujo de revisión interna.

---

## Diferencia entre Preview y Producción

| Entorno | Descripción |
|------|-----------|
| **Preview** | Versión temporal del sitio asociada a una rama o PR, usada para revisión interna. |
| **Producción (`main`)** | Versión estable del proyecto, accesible públicamente. |

Las previews permiten validar cambios sin afectar producción.

---

## Cómo acceder a una Preview

1. Abrir el Pull Request en GitHub.
2. Buscar el comentario automático del bot de Vercel.
3. Hacer click en el enlace de **Preview Deployment**.
4. Si se solicita, iniciar sesión en Vercel.

El enlace es único por PR y se actualiza con cada push.

---

## Qué validar en una Preview (Golden Paths)

Antes de aprobar un PR, **siempre** se deben validar los siguientes puntos en la preview:

### Carga general
- La página carga sin errores visibles.
- No hay errores 404 de CSS o JS.

### YouTube
- Play / pausa funcionan correctamente.
- El volumen responde correctamente.
- El estado se mantiene al cambiar de modo.

### Ambiente (lluvia)
- Activar / desactivar funciona correctamente.
- El volumen responde.
- No hay duplicación de sonido.

### Escena
- Cambio de GIF o escena funciona correctamente.
- No hay estados inconsistentes.

### Modo visual
- Cambio día / noche funciona correctamente.

### Responsive básico
- Vista móvil (~360×800).
- Vista desktop (~1366×768).

### Integraciones
- Embed de Notion (si aplica) carga correctamente.

---

## Relación con CI

Las Preview Deployments **no reemplazan** el CI.

- **CI (GitHub Actions)** verifica calidad técnica:
  - lint
  - build
- **Vercel Preview** permite validar comportamiento visual y funcional.

Un PR solo debe mergearse cuando:
- CI está en verde
- La preview fue revisada manualmente

---

## Checks de Vercel en GitHub

Vercel reporta el estado del deploy como **status checks** en el Pull Request:

- `Vercel — Deployment has completed`
- `Vercel Preview Comments`

Estos checks indican que la preview está disponible para revisión.

---

## Consideraciones técnicas

- Las previews se sirven en **raíz (`/`)**.
- GitHub Pages sirve el sitio bajo **subpath (`/Nolia-Office/`)**.
- El proyecto está configurado para adaptarse automáticamente a ambos entornos,
  evitando roturas de rutas y assets.

---

## Buenas prácticas

- PRs pequeños → previews rápidas.
- No aprobar un PR sin revisar la preview.
- Usar la preview como fuente de verdad visual.
- No usar previews como enlaces públicos permanentes.

---

## Limitaciones

- Las previews son temporales.
- Pueden requerir autenticación.
- No deben considerarse producción.

---

## Resumen

Las **Vercel Preview Deployments** permiten revisar cambios reales antes de integrarlos
a `main`, reduciendo errores visuales y mejorando la calidad del proyecto.
