import type { Player } from "../../../libs/chess-clock-service/types/Player";
import type { Theme } from "../../../libs/settings-manager/enums/Theme";

import styles from "./SettingsForm.module.scss";

import { GlobalSettings } from "../GlobalSettings/GlobalSettings";
import { PlayerSettings } from "../PlayerSettings/PlayerSettings";
import { useSettingsStoreContext } from "../../../contexts/SettingsStoreContext";

type SettingsFormProps = {
  onCancel: () => void;
};

export const SettingsForm = (props: SettingsFormProps) => {
  let formRef!: HTMLFormElement;

  const { saveSettings, settings, setSettings } = useSettingsStoreContext();

  const players: Player[] = [1, 2];

  async function onChangeTheme(newValue: Theme) {
    setSettings("global", "theme", newValue);
    await saveSettings();
  }

  async function onChangeSoundOn(newValue: boolean) {
    setSettings("global", "soundOn", newValue);
    await saveSettings();
  }

  return (
    <form ref={formRef} class={styles.form} autocomplete="off">
      <div class={styles.playerSettingsContainer}>
        {players.map((player) => (
          <PlayerSettings player={player} />
        ))}
      </div>

      <GlobalSettings
        theme={settings.global.theme}
        soundOn={settings.global.soundOn}
        onChangeTheme={onChangeTheme}
        onChangeSoundOn={onChangeSoundOn}
      />

      <menu class={styles.optionsMenu}>
        <button class={styles.closeButton} type="button" onClick={props.onCancel} autofocus>
          Ok
        </button>
      </menu>
    </form>
  );
};
