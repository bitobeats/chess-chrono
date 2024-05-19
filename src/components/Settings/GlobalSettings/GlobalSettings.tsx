import type { VoidComponent } from "solid-js";

import styles from "./GlobalSettings.module.scss";

import { createSelector } from "solid-js";
import { ThemeOptions } from "../../../libs/settings-manager/enums/ThemeOptions";
import { ToggleSwitch } from "../../Generic/ToggleSwitch/ToggleSwitch";
import { useSettingsStoreContext } from "../../../contexts/SettingsStoreContext";

type ThemeOption = {
  text: string;
  theme: ThemeOptions;
};

export const GlobalSettings: VoidComponent = () => {
  const { saveSettings, setSettings, settings } = useSettingsStoreContext();
  const selectedTheme = createSelector(() => settings.global.theme);

  const themeOptions: ThemeOption[] = [
    { text: "System", theme: ThemeOptions.System },
    {
      text: "Light",
      theme: ThemeOptions.Light,
    },
    {
      text: "Dark",
      theme: ThemeOptions.Dark,
    },
  ];

  async function handleThemeChange(
    ev: Event & {
      currentTarget: HTMLSelectElement;
      target: HTMLSelectElement;
    }
  ) {
    const theme = ev.target.value as ThemeOptions;
    setSettings("global", "theme", theme);
    await saveSettings();
  }

  async function handleToggleSound(
    ev: Event & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) {
    setSettings("global", "soundOn", ev.currentTarget.checked);
    await saveSettings();
  }

  return (
    <div class={styles.container}>
      <span class={styles.label}>Global</span>
      <fieldset class={styles.fieldset}>
        <div class={styles.optionContainer}>
          <label for="select-theme">Theme</label>
          <select name="theme" id="select-theme" class={styles.themeSelector} onChange={handleThemeChange}>
            {themeOptions.map((themeOption) => (
              <option value={themeOption.theme} selected={selectedTheme(themeOption.theme)}>
                {themeOption.text}
              </option>
            ))}
          </select>
        </div>

        <div class={styles.optionContainer}>
          <label for="checkbox-sound">Sound</label>
          <ToggleSwitch
            checked={settings.global.soundOn}
            onChange={handleToggleSound}
            name="toggle-sound"
            id="checkbox-sound"
          />
        </div>
      </fieldset>
    </div>
  );
};
