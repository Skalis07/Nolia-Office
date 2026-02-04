import { ICONS } from "../config/icons.ts";

type MusicSetupOptions = {
  btn: HTMLButtonElement | null;
  slider: HTMLInputElement | null;
  videoId: string;
  playerId: string;
};

type YTPlayerOptions = {
  videoId: string;
  playerVars: Record<string, number | string>;
  events: {
    onReady: () => void;
  };
};

type YTPlayer = {
  setVolume: (value: number) => void;
  unMute: () => void;
  playVideo: () => void;
  pauseVideo: () => void;
  getPlayerState: () => number;
};

declare const YT: {
  Player: new (elementId: string, options: YTPlayerOptions) => YTPlayer;
  PlayerState: {
    PLAYING: number;
  };
};

type WindowWithYT = Window & {
  YT?: typeof YT;
  onYouTubeIframeAPIReady?: () => void;
};

// ============================================================================
// MÚSICA (YouTube)
// - Carga la API IFrame y crea un player oculto.
// - Controla play/pausa y volumen desde los botones.
// ============================================================================
export function setupMusic({ btn, slider, videoId, playerId }: MusicSetupOptions): void {
  if (!btn || !slider) return;

  const safeBtn = btn;
  const safeSlider = slider;

  let player: YTPlayer | null = null;
  let isPlaying = false;
  let playerReady = false;
  let pendingPlay = false;
  let pendingResume = false;
  let resumeBound = false;
  const STORAGE_KEY = "musicOn";

  /* ---------------------------------------------------------------------------
     HELPERS DE ESTADO (UI)
     - Centraliza cambios de icono/aria/estado.
     --------------------------------------------------------------------------- */
  // Actualiza icono y aria-label según el estado actual.
  function setState(playing: boolean): void {
    safeBtn.innerHTML = playing ? ICONS.ICON_PAUSE : ICONS.ICON_PLAY;
    safeBtn.setAttribute("aria-label", playing ? "Pausar musica" : "Reproducir musica");
    isPlaying = playing;
  }

  // Aplica el volumen del slider al player de YouTube.
  function applyVolume(): void {
    const value = Number(safeSlider.value);
    const safeValue = Number.isFinite(value) ? value : 100;
    if (player && typeof player.setVolume === "function") {
      player.setVolume(safeValue);
    }
  }

  function saveIntent(playing: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEY, playing ? "1" : "0");
    } catch {
      // Ignorado
    }
  }

  function readIntent(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  }

  function ensureResumeOnGesture(): void {
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

  function tryPlay(): void {
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
      }
      if (state !== YT.PlayerState.PLAYING) {
        pendingResume = true;
        ensureResumeOnGesture();
      }
    }, 200);
  }

  function handleToggle(): void {
    const nextPlaying = !isPlaying;
    setState(nextPlaying);

    if (!playerReady || !player) {
      pendingPlay = nextPlaying;
      return;
    }

    if (nextPlaying) {
      tryPlay();
      return;
    }

    player.pauseVideo();
    saveIntent(false);
  }

  /* ---------------------------------------------------------------------------
     CALLBACK: onReady
     - Se ejecuta cuando el reproductor queda listo.
     - Aplica volumen inicial.
     - Conecta eventos UNA sola vez.
     --------------------------------------------------------------------------- */
  // Se dispara cuando el player queda listo.
  function onReady(): void {
    playerReady = true;
    applyVolume();
    if (readIntent()) {
      pendingResume = true;
      ensureResumeOnGesture();
    }

    if (pendingPlay && isPlaying) {
      tryPlay();
    }
  }

  /* ---------------------------------------------------------------------------
     CREAR REPRODUCTOR (YouTube)
     - playerId: id del div contenedor (ytplayerMusic)
     - videoId: id del video de YouTube
     --------------------------------------------------------------------------- */
  // Crea el reproductor de YouTube (solo audio).
  function initPlayer(): void {
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
  function ensureApi(): void {
    const w = window as WindowWithYT;

    if (w.YT && w.YT.Player) {
      initPlayer();
      return;
    }

    // Respeta un callback previo si ya existe.
    const prev = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = function () {
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
  if (!safeBtn.dataset.bound) {
    safeBtn.dataset.bound = "true";
    safeBtn.addEventListener("click", handleToggle);
    safeSlider.addEventListener("input", () => {
      applyVolume();
    });
  }
  setState(false);
}
