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
  let pendingResume = false;
  let resumeBound = false;
  const STORAGE_KEY = "musicOn";

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
    const value = Number(slider.value);
    const safeValue = Number.isFinite(value) ? value : 100;
    if (player && typeof player.setVolume === "function") {
      player.setVolume(safeValue);
    }
  }

  function saveIntent(playing) {
    try {
      localStorage.setItem(STORAGE_KEY, playing ? "1" : "0");
    } catch {
      // Ignorado
    }
  }

  function readIntent() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  }

  function ensureResumeOnGesture() {
    if (resumeBound) return;
    resumeBound = true;

    const resume = () => {
      if (!pendingResume) return;
      pendingResume = false;
      tryPlay();
    };

    window.addEventListener("pointerdown", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });
  }

  function tryPlay() {
    if (!player) return;

    try {
      if (typeof player.unMute === "function") {
        player.unMute();
      }
    } catch {
      // Ignorado
    }

    applyVolume();

    try {
      player.playVideo();
    } catch {
      pendingResume = true;
      ensureResumeOnGesture();
      return;
    }

    setTimeout(() => {
      if (!player || typeof player.getPlayerState !== "function") return;
      const state = player.getPlayerState();

      if (state === YT.PlayerState.PLAYING) {
        setState(true);
        saveIntent(true);
      } else {
        setState(false);
        pendingResume = true;
        ensureResumeOnGesture();
      }
    }, 200);
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
    if (readIntent()) {
      pendingResume = true;
      ensureResumeOnGesture();
    }

    if (btn.dataset.bound) return;
    btn.dataset.bound = "true";

    btn.addEventListener("click", () => {
      if (!player) return;

      if (!isPlaying) {
        tryPlay();
      } else {
        player.pauseVideo();
        setState(false);
        saveIntent(false);
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
        origin: window.location.origin,
        enablejsapi: 1,
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
