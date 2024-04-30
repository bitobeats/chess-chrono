import styles from "./Controls.module.scss";

import { useChessClockStoreContext } from "../contexts/ChessClockStoreContext";
import { SettingsView } from "./Settings/SettingsView";
import { audioPlayer } from "../libs/libsSetup";

export const Controls = () => {
  let dialogRef!: HTMLDialogElement;

  const { chessClockStore, resume, suspend, reset } = useChessClockStoreContext();

  const suspendResumeButtonDisabled = () =>
    !(chessClockStore.chessClockState === "running" || chessClockStore.chessClockState === "suspended");

  const openSettingsButtonDisabled = () => chessClockStore.chessClockState === "running";

  function handlePause() {
    if (chessClockStore.chessClockState === "suspended") {
      resume();
    } else {
      suspend();
    }
    audioPlayer.suspend();
  }

  function handleClickOutside(ev: MouseEvent) {
    if (ev.target === dialogRef) {
      dialogRef.close();
    }
  }

  function handleOpenModal() {
    dialogRef.showModal();
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

      <button
        title="Settings"
        class={styles.iconButton}
        onClick={handleOpenModal}
        disabled={openSettingsButtonDisabled()}>
        ⛭
      </button>

      <dialog ref={dialogRef} onClick={handleClickOutside}>
        <SettingsView onCancel={() => dialogRef.close()} />
      </dialog>
    </menu>
  );
};
