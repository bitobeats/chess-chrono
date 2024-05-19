import type { SettingsManager } from "../libs/settings-manager/SettingsManager";
import type { Settings } from "../libs/settings-manager/types/Settings";

import { createEffect, createResource, onMount, onCleanup } from "solid-js";
import { createStore, reconcile, unwrap } from "solid-js/store";

import { changeTheme } from "../utils/changeTheme";
import { Theme } from "../libs/settings-manager/enums/Theme";

export function createSettingsStore(settingsManager: SettingsManager) {
  const [settings, setSettings] = createStore({ ...settingsManager.defaultSettings });

  async function saveSettings() {
    await settingsManager.saveSettings(unwrap(settings));
  }

  onMount(() => {
    function settingsSavedEventListener(newSettings: Settings) {
      setSettings(reconcile(newSettings));
    }

    function darkModeQueryChangeEventListener(ev: MediaQueryListEvent) {
      if (settings.global.theme !== Theme.System) {
        return;
      }
      const isOsDarkThemed = ev.matches;
      changeTheme(isOsDarkThemed ? "dark" : "light");
    }

    settingsManager.addEventListener("settingssaved", settingsSavedEventListener);

    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkModeQuery.addEventListener("change", darkModeQueryChangeEventListener);

    onCleanup(() => {
      settingsManager.removeEventListener("settingssaved", settingsSavedEventListener);
      darkModeQuery.removeEventListener("change", darkModeQueryChangeEventListener);
    });
  });

  createResource(async () => {
    await settingsManager.init();
    const loadedSettings = await settingsManager.loadSettings();

    if (loadedSettings) {
      setSettings(loadedSettings);
    }
  });

  createEffect(() => {
    let theme: "dark" | "light";

    if (settings.global.theme === Theme.System) {
      const isOsDarkThemed = window.matchMedia("(prefers-color-scheme: dark)").matches;
      theme = isOsDarkThemed ? "dark" : "light";
    } else {
      theme = settings.global.theme;
    }

    changeTheme(theme);
  });

  return { settings, setSettings, saveSettings };
}
