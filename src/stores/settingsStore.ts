import { createEffect, createResource, onMount, onCleanup } from "solid-js";
import { createStore, reconcile } from "solid-js/store";

import { changeTheme } from "../utils/changeTheme";
import { settingsManager } from "../libs/libsSetup";

export function createSettingsStore() {
  const [settings, setSettings] = createStore({ ...settingsManager.settings });

  function settingsSavedEventListener() {
    setSettings(reconcile(settingsManager.settings));
  }

  async function saveSettings() {
    settingsManager.setSettings(() => ({ ...settings }));
    await settingsManager.saveSettings();
  }

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

  onMount(() => {
    settingsManager.addEventListener("settingssaved", settingsSavedEventListener);
  });

  onCleanup(() => {
    settingsManager.removeEventListener("settingssaved", settingsSavedEventListener);
  });

  return { settings, setSettings, saveSettings };
}
