import type { SettingsManager } from "../libs/settings-manager/SettingsManager";

import { createEffect, createResource, onMount, onCleanup } from "solid-js";
import { createStore, reconcile } from "solid-js/store";

import { changeTheme } from "../utils/changeTheme";

export function createSettingsStore(settingsManager: SettingsManager) {
  const [settings, setSettings] = createStore({ ...settingsManager.defaultSettings });

  async function saveSettings() {
    settingsManager.setSettings(() => ({ ...settings }));
    await settingsManager.saveSettings();
  }

  onMount(() => {
    function settingsSavedEventListener() {
      setSettings(reconcile(settingsManager.defaultSettings));
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
