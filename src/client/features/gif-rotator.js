// ============================================================================
// GIF ROTATOR
// - Precarga todos los GIFs.
// - Cambia instantáneamente al siguiente.
// - Bloquea proporción según el GIF inicial.
// ============================================================================
export function setupGifRotator({ btn, img, gifUrls }) {
  if (!btn || !img) return;

  /* ---------------------------------------------------------------------------
     LISTA DE GIFs
     - gifUrls viene desde build-time (data-gifs en el HTML).
     - Se normaliza para evitar errores si viene vacío.
     --------------------------------------------------------------------------- */
  const urls = Array.isArray(gifUrls) ? gifUrls.slice() : [];
  const urlsAbs = urls.map((url) => new URL(url, location.href).href);

  let actual = 0;
  const ready = urls.length > 0;

  btn.disabled = !ready;
  btn.style.opacity = ready ? "1" : "0.5";

  if (!ready) {
    console.warn("GIF rotator: lista de GIFs vacia");
    return;
  }

  // Detectar GIF actual
  const current = new URL(img.getAttribute("src"), location.href).href;
  const idx = urlsAbs.indexOf(current);
  actual = idx >= 0 ? idx : 0;

  /* ---------------------------------------------------------------------------
     PRECARGA REAL
     - Evita el parpadeo al cambiar de GIF.
     --------------------------------------------------------------------------- */
  // Precarga real
  urls.forEach((url) => {
    const preload = new Image();
    preload.src = url;
  });

  /* ---------------------------------------------------------------------------
     BLOQUEAR PROPORCIÓN
     - Fija aspect-ratio según el primer GIF.
     - Evita saltos de layout.
     --------------------------------------------------------------------------- */
  // Bloquea proporción al cargar
  lockAspectFrom(img);

  /* ---------------------------------------------------------------------------
     EVENTO: click
     - Cambia al siguiente GIF de la lista.
     --------------------------------------------------------------------------- */
  // Click -> siguiente GIF
  btn.addEventListener("click", () => {
    actual = (actual + 1) % urls.length;
    img.src = urls[actual];
    setCover(img);
  });
}

/* ============================================================================
   BLOQUEAR PROPORCIÓN SEGÚN EL PRIMER GIF
   - Lee el tamaño natural del GIF.
   - En móviles deja que el CSS mande (vh).
   ============================================================================ */
function lockAspectFrom(imgEl) {
  if (!imgEl) return;

  const container = imgEl.closest(".img-redondeada");
  if (!container) return;

  const apply = () => {
    if (window.matchMedia("(max-width: 520px)").matches) {
      container.style.aspectRatio = "";
      setCover(imgEl);
      return;
    }

    const w = imgEl.naturalWidth;
    const h = imgEl.naturalHeight;
    if (!w || !h) return;

    container.style.height = "";
    container.style.aspectRatio = `${w} / ${h}`;
    setCover(imgEl);
  };

  if (imgEl.complete) {
    apply();
  } else {
    imgEl.addEventListener("load", apply, { once: true });
  }
}

// Aplica el modo "cover" al <img> de forma consistente.
function setCover(imgEl) {
  if (!imgEl) return;
  imgEl.style.width = "100%";
  imgEl.style.height = "100%";
  imgEl.style.objectFit = "cover";
}
