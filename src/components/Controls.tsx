import styles from "./Controls.module.scss";

import { lazy, Suspense } from "solid-js";

import { OpenSettingsModalButton } from "./OpenSettingsModalButton";
import { useChessClockStore } from "../stores/chessClockStore";
import { audioPlayer } from "../libs/libsSetup";

import playIcon from "../assets/icons/play.svg";
import restartIcon from "../assets/icons/restart.svg";
import settingsIcon from "../assets/icons/settings.svg";
import pauseIcon from "../assets/icons/pause.svg";

const SettingsView = lazy(async () => {
  const { SettingsView } = await import("./Settings/SettingsView");
  return { default: SettingsView };
});
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
        <Suspense fallback="Loading...">
          <SettingsView onCancel={() => dialogRef.close()} />
        </Suspense>
      </dialog>
    </menu>
  );
};
