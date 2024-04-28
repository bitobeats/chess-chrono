import styles from "./Controls.module.scss";

import { lazy, Suspense } from "solid-js";

import { OpenSettingsModalButton } from "./OpenSettingsModalButton";
import { useChessClockStoreContext } from "../contexts/ChessClockStoreContext";
import { audioPlayer } from "../libs/libsSetup";

const SettingsView = lazy(async () => {
  const { SettingsView } = await import("./Settings/SettingsView");
  return { default: SettingsView };
});
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

  return (
    <menu class={styles.container}>
      <button
        class={styles.iconButton}
        disabled={suspendResumeButtonDisabled()}
        onClick={handlePause}
        title="Pause/Resume">
        {chessClockStore.chessClockState === "suspended" ? "▶︎" : "||"}
      </button>
      <button onClick={reset} title={"Reset"} class={styles.iconButton}>
        ♺
      </button>
      <OpenSettingsModalButton class={styles.iconButton} modalRef={() => dialogRef}>
        ⛭
      </OpenSettingsModalButton>
      <dialog ref={dialogRef} onClick={handleClickOutside}>
        <Suspense fallback="Loading...">
          <SettingsView onCancel={() => dialogRef.close()} />
        </Suspense>
      </dialog>
    </menu>
  );
};
