import type { ParentComponent } from "solid-js";

import { AiOutlineCloseCircle } from "solid-icons/ai";

import styles from "./BaseToast.module.scss";

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
