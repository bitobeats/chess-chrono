import type { ActivePlayer } from "../../libs/chess-clock-service/types/ActivePlayer";

import { createEffect } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { chessClockService } from "../../libs/libsSetup";

const TIMER_REQUESTER_INTERVAL = 123;

type ChessClockStore = {
  chessClockState: typeof chessClockService.state;
  activePlayer: typeof chessClockService.activePlayer;
  defeatedPlayer: ActivePlayer | null;
  playerTimes: typeof chessClockService.playerTimes;
};

const [chessClockStore, setChessClockStore] = createStore<ChessClockStore>({
  chessClockState: chessClockService.state,
  activePlayer: chessClockService.activePlayer,
  defeatedPlayer: null,
  playerTimes: [...chessClockService.playerTimes],
});

chessClockService.addEventListener("statechange", (state) => {
  setChessClockStore("chessClockState", state);
});

chessClockService.addEventListener("activeplayerchange", (activePlayer) => {
  setChessClockStore("activePlayer", activePlayer);
});

chessClockService.addEventListener("playerconfigchange", (player1Config, player2Config) => {
  setChessClockStore("playerTimes", [player1Config.countdownFrom, player2Config.countdownFrom]);
});

let intervalId: number | null = null;

const handleInterval = () => {
  setChessClockStore("playerTimes", reconcile(chessClockService.playerTimes));
};

const suspend = () => {
  clearInterval(intervalId ?? undefined);
  intervalId = null;
  chessClockService.suspend();
};

const resume = () => {
  intervalId = setInterval(handleInterval, TIMER_REQUESTER_INTERVAL);
  chessClockService.resume();
};

const reset = () => {
  clearInterval(intervalId ?? undefined);
  intervalId = null;
  chessClockService.reset();
  setChessClockStore("playerTimes", reconcile(chessClockService.playerTimes));
};

const switchTo = (player: ActivePlayer) => {
  if (intervalId === null) {
    intervalId = setInterval(handleInterval, TIMER_REQUESTER_INTERVAL);
  }

  if (chessClockService.state === "ready") {
    chessClockService.startWith(player);
  } else {
    chessClockService.switchTo(player);
  }
};
export function useChessClockStore() {
  createEffect(() => {
    if (chessClockStore.chessClockState === "ready") {
      setChessClockStore("defeatedPlayer", null);
    }
    if (chessClockStore.chessClockState !== "finished") {
      return null;
    }

    const [player1Time, player2Time] = chessClockService.playerTimes;

    if (player1Time <= 0) {
      setChessClockStore("defeatedPlayer", 1);
      return;
    } else if (player2Time <= 0) {
      setChessClockStore("defeatedPlayer", 2);
      return;
    } else {
      setChessClockStore("defeatedPlayer", null);
      return;
    }
  });
  return {
    chessClockStore,
    suspend,
    resume,
    reset,
    switchTo,
  };
}
