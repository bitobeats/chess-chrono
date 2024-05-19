import { ThemeOptions } from "../enums/ThemeOptions";

export type Settings = {
  global: {
    theme: ThemeOptions;
    soundOn: boolean;
  };
  player1: PlayerSettings;
  player2: PlayerSettings;
};

export type PlayerSettings = {
  startTime: number;
  incrementBy: number;
};
