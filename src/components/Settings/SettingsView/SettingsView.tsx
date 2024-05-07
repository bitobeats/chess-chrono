import styles from "./SettingsView.module.scss";

import { SettingsForm } from "../SettingsForm/SettingsForm";

type SettingsViewProps = {
  onClickClose: () => void;
};
export const SettingsView = (props: SettingsViewProps) => {
  return (
    <div class={styles.container}>
      <header class={styles.header}>
        <h1 class={styles.title}>Settings</h1>
        <button class={styles.closeButton} onClick={props.onClickClose}>
          X
        </button>
      </header>
      <SettingsForm />
    </div>
  );
};
