import styles from "./Controls.module.scss";

import { useChessClockStoreContext } from "../../contexts/ChessClockStoreContext";
import { SettingsForm } from "../Settings/SettingsForm/SettingsForm";
import { audioPlayer } from "../../libs/libsSetup";
import { SettingsDrawer } from "../Generic/SettingsDrawer/SettingsDrawer";

export const Controls = () => {
  const { chessClockStore, resume, suspend, reset } = useChessClockStoreContext();

  const suspendResumeButtonDisabled = () =>
    !(chessClockStore.chessClockState === "running" || chessClockStore.chessClockState === "suspended");

  const openSettingsButtonDisabled = () => chessClockStore.chessClockState === "running";

  const resetButtonDisabled = () => chessClockStore.chessClockState === "ready";

  function handlePause() {
    chessClockStore.chessClockState === "suspended" ? resume() : suspend();
    audioPlayer.suspend();
  }

  function handleResetClick() {
    const isSuspended = chessClockStore.chessClockState === "suspended";
    const isRunning = chessClockStore.chessClockState === "running";
    if (isRunning || isSuspended) {
      if (isRunning) {
        suspend();
      }
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

      <button onClick={handleResetClick} title={"Reset"} class={styles.iconButton} disabled={resetButtonDisabled()}>
        ♺
      </button>

      <SettingsDrawer
        label="Settings"
        openButton={(props) => (
          <button {...props} title="Settings" class={styles.iconButton} disabled={openSettingsButtonDisabled()}>
            ⛭
          </button>
        )}>
        <SettingsForm />
      </SettingsDrawer>
    </menu>
  );
};
