import styles from "./Controls.module.scss";

import { OpenSettingsModalButton } from "./OpenSettingsModalButton";
import { SettingsView } from "./Settings/SettingsView";
import { useChessClockStore } from "../stores/chessClockStore";
import { audioPlayer } from "../libs/libsSetup";

import playIcon from "../assets/icons/play.svg";
import restartIcon from "../assets/icons/restart.svg";
import settingsIcon from "../assets/icons/settings.svg";
import pauseIcon from "../assets/icons/pause.svg";

export const Controls = () => {
  let dialogRef!: HTMLDialogElement;

  const { chessClockStore, resume, suspend, reset } = useChessClockStore();

  function handlePause() {
    if (chessClockStore.chessClockState === "suspended") {
      resume();
    } else {
      suspend();
    }
    audioPlayer.suspend();
  }

  const suspendResumeButtonDisabled = () =>
    !(chessClockStore.chessClockState === "running" || chessClockStore.chessClockState === "suspended");

  function handleClickOutside(ev: MouseEvent) {
    if (ev.target === dialogRef) {
      dialogRef.close();
    }
  }

  return (
    <menu class={styles.container}>
      <button
        disabled={suspendResumeButtonDisabled()}
        class={styles.playPauseButton}
        onClick={handlePause}
        title="Pause/Resume">
        <img src={chessClockStore.chessClockState === "suspended" ? playIcon : pauseIcon} />
      </button>
      <button onClick={reset} title={"Reset"} class={styles.resetButton}>
        <img src={restartIcon} />
      </button>
      <OpenSettingsModalButton class={styles.settingsButton} modalRef={() => dialogRef}>
        <img src={settingsIcon} />
      </OpenSettingsModalButton>
      <dialog ref={dialogRef} onClick={handleClickOutside}>
        <SettingsView onCancel={() => dialogRef.close()} />
      </dialog>
    </menu>
  );
};
