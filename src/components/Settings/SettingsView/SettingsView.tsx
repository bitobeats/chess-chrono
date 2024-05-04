import styles from "./SettingsView.module.scss";

import { SettingsForm } from "../SettingsForm/SettingsForm";

type SettingsViewProps = {
  onCancel: () => void;
};
export const SettingsView = (props: SettingsViewProps) => {
  return (
    <div class={styles.container}>
      <h1>Settings</h1>
      <SettingsForm onCancel={props.onCancel} />
    </div>
  );
};
