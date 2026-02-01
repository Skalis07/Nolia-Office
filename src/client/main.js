import { initApp } from "./app.js";

// Entry del cliente: lee datos del HTML (renderizados por Astro)
// y arranca la app modular.
const page = document.querySelector(".page");

// data-gifs contiene un JSON con la lista de GIFs calculada en build-time.
// Aquí lo parseamos para volver a un array JS usable en runtime.
let gifUrls = [];
if (page?.dataset.gifs) {
  try {
    gifUrls = JSON.parse(page.dataset.gifs);
  } catch {
    // Si el JSON viene corrupto o vacío, usamos un array seguro.
    gifUrls = [];
  }
}

// Punto único de arranque: inyecta datos y ejecuta la lógica principal.
initApp({ gifUrls });
