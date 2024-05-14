import type { Settings } from "./types/Settings";
import { Theme } from "./enums/Theme";

export const DEFAULT_SETTINGS: Settings = {
  global: {
    theme: Theme.Dark,
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
