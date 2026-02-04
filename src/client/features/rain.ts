import { AUDIO_CONFIG } from "../config/audio.ts";
import { ICONS } from "../config/icons.ts";

// ============================================================================
// LLUVIA (audio local)
// - Usa <audio> de la página.
// - Controla play/pausa e icono.
// ============================================================================
export function setupRain({ btn, audioEl, defaultVol }) {
  if (!btn || !audioEl) return;

  /* ---------------------------------------------------------------------------
     VOLUMEN INICIAL
     - Convierte 0-100 -> 0.0-1.0
     --------------------------------------------------------------------------- */
  // Volumen inicial (0-100 -> 0.0-1.0)
  const volume = Number(defaultVol ?? AUDIO_CONFIG.DEFAULT_RAIN_VOL) / 100;
  audioEl.volume = Number.isFinite(volume) ? volume : 0.6;

  let isPlaying = false;

  /* ---------------------------------------------------------------------------
     HELPERS DE ESTADO (UI)
     - Actualiza icono, clase y aria-label.
     --------------------------------------------------------------------------- */
  // Cambia el estado visual + aria.
  function setState(playing) {
    if (playing) {
      btn.classList.add("active");
      btn.innerHTML = ICONS.ICON_CLOUD_RAIN;
      btn.setAttribute("aria-label", "Apagar lluvia");
    } else {
      btn.classList.remove("active");
      btn.innerHTML = ICONS.ICON_CLOUD;
      btn.setAttribute("aria-label", "Activar lluvia");
    }
    isPlaying = playing;
  }

  /* ---------------------------------------------------------------------------
     EVENTO: click
     - Play / Pause del audio local.
     - El primer play requiere gesto del usuario (mobile).
     --------------------------------------------------------------------------- */
  // Toggle lluvia con click del usuario.
  btn.addEventListener("click", () => {
    if (!isPlaying) {
      audioEl.currentTime = 0;
      const p = audioEl.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {});
      }
      setState(true);
    } else {
      audioEl.pause();
      setState(false);
    }
  });

  setState(false);
}
