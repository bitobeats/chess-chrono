import type { VoidComponent } from "solid-js";

import { BaseToast } from "../../Generic/BaseToast/BaseToast";

import styles from "./OfflineReadyTooltipBody.module.scss";

type OfflineReadyTooltipBody = {
  close: () => void;
};

export const OfflineReadyTooltipBody: VoidComponent<OfflineReadyTooltipBody> = (props) => {
  return (
    <BaseToast onClickClose={props.close}>
      <div class={styles.container}>
        <span class={styles.title}>Ready to use offline!</span>
      </div>
    </BaseToast>
  );
};
