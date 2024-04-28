import type { SettingsManager } from "../libs/settings-manager/SettingsManager";
import type { Settings } from "../libs/settings-manager/types/Settings";

import { createEffect, createResource, onMount, onCleanup } from "solid-js";
import { createStore, reconcile, unwrap } from "solid-js/store";

import { changeTheme } from "../utils/changeTheme";

export function createSettingsStore(settingsManager: SettingsManager) {
  const [settings, setSettings] = createStore({ ...settingsManager.defaultSettings });

  async function saveSettings() {
    await settingsManager.saveSettings(unwrap(settings));
  }

  onMount(() => {
    function settingsSavedEventListener(newSettings: Settings) {
      setSettings(reconcile(newSettings));
    }

    settingsManager.addEventListener("settingssaved", settingsSavedEventListener);

    onCleanup(() => {
      settingsManager.removeEventListener("settingssaved", settingsSavedEventListener);
    });
  });

  createResource(async () => {
    await settingsManager.init();
    const loadedSettings = await settingsManager.loadSettings();

    if (loadedSettings) {
      setSettings(loadedSettings);
    }

    return await settingsManager.loadSettings();
  });

  createEffect(() => {
    changeTheme(settings.global.theme);
  });

  return { settings, setSettings, saveSettings };
}
