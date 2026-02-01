/* global YT */
import { ICONS } from "../config/icons.js";

// ============================================================================
// MÚSICA (YouTube)
// - Carga la API IFrame y crea un player oculto.
// - Controla play/pausa y volumen desde los botones.
// ============================================================================
export function setupMusic({ btn, slider, videoId, playerId }) {
  if (!btn || !slider) return;

  let player = null;
  let isPlaying = false;

  /* ---------------------------------------------------------------------------
     HELPERS DE ESTADO (UI)
     - Centraliza cambios de icono/aria/estado.
     --------------------------------------------------------------------------- */
  // Actualiza icono y aria-label según el estado actual.
  function setState(playing) {
    btn.innerHTML = playing ? ICONS.ICON_PAUSE : ICONS.ICON_PLAY;
    btn.setAttribute(
      "aria-label",
      playing ? "Pausar musica" : "Reproducir musica"
    );
    isPlaying = playing;
  }

  // Aplica el volumen del slider al player de YouTube.
  function applyVolume() {
    const value = Number(slider.value) || 100;
    if (player && typeof player.setVolume === "function") {
      player.setVolume(value);
    }
  }

  /* ---------------------------------------------------------------------------
     CALLBACK: onReady
     - Se ejecuta cuando el reproductor queda listo.
     - Aplica volumen inicial.
     - Conecta eventos UNA sola vez.
     --------------------------------------------------------------------------- */
  // Se dispara cuando el player queda listo.
  function onReady() {
    applyVolume();

    if (btn.dataset.bound) return;
    btn.dataset.bound = "true";

    btn.addEventListener("click", () => {
      if (!player) return;

      if (!isPlaying) {
        player.playVideo();
        setState(true);
      } else {
        player.pauseVideo();
        setState(false);
      }
    });

    slider.addEventListener("input", () => {
      applyVolume();
    });
  }

  /* ---------------------------------------------------------------------------
     CREAR REPRODUCTOR (YouTube)
     - playerId: id del div contenedor (ytplayerMusic)
     - videoId: id del video de YouTube
     --------------------------------------------------------------------------- */
  // Crea el reproductor de YouTube (solo audio).
  function initPlayer() {
    player = new YT.Player(playerId, {
      videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        rel: 0,
        playsinline: 1,
      },
      events: {
        onReady,
      },
    });
  }

  /* ---------------------------------------------------------------------------
     CARGA DINÁMICA DE LA API DE YOUTUBE
     - Inserta el script oficial IFrame API.
     - Encadena window.onYouTubeIframeAPIReady si ya existía.
     --------------------------------------------------------------------------- */
  // Inserta la API si no existe y encadena el callback global.
  function ensureApi() {
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    // Respeta un callback previo si ya existe.
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof prev === "function") prev();
      initPlayer();
    };

    // Evita insertar el script más de una vez.
    if (document.querySelector("script[data-yt-api]")) return;

    const ytScript = document.createElement("script");
    ytScript.src = "https://www.youtube.com/iframe_api";
    ytScript.async = true;
    ytScript.dataset.ytApi = "true";
    document.head.appendChild(ytScript);
  }

  ensureApi();
  setState(false);
}
