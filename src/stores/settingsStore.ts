import { createSignal, onMount, createEffect } from "solid-js";
import { createStore, reconcile } from "solid-js/store";

import { changeTheme } from "../utils/changeTheme";
import { settingsManager } from "../libs/libsSetup";
import { Theme } from "../libs/settings-manager/enums/Theme";

let init = false;

const [settingsStore, setSettingsStore] = createStore({ ...settingsManager.settings });

settingsManager.addEventListener("settingsloaded", (newSettings) => {
  setSettingsStore(reconcile(newSettings));
});

settingsManager.addEventListener("settingssaved", () => {
  setSettingsStore(reconcile(settingsManager.settings));
});

const [persistentStorageStatus, setPersistentStorageStatus] = createSignal<"loading" | "ready" | "error">("loading");

export function useSettingsStore() {
  const settings = settingsStore;
  const setSettings = settingsManager.setSettings.bind(settingsManager);
  const saveSettings = settingsManager.saveSettings.bind(settingsManager);

  onMount(async () => {
    if (!init) {
      try {
        await settingsManager.init();
        await settingsManager.loadSettings();
        setPersistentStorageStatus("ready");
      } catch {
        setPersistentStorageStatus("error");
      }
      init = true;
    }
  });

  createEffect(() => {
    changeTheme(settingsStore.global.theme);
  });

  return { settings, setSettings, saveSettings, persistentStorageStatus };
}
