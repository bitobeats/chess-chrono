import type { VoidComponent } from "solid-js";

import styles from "./SettingsDrawer.module.scss";

import { Drawer } from "corvu/drawer";

export const SettingsDrawer: VoidComponent = () => {
  return (
    <Drawer breakPoints={[0.75]}>
      {(props) => (
        <>
          <Drawer.Trigger class={styles.trigger}>Open Drawer</Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay
              class={styles.overlay}
              style={{
                "background-color": `rgb(0 0 0 / ${0.5 * props.openPercentage})`,
              }}
            />
            <Drawer.Content class={styles.content}>
              <div class={styles.notch} />
              <Drawer.Label class={styles.label}>I'm a drawer!</Drawer.Label>
              <Drawer.Description class={styles.description}>Drag down to close me.</Drawer.Description>
            </Drawer.Content>
          </Drawer.Portal>
        </>
      )}
    </Drawer>
  );
};
