import type { ActivePlayer } from "../libs/chess-clock-service/types/ActivePlayer";
import type { ChessClockState } from "../libs/chess-clock-service/types/ChessClockState";
import type { ChessClockService } from "../libs/chess-clock-service/ChessClockService";

import { onMount, onCleanup } from "solid-js";
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

    function playerConfigChangeEventListener() {
      setChessClockStore("playerTimes", reconcile(chessClockService.playerTimes));
    }

    function playerDefeatEventListener(defeatedPlayer: ActivePlayer | null) {
      setChessClockStore("defeatedPlayer", defeatedPlayer);
    }

    chessClockService.addEventListener("statechange", stateChangeEventListener);
    chessClockService.addEventListener("activeplayerchange", activePlayerChangeEventListener);
    chessClockService.addEventListener("playerconfigchange", playerConfigChangeEventListener);
    chessClockService.addEventListener("playerdefeat", playerDefeatEventListener);

    onCleanup(() => {
      chessClockService.removeEventListener("statechange", stateChangeEventListener);
      chessClockService.removeEventListener("activeplayerchange", activePlayerChangeEventListener);
      chessClockService.removeEventListener("playerconfigchange", playerConfigChangeEventListener);
      chessClockService.removeEventListener("playerdefeat", playerDefeatEventListener);
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

  return {
    chessClockStore,
    suspend,
    resume,
    reset,
    switchTo,
  };
}
