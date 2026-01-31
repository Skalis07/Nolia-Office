import { AUDIO_CONFIG } from "./config/audio.js";
import { ICONS } from "./config/icons.js";

// Puente para el script inline actual. Mantiene el comportamiento
// sin cambios mientras migramos el resto del código a módulos.
window.NOLIA_AUDIO = AUDIO_CONFIG;
window.NOLIA_ICONS = ICONS;
