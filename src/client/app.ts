import { AUDIO_CONFIG } from "./config/audio.ts";
import { createAssetResolver } from "./utils/asset.ts";
import { setupDayNight } from "./features/day-night.js";
import { setupNotionEmbedClass } from "./features/embed-notion.js";
import { setupFullscreenClass } from "./features/fullscreen.js";
import { setupGifRotator } from "./features/gif-rotator.js";
import { setupMusic } from "./features/music.ts";
import { setupRain } from "./features/rain.ts";
import { setupTitleFit } from "./features/title-fit.js";
import { setupClock } from "./features/clock.js";

// ============================================================================
// APP PRINCIPAL
// - Lee el DOM una sola vez.
// - Inyecta datos a cada feature.
// - Mantiene el entry limpio.
// ============================================================================
export function initApp({ gifUrls = [] } = {}) {
  const page = document.querySelector(".page");
  const baseRaw = page?.dataset.base || "/";
  const asset = createAssetResolver(baseRaw);

  // Detecciones globales (embeds / fullscreen) y reloj
  setupNotionEmbedClass();
  setupFullscreenClass();

  // Cacheo de DOM (una sola vez)
  const btnMusic = document.getElementById("musicToggle");
  const btnRain = document.getElementById("rainToggle");
  const volMusic = document.getElementById("volumeMusic");
  const btnShuffle = document.getElementById("gifShuffle");
  const gifImg = document.getElementById("mainGif");
  const rainAudio = document.getElementById("rainAudio");
  const reloj = document.getElementById("reloj");

  // Música (YouTube)
  setupMusic({
    btn: btnMusic,
    slider: volMusic,
    videoId: "8kBlKM71pjc",
    playerId: "ytplayerMusic",
  });

  // Lluvia (audio local)
  setupRain({
    btn: btnRain,
    audioEl: rainAudio,
    defaultVol: AUDIO_CONFIG.DEFAULT_RAIN_VOL,
  });

  // GIFs
  setupGifRotator({
    btn: btnShuffle,
    img: gifImg,
    gifUrls,
  });

  // Modo día/noche + ajuste de título
  setupDayNight({ asset });
  setupTitleFit();

  // Reloj/fecha
  setupClock({ el: reloj });
}
