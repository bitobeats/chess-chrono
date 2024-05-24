import type { VoidComponent } from "solid-js";

import styles from "./OfflineReadyTooltipBody.module.scss";

import { BaseToast } from "../../Generic/BaseToast/BaseToast";

type OfflineReadyTooltipBody = {
  close: () => void;
};

export const OfflineReadyTooltipBody: VoidComponent<OfflineReadyTooltipBody> = (props) => {
  return (
    <BaseToast onClickClose={props.close}>
      <div class={styles.container}>
        <span class={styles.title}>Ready to use offline!</span>
        <span class={styles.description}> Add the app to the homescreen for the best experience.</span>
      </div>
    </BaseToast>
  );
};
