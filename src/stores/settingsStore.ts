import type { SettingsManager } from "../libs/settings-manager/SettingsManager";
import type { Settings } from "../libs/settings-manager/types/Settings";

import { createEffect, createResource, onMount, onCleanup } from "solid-js";
import { createStore, reconcile, unwrap } from "solid-js/store";

import { changeTheme, changeThemeColor } from "../utils/changeTheme";

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
      changeThemeColor(ev.matches ? "black" : "white");
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
    changeTheme(settings.global.theme);
  });

  return { settings, setSettings, saveSettings };
}
