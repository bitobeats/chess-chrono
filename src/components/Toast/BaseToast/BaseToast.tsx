import type { ParentComponent } from "solid-js";

import styles from "./BaseToast.module.scss";

import { AiOutlineCloseCircle } from "solid-icons/ai";

type BaseToastProps = {
  onClickClose: () => void;
};
export const BaseToast: ParentComponent<BaseToastProps> = (props) => {
  return (
    <div class={styles.container}>
      <button title="Close" class={styles.closeButton} onClick={props.onClickClose}>
        <AiOutlineCloseCircle />
      </button>
      <div class={styles.contentContainer}>{props.children}</div>
    </div>
  );
};
