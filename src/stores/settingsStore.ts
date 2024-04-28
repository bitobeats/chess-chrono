import { createEffect, createResource } from "solid-js";
import { createStore, reconcile } from "solid-js/store";

import { changeTheme } from "../utils/changeTheme";
import { settingsManager } from "../libs/libsSetup";

const [settingsStore, setSettingsStore] = createStore({ ...settingsManager.settings });

settingsManager.addEventListener("settingssaved", () => {
  setSettingsStore(reconcile(settingsManager.settings));
});

export function createSettingsStore() {
  const settings = settingsStore;
  const setSettings = setSettingsStore;

  async function saveSettings() {
    settingsManager.setSettings(() => ({ ...settingsStore }));
    await settingsManager.saveSettings();
  }

  createResource(async () => {
    await settingsManager.init();
    const loadedSettings = await settingsManager.loadSettings();

    if (loadedSettings) {
      setSettingsStore(loadedSettings);
    }

    return await settingsManager.loadSettings();
  });

  createEffect(() => {
    changeTheme(settingsStore.global.theme);
  });

  return { settings, setSettings, saveSettings };
}
