import type { SettingsManager } from "../libs/settings-manager/SettingsManager";
import type { Settings } from "../libs/settings-manager/types/Settings";

import { onMount, onCleanup } from "solid-js";
import { createStore, reconcile, unwrap } from "solid-js/store";

import { useTheme } from "../hooks/useTheme";

export function createSettingsStore(settingsManager: SettingsManager) {
  const [settings, setSettings] = createStore({ ...settingsManager.settings });

  useTheme(() => settings.global.theme);

  async function saveSettings() {
    await settingsManager.saveSettings(unwrap(settings));
  }

  onMount(() => {
    function updateSettings(newSettings: Settings) {
      setSettings(reconcile(newSettings));
    }

    settingsManager.addEventListener("settingssaved", updateSettings);

    onCleanup(() => {
      settingsManager.removeEventListener("settingssaved", updateSettings);
    });
  });

  return { settings, setSettings, saveSettings };
}
