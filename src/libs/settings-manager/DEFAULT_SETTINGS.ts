import type { Settings } from "./types/Settings";
import { ThemeOption } from "./enums/ThemeOption";

export const DEFAULT_SETTINGS: Settings = {
  global: {
    theme: ThemeOption.Dark,
    soundOn: true,
  },
  player1: {
    incrementBy: 0,
    startTime: 600,
  },
  player2: {
    incrementBy: 0,
    startTime: 600,
  },
};
