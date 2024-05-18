import type { VoidComponent } from "solid-js";

import styles from "./UpdateNeededTooltipBody.module.scss";

import { BaseToast } from "../BaseToast/BaseToast";

type UpdateNeededtooltipBodyProps = {
  update: () => Promise<void>;
  cancel: () => void;
};

export const UpdateNeededTooltipBody: VoidComponent<UpdateNeededtooltipBodyProps> = (props) => {
  return (
    <BaseToast onClickClose={props.cancel}>
      <div class={styles.container}>
        <div class={styles.textContainer}>
          <span class={styles.text}>A new update is ready!</span>
        </div>

        <div class={styles.buttonsContainer}>
          <button class={styles.button} onClick={props.update}>
            Install
          </button>
        </div>
      </div>
    </BaseToast>
  );
};