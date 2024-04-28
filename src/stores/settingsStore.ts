import { createSignal, onMount, createEffect } from "solid-js";
import { createStore, reconcile } from "solid-js/store";

import { changeTheme } from "../utils/changeTheme";
import { settingsManager } from "../libs/libsSetup";

const [settingsStore, setSettingsStore] = createStore({ ...settingsManager.settings });

settingsManager.addEventListener("settingsloaded", (newSettings) => {
  setSettingsStore(reconcile(newSettings));
});

settingsManager.addEventListener("settingssaved", () => {
  setSettingsStore(reconcile(settingsManager.settings));
});

const [persistentStorageStatus, setPersistentStorageStatus] = createSignal<"loading" | "ready" | "error">("loading");

export function createSettingsStore() {
  const settings = settingsStore;
  const setSettings = settingsManager.setSettings.bind(settingsManager);
  const saveSettings = settingsManager.saveSettings.bind(settingsManager);

  onMount(async () => {
    try {
      await settingsManager.init();
      await settingsManager.loadSettings();
      setPersistentStorageStatus("ready");
    } catch {
      setPersistentStorageStatus("error");
    }
  });

  createEffect(() => {
    changeTheme(settingsStore.global.theme);
  });

  return { settings, setSettings, saveSettings, persistentStorageStatus };
}
