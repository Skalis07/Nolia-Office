# Docker (Nolia-Office)

## Objetivo
Permitir el build y la ejecución **reproducible** del sitio (Astro) en modo producción,
utilizando Docker y Nginx para servir el build estático, de forma consistente con GitHub Pages.

El comportamiento del sitio en Docker replica el despliegue real en Pages:
el sitio vive bajo el subpath `/Nolia-Office/`.

---

## Requisitos
- Docker Desktop instalado y corriendo (Windows)
- Puerto **8080** disponible en la máquina local

---

## Arquitectura (resumen)
- **Astro** se utiliza solo para generar el build (`npm run build`)
- El output (`dist/`) se sirve como archivos estáticos
- **Nginx** actúa como servidor web dentro del contenedor
- Docker encapsula todo el entorno para reproducibilidad

---

## Producción (Docker)

### Build de la imagen
Desde la raíz del proyecto:

```bash
docker build --no-cache -t nolia-office:local .
