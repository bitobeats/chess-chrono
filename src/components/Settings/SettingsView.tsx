import styles from "./SettingsView.module.scss";

import { SettingsForm } from "./SettingsForm";

type SettingsViewProps = {
  onCancel: () => void;
};
export const SettingsView = (props: SettingsViewProps) => {
  return (
    <div class={styles.container}>
      <h2>Settings</h2>
      <SettingsForm onCancel={props.onCancel} />
    </div>
  );
};
