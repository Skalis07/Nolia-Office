import type { IconMap } from "../../types/index.js";

// Íconos SVG usados por la UI.
export const ICONS: IconMap = {
  ICON_PLAY:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M8 5v14l11-7z"/>' +
    "</svg>",

  ICON_PAUSE:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>' +
    "</svg>",

  ICON_CLOUD: `
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 18a4 4 0 0 0 0-8
               5 5 0 0 0-9-2
               4 4 0 0 0-2 7.5"/>
    </svg>`,

  ICON_CLOUD_RAIN: `
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 18a4 4 0 0 0 0-8
               5 5 0 0 0-9-2
               4 4 0 0 0-2 7.5"/>
      <path d="M8 20l1-2
               M12 20l1-2
               M16 20l1-2"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            fill="none"/>
    </svg>`,
};
