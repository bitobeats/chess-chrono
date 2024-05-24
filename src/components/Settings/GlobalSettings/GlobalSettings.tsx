import type { VoidComponent } from "solid-js";

import { createSelector } from "solid-js";
import { ThemeOption } from "../../../libs/settings-manager/enums/ThemeOption";
import { ToggleSwitch } from "../../Generic/ToggleSwitch/ToggleSwitch";
import { useSettingsStoreContext } from "../../../contexts/SettingsStoreContext";

import styles from "./GlobalSettings.module.scss";

type UiThemeOption = {
  text: string;
  theme: ThemeOption;
};

export const GlobalSettings: VoidComponent = () => {
  const { saveSettings, setSettings, settings } = useSettingsStoreContext();
  const selectedTheme = createSelector(() => settings.global.theme);

  const themeOptions: UiThemeOption[] = [
    { text: "System", theme: ThemeOption.System },
    {
      text: "Light",
      theme: ThemeOption.Light,
    },
    {
      text: "Dark",
      theme: ThemeOption.Dark,
    },
  ];

  async function handleThemeChange(
    ev: Event & {
      currentTarget: HTMLSelectElement;
      target: HTMLSelectElement;
    }
  ) {
    const theme = ev.target.value as ThemeOption;
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
          <select
            name="theme"
            id="select-theme"
            class={styles.themeSelector}
            onChange={handleThemeChange}
            onPointerDown={(ev) => ev.stopPropagation()}>
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
