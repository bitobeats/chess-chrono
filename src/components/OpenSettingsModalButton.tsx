import type { JSXElement } from "solid-js";

import { useChessClockStore } from "../stores/chessClockStore";

type SettingsModalOpenerProps = {
  modalRef: () => HTMLDialogElement;
  class?: string;
  children: JSXElement;
};

export const OpenSettingsModalButton = (props: SettingsModalOpenerProps) => {
  const { chessClockStore } = useChessClockStore();

  const isDisabled = () => chessClockStore.chessClockState === "running";

  function handleOnClick() {
    props.modalRef().showModal();
  }

  return (
    <button class={props.class} onClick={handleOnClick} disabled={isDisabled()} title="Settings">
      {props.children}
    </button>
  );
};
