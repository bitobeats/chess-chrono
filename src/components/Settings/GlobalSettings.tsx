import styles from "./GlobalSettings.module.scss";

import { createSelector } from "solid-js";
import { Theme } from "../../libs/settings-manager/enums/Theme";

type GlobalSettingsProps = {
  theme: Theme;
  onChangeTheme: (newValue: Theme) => void;
  soundOn: boolean;
  onChangeSoundOn: (newValue: boolean) => void;
};

type ThemeOption = {
  text: string;
  theme: Theme;
};
export const GlobalSettings = (props: GlobalSettingsProps) => {
  function handleThemeChange(theme: Theme) {
    props.onChangeTheme(theme);
  }

  const selectedTheme = createSelector(() => props.theme);

  const themeOptions: ThemeOption[] = [
    { text: "System", theme: Theme.System },
    {
      text: "Light",
      theme: Theme.Light,
    },
    {
      text: "Dark",
      theme: Theme.Dark,
    },
  ];

  return (
    <div class={styles.container}>
      <div class={styles.optionContainer}>
        <label for="select-theme">Theme</label>
        <select name="theme" id="select-theme" onChange={(ev) => handleThemeChange(ev.target.value as Theme)}>
          {themeOptions.map((themeOption) => (
            <option value={themeOption.theme} selected={selectedTheme(themeOption.theme)}>
              {themeOption.text}
            </option>
          ))}
        </select>
      </div>

      <div class={styles.optionContainer}>
        <label for="checkbox-sound">Sound</label>
        <input
          type="checkbox"
          name="toggle-sound"
          id="checkbox-sound"
          checked={props.soundOn}
          onChange={(ev) => props.onChangeSoundOn(ev.target.checked)}
        />
      </div>
    </div>
  );
};
