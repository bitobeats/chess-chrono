import type { JSX } from "solid-js";

import { Show, createSignal } from "solid-js";

type ModalProps = {
  children: JSX.Element;
  class?: string;
};

export function useModal() {
  let dialogRef: HTMLDialogElement | undefined;

  const [isSettingsOpen, setIsSettingsOpen] = createSignal(false);

  const Modal = (props: ModalProps) => {
    function handleClickOutside(ev: MouseEvent) {
      ev.target === dialogRef && dialogRef.close();
    }

    function handleTransitionEnd() {
      if (!dialogRef?.open) {
        setIsSettingsOpen(false);
      }
    }

    return (
      <Show when={isSettingsOpen()}>
        <dialog class={props.class} ref={dialogRef} onClick={handleClickOutside} onTransitionEnd={handleTransitionEnd}>
          {props.children}
        </dialog>
      </Show>
    );
  };

  function openModal() {
    setIsSettingsOpen(true);
    setTimeout(() => dialogRef?.showModal(), 0);
  }

  function closeModal() {
    dialogRef?.close();
  }

  return { openModal, closeModal, Modal };
}
