import styles from "./Controls.module.scss";

import { OpenSettingsModalButton } from "./OpenSettingsModalButton";
import { useChessClockStoreContext } from "../contexts/ChessClockStoreContext";
import { SettingsView } from "./Settings/SettingsView";
import { audioPlayer } from "../libs/libsSetup";

export const Controls = () => {
  let dialogRef!: HTMLDialogElement;

  const { chessClockStore, resume, suspend, reset } = useChessClockStoreContext();

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

  function handleResetClick() {
    const shouldReset = confirm("Are you sure you want to finish the current game?");

    if (shouldReset) {
      reset();
    }
  }

  return (
    <menu class={styles.container}>
      <button
        class={styles.iconButton}
        disabled={suspendResumeButtonDisabled()}
        onClick={handlePause}
        title="Pause/Resume">
        {chessClockStore.chessClockState === "suspended" ? "▶︎" : "||"}
      </button>
      <button onClick={handleResetClick} title={"Reset"} class={styles.iconButton}>
        ♺
      </button>
      <OpenSettingsModalButton class={styles.iconButton} modalRef={() => dialogRef}>
        ⛭
      </OpenSettingsModalButton>
      <dialog ref={dialogRef} onClick={handleClickOutside}>
        <SettingsView onCancel={() => dialogRef.close()} />
      </dialog>
    </menu>
  );
};
