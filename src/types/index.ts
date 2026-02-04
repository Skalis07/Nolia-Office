// Tipos base compartidos del proyecto.
export type IconMap = Readonly<{
  ICON_PLAY: string;
  ICON_PAUSE: string;
  ICON_CLOUD: string;
  ICON_CLOUD_RAIN: string;
}>;

export type AudioConfig = Readonly<{
  DEFAULT_RAIN_VOL: number;
  DEFAULT_MUSIC_VOL: number;
  DEFAULT_SWITCH_SFX_VOL: number;
}>;

export type AssetResolver = (path: string) => string;
