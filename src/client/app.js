import { AUDIO_CONFIG } from "./config/audio.js";
import { createAssetResolver } from "./utils/asset.js";
import { setupDayNight } from "./features/day-night.js";
import { setupGifRotator } from "./features/gif-rotator.js";
import { setupMusic } from "./features/music.js";
import { setupRain } from "./features/rain.js";
import { setupTitleFit } from "./features/title-fit.js";

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

  // Cacheo de DOM (una sola vez)
  const btnMusic = document.getElementById("musicToggle");
  const btnRain = document.getElementById("rainToggle");
  const volMusic = document.getElementById("volumeMusic");
  const btnShuffle = document.getElementById("gifShuffle");
  const gifImg = document.getElementById("mainGif");
  const rainAudio = document.getElementById("rainAudio");

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
}
