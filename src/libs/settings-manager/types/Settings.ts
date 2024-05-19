import { ThemeOption } from "../enums/ThemeOption";

export type Settings = {
  global: {
    theme: ThemeOption;
    soundOn: boolean;
  };
  player1: PlayerSettings;
  player2: PlayerSettings;
};

export type PlayerSettings = {
  startTime: number;
  incrementBy: number;
};
