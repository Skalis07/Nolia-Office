import { AUDIO_CONFIG } from "../config/audio.ts";
import { ICONS } from "../config/icons.ts";

type RainSetupOptions = {
  btn: HTMLButtonElement | null;
  audioEl: HTMLAudioElement | null;
  defaultVol?: number;
};

// ============================================================================
// LLUVIA (audio local)
// - Usa <audio> de la página.
// - Controla play/pausa e icono.
// ============================================================================
export function setupRain({ btn, audioEl, defaultVol }: RainSetupOptions): void {
  if (!btn || !audioEl) return;

  const safeBtn = btn;
  const safeAudio = audioEl;

  /* ---------------------------------------------------------------------------
     VOLUMEN INICIAL
     - Convierte 0-100 -> 0.0-1.0
     --------------------------------------------------------------------------- */
  // Volumen inicial (0-100 -> 0.0-1.0)
  const volume = Number(defaultVol ?? AUDIO_CONFIG.DEFAULT_RAIN_VOL) / 100;
  const fallback = AUDIO_CONFIG.DEFAULT_RAIN_VOL / 100;
  safeAudio.volume = Number.isFinite(volume) ? volume : fallback;

  let isPlaying = false;

  /* ---------------------------------------------------------------------------
     HELPERS DE ESTADO (UI)
     - Actualiza icono, clase y aria-label.
     --------------------------------------------------------------------------- */
  // Cambia el estado visual + aria.
  function setState(playing: boolean): void {
    if (playing) {
      safeBtn.classList.add("active");
      safeBtn.innerHTML = ICONS.ICON_CLOUD_RAIN;
      safeBtn.setAttribute("aria-label", "Apagar lluvia");
    } else {
      safeBtn.classList.remove("active");
      safeBtn.innerHTML = ICONS.ICON_CLOUD;
      safeBtn.setAttribute("aria-label", "Activar lluvia");
    }
    isPlaying = playing;
  }

  /* ---------------------------------------------------------------------------
     EVENTO: click
     - Play / Pause del audio local.
     - El primer play requiere gesto del usuario (mobile).
     --------------------------------------------------------------------------- */
  // Toggle lluvia con click del usuario.
  safeBtn.addEventListener("click", () => {
    if (!isPlaying) {
      safeAudio.currentTime = 0;
      const p = safeAudio.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {});
      }
      setState(true);
    } else {
      safeAudio.pause();
      setState(false);
    }
  });

  setState(false);
}
