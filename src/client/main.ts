import { initApp } from "./app.ts";

// Entry del cliente: lee datos del HTML (renderizados por Astro)
// y arranca la app modular.
const page = document.querySelector<HTMLElement>(".page");

// data-gifs contiene un JSON con la lista de GIFs calculada en build-time.
// Aquí lo parseamos para volver a un array JS usable en runtime.
let gifUrls: string[] = [];
if (page?.dataset.gifs) {
  try {
    const parsed = JSON.parse(page.dataset.gifs) as unknown;
    if (Array.isArray(parsed)) {
      gifUrls = parsed.filter((item): item is string => typeof item === "string");
    }
  } catch {
    // Si el JSON viene corrupto o vacío, usamos un array seguro.
    gifUrls = [];
  }
}

// Punto único de arranque: inyecta datos y ejecuta la lógica principal.
initApp({ gifUrls });
