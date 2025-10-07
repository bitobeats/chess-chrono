export type Session = {
  shouldRestore: boolean;
  activePlayer: 1 | 2;
  player1RemainingTime: number;
  player2RemainingTime: number;
};
