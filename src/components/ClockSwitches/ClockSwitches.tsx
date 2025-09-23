import type { VoidComponent } from "solid-js";
import type { Player } from "../../libs/chess-clock-service/types/Player";

import { onMount, createSignal } from "solid-js";
import { formatTimeToHoursMinutesSeconds } from "../../utils/formatTimeToHoursMinutesSeconds";
import { useSettingsStoreContext } from "../../contexts/SettingsStoreContext";
import { audioPlayer } from "../../libs/libsSetup";
import { useChessClockStoreContext } from "../../contexts/ChessClockStoreContext";

import styles from "./ClockSwitches.module.scss";

export const ClockSwitches: VoidComponent = () => {
  const players = [1, 2] as const;

  const { settings } = useSettingsStoreContext();
  const { chessClockStore, switchTo } = useChessClockStoreContext();

  const [player1ButtonRef, setPlayer1ButtonRef] = createSignal<HTMLButtonElement>();
  const [player2ButtonRef, setPlayer2ButtonRef] = createSignal<HTMLButtonElement>();

  onMount(() => {
    audioPlayer.init();
  });

  function isPlayerSwitchDisabled(player: Player) {
    const { chessClockState } = chessClockStore;
    return (
      chessClockState === "suspended" ||
      chessClockState === "finished" ||
      (chessClockState === "running" && chessClockStore.activePlayer !== player)
    );
  }

  function toggle(fromPlayer: Player) {
    switchTo(fromPlayer === 1 ? 2 : 1);

    switch (fromPlayer) {
      case 1: {
        player2ButtonRef()?.focus();
        break;
      }
      case 2: {
        player1ButtonRef()?.focus();
      }
    }

    if (settings.global.soundOn) {
      try {
        audioPlayer.play();
      } catch (error) {
        console.error("Error playing audio file. " + error);
      }
    }
  }

  function handleTouchStart(fromPlayer: Player) {
    if (!audioPlayer.isAlive()) {
      return;
    }
    toggle(fromPlayer);
  }

  function handleDblClick(ev: MouseEvent) {
    ev.preventDefault();
  }

  return (
    <main class={styles.container}>
      {players.map((player) => (
        <button
          classList={{ [styles.clockSwitch]: true, [styles.defeatedPlayer]: chessClockStore.defeatedPlayer === player }}
          ref={player === 1 ? setPlayer1ButtonRef : setPlayer2ButtonRef}
          title={"Clock switch"}
          onDblClick={handleDblClick}
          onClick={[toggle, player]}
          onTouchStart={[handleTouchStart, player]}
          disabled={isPlayerSwitchDisabled(player)}>
          <time>{formatTimeToHoursMinutesSeconds(chessClockStore.playerTimes[player - 1])}</time>
        </button>
      ))}
    </main>
  );
};
