import type { SettingsManager } from "../libs/settings-manager/SettingsManager";
import type { Settings } from "../libs/settings-manager/types/Settings";

import { onMount, onCleanup, createSignal } from "solid-js";
import { createStore, reconcile, unwrap } from "solid-js/store";

import { useTheme } from "../hooks/useTheme";

export function createSettingsStore(settingsManager: SettingsManager) {
  const [settings, setSettings] = createStore({ ...settingsManager.defaultSettings });
  const [isReady, setIsReady] = createSignal(false);

  useTheme(() => settings.global.theme);

  async function saveSettings() {
    await settingsManager.saveSettings(unwrap(settings));
  }

  onMount(() => {
    function updateSettings(newSettings: Settings) {
      setSettings(reconcile(newSettings));
    }

    settingsManager.addEventListener("settingssaved", updateSettings);
    settingsManager.addEventListener("settingsloaded", updateSettings);

    async function loadSettings() {
      await settingsManager.init();
      await settingsManager.loadSettings();

      document.startViewTransition(() => {
        setIsReady(true);
      });
    }

    loadSettings();

    onCleanup(() => {
      settingsManager.removeEventListener("settingssaved", updateSettings);
      settingsManager.removeEventListener("settingsloaded", updateSettings);
    });
  });

  return { settings, setSettings, saveSettings, isReady };
}
