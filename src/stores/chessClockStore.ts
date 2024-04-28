import type { ActivePlayer } from "../libs/chess-clock-service/types/ActivePlayer";
import type { ChessClockState } from "../libs/chess-clock-service/types/ChessClockState";
import type { TimerConfig } from "../libs/chess-clock-service/types/TimerConfig";
import type { ChessClockService } from "../libs/chess-clock-service/ChessClockService";

import { createEffect, onMount, onCleanup } from "solid-js";
import { createStore, reconcile } from "solid-js/store";

const TIMER_REQUESTER_INTERVAL = 123;

type ChessClockStore = {
  chessClockState: ChessClockService["state"];
  activePlayer: ChessClockService["activePlayer"];
  defeatedPlayer: ActivePlayer | null;
  playerTimes: ChessClockService["playerTimes"];
};

export function createChessClockStore(chessClockService: ChessClockService) {
  const [chessClockStore, setChessClockStore] = createStore<ChessClockStore>({
    chessClockState: chessClockService.state,
    activePlayer: chessClockService.activePlayer,
    defeatedPlayer: null,
    playerTimes: [...chessClockService.playerTimes],
  });

  let intervalId: number | null = null;

  onMount(() => {
    function stateChangeEventListener(state: ChessClockState) {
      setChessClockStore("chessClockState", state);
    }

    function activePlayerChangeEventListener(activePlayer: ActivePlayer) {
      setChessClockStore("activePlayer", activePlayer);
    }

    function playerConfigChangeEventListener(player1Config: TimerConfig, player2Config: TimerConfig) {
      setChessClockStore("playerTimes", [player1Config.countdownFrom, player2Config.countdownFrom]);
    }

    chessClockService.addEventListener("statechange", stateChangeEventListener);
    chessClockService.addEventListener("activeplayerchange", activePlayerChangeEventListener);
    chessClockService.addEventListener("playerconfigchange", playerConfigChangeEventListener);

    onCleanup(() => {
      chessClockService.removeEventListener("statechange", stateChangeEventListener);
      chessClockService.removeEventListener("activeplayerchange", activePlayerChangeEventListener);
      chessClockService.removeEventListener("playerconfigchange", playerConfigChangeEventListener);
    });
  });

  function handleInterval() {
    setChessClockStore("playerTimes", reconcile(chessClockService.playerTimes));
  }

  function suspend() {
    clearInterval(intervalId ?? undefined);
    intervalId = null;
    chessClockService.suspend();
  }

  function resume() {
    intervalId = setInterval(handleInterval, TIMER_REQUESTER_INTERVAL);
    chessClockService.resume();
  }

  function reset() {
    clearInterval(intervalId ?? undefined);
    intervalId = null;
    chessClockService.reset();
    setChessClockStore("playerTimes", reconcile(chessClockService.playerTimes));
  }

  function switchTo(player: ActivePlayer) {
    if (intervalId === null) {
      intervalId = setInterval(handleInterval, TIMER_REQUESTER_INTERVAL);
    }

    if (chessClockService.state === "ready") {
      chessClockService.startWith(player);
    } else {
      chessClockService.switchTo(player);
    }
  }

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
