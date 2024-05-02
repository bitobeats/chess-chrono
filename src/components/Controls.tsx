import styles from "./Controls.module.scss";

import { useChessClockStoreContext } from "../contexts/ChessClockStoreContext";
import { SettingsView } from "./Settings/SettingsView";
import { audioPlayer } from "../libs/libsSetup";
import { useModal } from "../hooks/useModal";

export const Controls = () => {
  const { Modal, closeModal, openModal } = useModal();

  const { chessClockStore, resume, suspend, reset } = useChessClockStoreContext();

  const suspendResumeButtonDisabled = () =>
    !(chessClockStore.chessClockState === "running" || chessClockStore.chessClockState === "suspended");

  const openSettingsButtonDisabled = () => chessClockStore.chessClockState === "running";

  function handlePause() {
    chessClockStore.chessClockState === "suspended" ? resume() : suspend();
    audioPlayer.suspend();
  }

  function handleResetClick() {
    if (chessClockStore.chessClockState === "running" || chessClockStore.chessClockState === "suspended") {
      const shouldReset = confirm("Are you sure you want to finish the current game?");
      shouldReset && reset();
    } else {
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

      <button title="Settings" class={styles.iconButton} onClick={openModal} disabled={openSettingsButtonDisabled()}>
        ⛭
      </button>

      <Modal class={styles.settingsModal}>
        <SettingsView onCancel={closeModal} />
      </Modal>
    </menu>
  );
};
