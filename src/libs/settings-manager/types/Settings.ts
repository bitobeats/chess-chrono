import { Theme } from "../enums/Theme";

export type Settings = {
  global: {
    theme: Theme;
    soundOn: boolean;
  };
  player1: PlayerSettings;
  player2: PlayerSettings;
};

export type PlayerSettings = {
  startTime: number;
  incrementBy: number;
};
