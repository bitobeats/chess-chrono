import type { ActivePlayer } from "../libs/chess-clock-service/types/ActivePlayer";

import styles from "./ChessClock.module.scss";

import { onMount } from "solid-js";
import { formatTimeToHoursMinutesSeconds } from "../utils/formatTimeToHoursMinutesSeconds";
import { useSettingsStoreContext } from "../contexts/SettingsStoreContext";
import { audioPlayer } from "../libs/libsSetup";
import { useChessClockStore } from "../stores/chessClockStore";

export const ChessClock = () => {
  const { settings } = useSettingsStoreContext();
  let player1ButtonRef!: HTMLButtonElement;
  let player2ButtonRef!: HTMLButtonElement;
  const { chessClockStore, switchTo } = useChessClockStore();

  onMount(async () => {
    await audioPlayer.preloadAssets();
  });

  const toggle = (toPlayer: ActivePlayer) => {
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
  };

  const switchesDisabled = () =>
    chessClockStore.chessClockState === "suspended" || chessClockStore.chessClockState === "finished";

  return (
    <main class={styles.container}>
      <button
        classList={{ [styles.clockSwitch]: true, [styles.defeatedPlayer]: chessClockStore.defeatedPlayer === 1 }}
        ref={player1ButtonRef}
        title={"Clock switch"}
        onClick={[toggle, 2]}
        onTouchStart={[toggle, 2]}
        disabled={
          switchesDisabled() || (chessClockStore.chessClockState === "running" && chessClockStore.activePlayer === 2)
        }>
        <time>{formatTimeToHoursMinutesSeconds(chessClockStore.playerTimes[0])}</time>
      </button>

      <button
        classList={{ [styles.clockSwitch]: true, [styles.defeatedPlayer]: chessClockStore.defeatedPlayer === 2 }}
        ref={player2ButtonRef}
        title={"Clock switch"}
        onClick={[toggle, 1]}
        onTouchStart={[toggle, 1]}
        disabled={
          switchesDisabled() || (chessClockStore.chessClockState === "running" && chessClockStore.activePlayer === 1)
        }>
        <time>{formatTimeToHoursMinutesSeconds(chessClockStore.playerTimes[1])}</time>
      </button>
    </main>
  );
};
