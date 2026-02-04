import { AUDIO_CONFIG } from "./config/audio.ts";
import { createAssetResolver } from "./utils/asset.ts";
import { setupDayNight } from "./features/day-night.ts";
import { setupNotionEmbedClass } from "./features/embed-notion.ts";
import { setupFullscreenClass } from "./features/fullscreen.ts";
import { setupGifRotator } from "./features/gif-rotator.ts";
import { setupMusic } from "./features/music.ts";
import { setupRain } from "./features/rain.ts";
import { setupTitleFit } from "./features/title-fit.ts";
import { setupClock } from "./features/clock.ts";

// ============================================================================
// APP PRINCIPAL
// - Lee el DOM una sola vez.
// - Inyecta datos a cada feature.
// - Mantiene el entry limpio.
// ============================================================================
type InitAppOptions = {
  gifUrls?: string[];
};

export function initApp({ gifUrls = [] }: InitAppOptions = {}) {
  const page = document.querySelector<HTMLElement>(".page");
  const baseRaw = page?.dataset.base || "/";
  const asset = createAssetResolver(baseRaw);

  // Detecciones globales (embeds / fullscreen) y reloj
  setupNotionEmbedClass();
  setupFullscreenClass();

  // Cacheo de DOM (una sola vez)
  const btnMusic = document.getElementById("musicToggle") as HTMLButtonElement | null;
  const btnRain = document.getElementById("rainToggle") as HTMLButtonElement | null;
  const volMusic = document.getElementById("volumeMusic") as HTMLInputElement | null;
  const btnShuffle = document.getElementById("gifShuffle") as HTMLButtonElement | null;
  const gifImg = document.getElementById("mainGif") as HTMLImageElement | null;
  const rainAudio = document.getElementById("rainAudio") as HTMLAudioElement | null;
  const reloj = document.getElementById("reloj") as HTMLElement | null;

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
