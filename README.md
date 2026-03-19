# 🌿 Nolia Office

_(Spanish version available [here](README.es.md))_

**Nolia Office** is a Notion-friendly web app (embeddable as a widget) created by **Skalis07** as a relaxing, customizable study/work space.
It is inspired by [NookOffice](https://github.com/VijiatJack/nookoffice) and uses _Animal Crossing_-themed visuals to create a warm and cozy atmosphere.
The code has been developed from scratch, incorporating aesthetic changes and functional improvements.
Built with **Astro**, **TypeScript**, and **Tailwind CSS**.

---

## 📸 Preview

![Site Preview](/public/img/preview.png)

---

## 💡 Inspiration and Origin

This project was born with two main goals:

1. To provide a digital place for my girlfriend to study and relax, allowing me to add or edit anything she needs, made by me.
2. To carry out a practical web development exercise, since until now I had never worked on a complete project, allowing me to learn, practice, and showcase my skills.

---

## ✨ Features

- 🎵 **Background music** played from YouTube.
- 🌧️ **Ambient sounds** (rain).
- 🖼️ **Themed images and GIFs** from _Animal Crossing_.
- 🎨 **Adapted design** for a relaxing and study-focused environment.
- 🌓 **Visual modes** (day/night) with an interactive switch.
- 📱 **Responsive design**, suitable for mobile and desktop.
- 🖥️ **Embedded mode in Notion** with automatic detection, no additional URL parameters required, to integrate the page into Notion workspaces.
- 🌓 **Notion embed background** synced with system theme (`prefers-color-scheme`) to avoid white background in dark mode.

---

## 🛠️ How It Works

**Nolia Office** is a static web application built with [Astro](https://astro.build/).  
On the client side, TypeScript (compiled to JavaScript) handles:

- Determining the current GIF and allowing it to be changed.
- Playing background music via the YouTube API.
- Controlling volume, pausing/resuming, and toggling ambient sounds.
- Retrying YouTube playback in embeds when host/browser autoplay policies block the first attempt.
- Switching between day and night modes.
- Adjusting the GIF frame to maintain the original aspect ratio or crop correctly.
- Adjusting styles so it works embedded in Notion without losing functionality.

---

## 🧪 Local development

- `npm run dev` → runs at root (normal local mode).
- `npm run dev:pages` → simulates GitHub Pages (subpath `/Nolia-Office/`).
- `npm run typecheck` → validates TypeScript types (no emit).

---

## 📚 Documentation

- Workflow: `docs/workflow.md`
- Render flow: `docs/architecture/flow.md`
- Architecture overview: `docs/architecture/overview.md`
- QA (Golden Paths): `docs/qa/golden-paths.md`
- Vercel Previews: `docs/vercel-previews-deployments.md`
- Docker: `docs/docker.md`
- Notion embed test (local): `docs/qa/testing/test-embed.html`

---

## 🔮 Future Plans (probably not XD)

- More music.
- **Custom playlists** system.
- **Pomodoro timer** for study/work sessions.
- **More sound effects** (waves, wind, coffee shop).
- Add more GIFs and backgrounds for automatic rotation.

---

## 🎨 Credits and Resources

- **Inspiration and original concept:** [NookOffice](https://vijiatjack.github.io/nookoffice/)
- **Visual inspiration:** _Animal Crossing_ (Nintendo)
- **Developer:** Skalis07
- **Music:** From _Animal Crossing_, played via YouTube.
- **Ambient sounds:** Free-use rain effect by **DRAGON-STUDIO** on [Pixabay](https://pixabay.com/sound-effects/copyright-free-rain-sounds-331497/).
- **Browser icon:** Based on free Figma resources inspired by _Animal Crossing_, created by [Ashley Gaunt-Seo](https://www.figma.com/community/file/882693668626621042/animal-crossing-icons).

---

## ⚖️ Legal Disclaimer

This is a personal project inspired by the NookOffice concept and is not affiliated with, endorsed, or sponsored by Nintendo or the _Animal Crossing_ franchise.  
Trademarks, logos, images, and music belong to their respective owners.  
Use is strictly non-commercial.

---

📌 **Note:** To integrate Nolia Office into Notion, simply paste the link:

```
https://skalis07.github.io/Nolia-Office/
```
