import type { ParentComponent } from "solid-js";

import styles from "./Toast.module.scss";

import { Show } from "solid-js";
import { Portal } from "solid-js/web";

type ToastProps = {
  visible: boolean;
  classList?: Record<string, boolean>;
  ref?: HTMLDivElement;
};

export const Toast: ParentComponent<ToastProps> = (props) => {
  return (
    <Show when={props.visible}>
      <Portal>
        <div ref={props.ref} classList={{ [styles.toast]: true, ...props.classList }}>
          {props.children}
        </div>
      </Portal>
    </Show>
  );
};
