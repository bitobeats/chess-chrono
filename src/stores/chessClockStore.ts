import type { Player } from "../libs/chess-clock-service/types/Player";
import type { ChessClockState } from "../libs/chess-clock-service/types/ChessClockState";
import type { ChessClockService } from "../libs/chess-clock-service/ChessClockService";

import { onMount, onCleanup } from "solid-js";
import { createStore, reconcile } from "solid-js/store";

type ChessClockStore = {
  chessClockState: ChessClockService["state"];
  activePlayer: ChessClockService["activePlayer"];
  defeatedPlayer: Player | null;
  playerTimes: ChessClockService["playerTimes"];
};

export function createChessClockStore(chessClockService: ChessClockService) {
  const [chessClockStore, setChessClockStore] = createStore<ChessClockStore>({
    chessClockState: chessClockService.state,
    activePlayer: chessClockService.activePlayer,
    defeatedPlayer: null,
    playerTimes: [...chessClockService.playerTimes],
  });

  onMount(() => {
    function stateChangeEventListener(state: ChessClockState) {
      setChessClockStore("chessClockState", state);
    }

    function activePlayerChangeEventListener(activePlayer: Player) {
      setChessClockStore("activePlayer", activePlayer);
    }

    function playerConfigChangeEventListener() {
      setChessClockStore("playerTimes", reconcile(chessClockService.playerTimes));
    }

    function playerDefeatEventListener(defeatedPlayer: Player | null) {
      setChessClockStore("defeatedPlayer", defeatedPlayer);
    }

    function remainingTimeEventListener(player1RemainingTime: number, player2RemainingTime: number) {
      setChessClockStore("playerTimes", 0, player1RemainingTime);
      setChessClockStore("playerTimes", 1, player2RemainingTime);
    }

    chessClockService.addEventListener("statechange", stateChangeEventListener);
    chessClockService.addEventListener("activeplayerchange", activePlayerChangeEventListener);
    chessClockService.addEventListener("playerconfigchange", playerConfigChangeEventListener);
    chessClockService.addEventListener("playerdefeat", playerDefeatEventListener);
    chessClockService.addEventListener("remainingtimeupdate", remainingTimeEventListener);
    onCleanup(() => {
      chessClockService.removeEventListener("statechange", stateChangeEventListener);
      chessClockService.removeEventListener("activeplayerchange", activePlayerChangeEventListener);
      chessClockService.removeEventListener("playerconfigchange", playerConfigChangeEventListener);
      chessClockService.removeEventListener("playerdefeat", playerDefeatEventListener);
      chessClockService.removeEventListener("remainingtimeupdate", remainingTimeEventListener);
    });
  });

  function switchTo(player: Player) {
    if (chessClockService.state === "ready") {
      chessClockService.startWith(player);
    } else {
      chessClockService.switchTo(player);
    }
  }

  return {
    chessClockStore,
    suspend: chessClockService.suspend.bind(chessClockService),
    resume: chessClockService.resume.bind(chessClockService),
    reset: chessClockService.reset.bind(chessClockService),
    switchTo,
  };
}
