# 🌿 Nolia Office

**Nolia Office** es una web app compatible con Notion (embebible como widget) creada por **Skalis07** como un espacio relajante y personalizable para estudiar o trabajar.
Está inspirada en [NookOffice](https://github.com/VijiatJack/nookoffice) y utiliza elementos visuales temáticos de _Animal Crossing_ para crear un ambiente cálido y acogedor.
El código ha sido desarrollado desde cero, incorporando cambios estéticos y mejoras funcionales.
Construida con **Astro**, **TypeScript** y **Tailwind CSS**.

---

## 📸 Vista Previa

![Vista previa del sitio](/public/img/preview.png)

---

## 💡 Inspiración y Origen

Este proyecto nació con dos objetivos principales:

1. Proporcionar un lugar digital para estudiar y relajarse a mi novia, pudiendo agregar o editar cosas que necesite y hecho por mí.
2. Realizar un ejercicio práctico de desarrollo web, ya que hasta ahora no había trabajado en un proyecto completo, así puedo aprovecharlo para aprender, practicar y demostrar habilidades.

---

## ✨ Características

- 🎵 **Música de fondo** reproducida desde YouTube.
- 🌧️ **Sonidos ambientales** (lluvia).
- 🖼️ **Imágenes y GIFs temáticos** de _Animal Crossing_.
- 🎨 **Diseño adaptado** para un ambiente relajante y enfocado al estudio.
- 🌓 **Modos visuales** (día/noche) con un interruptor interactivo.
- 📱 **Diseño responsive**, apto para móviles y escritorio.
- 🖥️ **Modo embebido en Notion** con detección automática, sin necesidad de parámetros adicionales en la URL, para integrar la página en espacios de trabajo de Notion.
- 🌓 **Fondo del embed en Notion** ajustado al tema del sistema (`prefers-color-scheme`) para evitar fondo blanco en modo oscuro.

---

## 🛠️ Cómo Funciona

**Nolia Office** es una aplicación web estática construida con [Astro](https://astro.build/).  
En el cliente, TypeScript (compilado a JavaScript) se encarga de:

- Determinar el GIF actual y permitir cambiarlo.
- Reproducir música de fondo mediante la API de YouTube.
- Controlar volumen, pausa/reanudación y alternar sonidos ambientales.
- Reintentar reproducción de YouTube en embebidos cuando el host/navegador bloquea el primer intento por política de autoplay.
- Cambiar entre modo día y noche.
- Adaptar el marco del GIF para que mantenga la proporción original o recorte correctamente.
- Ajustar estilos para que funcione embebido en Notion sin perder funcionalidad.

---

## 🧪 Desarrollo local

- `npm run dev` → levanta el sitio en raíz (modo local normal).
- `npm run dev:pages` → simula GitHub Pages (subpath `/Nolia-Office/`).
- `npm run typecheck` → valida tipos de TypeScript (sin emitir archivos).

---

## 📚 Documentación

- Flujo de trabajo: `docs/workflow.md`
- Flujo de renderizado: `docs/architecture/flow.md`
- Overview de arquitectura: `docs/architecture/overview.md`
- QA (Golden Paths): `docs/qa/golden-paths.md`
- Vercel Previews: `docs/vercel-previews-deployments.md`
- Docker: `docs/docker.md`
- Test embed Notion (local): `docs/qa/testing/test-embed.html`

---

## 🔮 Planes Futuros (probablemente no XD)

- Más música.
- Sistema de **playlists personalizadas**.
- **Contador Pomodoro** para sesiones de estudio/trabajo.
- **Más efectos sonoros** (olas, viento, cafetería).
- Añadir más GIFs y fondos para rotación automática.

---

## 🎨 Créditos y Recursos

- **Inspiración y concepto original:** [NookOffice](https://vijiatjack.github.io/nookoffice/)
- **Inspiración visual:** _Animal Crossing_ (Nintendo)
- **Desarrollador:** Skalis07
- **Música:** De _Animal Crossing_, reproducida vía YouTube.
- **Sonidos ambientales:** Efecto de lluvia de libre uso por **DRAGON-STUDIO** en [Pixabay](https://pixabay.com/sound-effects/copyright-free-rain-sounds-331497/).
- **Icono del navegador:** Basado en recursos gratuitos de Figma inspirados en _Animal Crossing_, creados por [Ashley Gaunt-Seo](https://www.figma.com/community/file/882693668626621042/animal-crossing-icons).

---

## ⚖️ Aviso Legal

Este es un proyecto personal inspirado en el concepto de NookOffice y no está afiliado, respaldado ni patrocinado por Nintendo o por la franquicia _Animal Crossing_.  
Las marcas comerciales, logotipos, imágenes y música pertenecen a sus respectivos dueños.  
El uso es únicamente con fines no comerciales.

---

📌 **Nota:** Si quieres integrar Nolia Office en Notion, basta con pegar el enlace

```
https://skalis07.github.io/Nolia-Office/
```
