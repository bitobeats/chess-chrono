import type { Settings } from "./types/Settings";
import { ThemeOptions } from "./enums/ThemeOptions";

export const DEFAULT_SETTINGS: Settings = {
  global: {
    theme: ThemeOptions.Dark,
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
