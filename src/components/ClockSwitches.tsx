import type { Player } from "../libs/chess-clock-service/types/Player";

import styles from "./ClockSwitches.module.scss";

import { createResource } from "solid-js";
import { formatTimeToHoursMinutesSeconds } from "../utils/formatTimeToHoursMinutesSeconds";
import { useSettingsStoreContext } from "../contexts/SettingsStoreContext";
import { audioPlayer } from "../libs/libsSetup";
import { useChessClockStoreContext } from "../contexts/ChessClockStoreContext";

export const ClockSwitches = () => {
  const { settings } = useSettingsStoreContext();
  let player1ButtonRef!: HTMLButtonElement;
  let player2ButtonRef!: HTMLButtonElement;
  const { chessClockStore, switchTo } = useChessClockStoreContext();

  const switchesDisabled = () =>
    chessClockStore.chessClockState === "suspended" || chessClockStore.chessClockState === "finished";

  createResource(async () => {
    await audioPlayer.init();
  });

  function isPlayerSwitchDisabled(player: Player) {
    return (
      switchesDisabled() || (chessClockStore.chessClockState === "running" && chessClockStore.activePlayer !== player)
    );
  }

  function toggle(toPlayer: Player) {
    switchTo(toPlayer);

    switch (toPlayer) {
      case 1: {
        player1ButtonRef.focus();
        break;
      }
      case 2: {
        player2ButtonRef.focus();
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

  function handleDblClick(ev: MouseEvent) {
    ev.preventDefault();
  }

  return (
    <main class={styles.container}>
      <button
        classList={{ [styles.clockSwitch]: true, [styles.defeatedPlayer]: chessClockStore.defeatedPlayer === 1 }}
        ref={player1ButtonRef}
        title={"Clock switch"}
        onDblClick={handleDblClick}
        onClick={[toggle, 2]}
        onTouchStart={[toggle, 2]}
        disabled={isPlayerSwitchDisabled(1)}>
        <time>{formatTimeToHoursMinutesSeconds(chessClockStore.playerTimes[0])}</time>
      </button>

      <button
        classList={{ [styles.clockSwitch]: true, [styles.defeatedPlayer]: chessClockStore.defeatedPlayer === 2 }}
        ref={player2ButtonRef}
        title={"Clock switch"}
        onDblClick={handleDblClick}
        onClick={[toggle, 1]}
        onTouchStart={[toggle, 1]}
        disabled={isPlayerSwitchDisabled(2)}>
        <time>{formatTimeToHoursMinutesSeconds(chessClockStore.playerTimes[1])}</time>
      </button>
    </main>
  );
};
