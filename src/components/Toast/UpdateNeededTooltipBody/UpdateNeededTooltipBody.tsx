import type { VoidComponent } from "solid-js";

import { createSignal } from "solid-js";
import { BaseToast } from "../../Generic/BaseToast/BaseToast";
import { LoadingIndicator } from "../../Generic/LoadingIndicator/LoadingIndicator";

import styles from "./UpdateNeededTooltipBody.module.scss";

type UpdateNeededtooltipBodyProps = {
  update: () => Promise<void>;
  cancel: () => void;
};

export const UpdateNeededTooltipBody: VoidComponent<UpdateNeededtooltipBodyProps> = (props) => {
  const [isUpdating, setIsUpdating] = createSignal(false);

  async function handleUpdate() {
    setIsUpdating(true);
    try {
      await props.update();
    } catch {
      props.cancel();
    }
  }

  const updateButtonContent = () =>
    isUpdating() ? <LoadingIndicator classList={{ [styles.loadingIndicator]: true }} /> : "Install";

  return (
    <BaseToast onClickClose={props.cancel}>
      <div class={styles.container}>
        <div class={styles.textContainer}>
          <span class={styles.text}>A new update is ready!</span>
        </div>

        <div class={styles.buttonsContainer}>
          <button class={styles.button} onClick={handleUpdate} disabled={isUpdating()}>
            {updateButtonContent()}
          </button>
        </div>
      </div>
    </BaseToast>
  );
};
