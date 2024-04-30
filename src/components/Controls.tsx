import styles from "./Controls.module.scss";

import { Show, createSignal } from "solid-js";
import { useChessClockStoreContext } from "../contexts/ChessClockStoreContext";
import { SettingsView } from "./Settings/SettingsView";
import { audioPlayer } from "../libs/libsSetup";

export const Controls = () => {
  let dialogRef: HTMLDialogElement | undefined;

  const [isSettingsOpen, setIsSettingsOpen] = createSignal(false);

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
      handleCloseModal();
    }
  }

  function handleOpenModal() {
    setIsSettingsOpen(true);
    setTimeout(() => dialogRef?.showModal());
  }

  function handleCloseModal() {
    dialogRef?.close();
  }

  function handleResetClick() {
    const shouldReset = confirm("Are you sure you want to finish the current game?");
    shouldReset && reset();
  }

  function handleOnClose() {
    if (dialogRef) {
      dialogRef.ontransitionend = () => {
        setIsSettingsOpen(false);
      };
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

      <Show when={isSettingsOpen()}>
        <dialog class={styles.settingsModal} ref={dialogRef} onClick={handleClickOutside} onClose={handleOnClose}>
          <SettingsView onCancel={handleCloseModal} />
        </dialog>
      </Show>
    </menu>
  );
};
