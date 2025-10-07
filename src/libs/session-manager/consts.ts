import type { Session } from "./types/Session";

export const DEFAULT_SESSION: Session = {
  shouldRestore: false,
  activePlayer: 1,
  player1RemainingTime: 0,
  player2RemainingTime: 0,
};
