import type { VoidComponent } from "solid-js";

import styles from "./UpdateNeededTooltipBody.module.scss";

type UpdateNeededtooltipBodyProps = {
  update: () => Promise<void>;
  cancel: () => void;
};

export const UpdateNeededTooltipBody: VoidComponent<UpdateNeededtooltipBodyProps> = (props) => {
  return (
    <div class={styles.container}>
      <div class={styles.textContainer}>
        <span class={styles.text}>A new update is ready. Install now?</span>
      </div>

      <div class={styles.buttonsContainer}>
        <button class={styles.button} onClick={props.cancel}>
          Later
        </button>
        <button class={styles.button} onClick={props.update}>
          Install
        </button>
      </div>
    </div>
  );
};
