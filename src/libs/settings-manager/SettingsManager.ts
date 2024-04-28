import type { Settings } from "./types/Settings";

import { SimpleEventTarget } from "vrls-simple-event-target";
import { PersistentRecord } from "../persister/PersistentRecord";
import { DEFAULT_SETTINGS } from "./DEFAULT_SETTINGS";

type EventsMap = {
  settingssaved: (newSettings: Readonly<Settings>) => void;
  settingsloaded: (newSettings: Readonly<Settings>) => void;
};

export class SettingsManager extends SimpleEventTarget<EventsMap> {
  #defaultSettings: Settings;
  #persistentSettings: PersistentRecord<Settings> | null = null;
  #initialized: boolean = false;

  constructor(defaultSettings?: Settings) {
    super(["settingssaved", "settingsloaded"]);
    this.#defaultSettings = defaultSettings ? structuredClone(defaultSettings) : DEFAULT_SETTINGS;
  }

  get defaultSettings(): Readonly<Settings> {
    return this.#defaultSettings;
  }

  async init() {
    if (this.#initialized) {
      return;
    }

    this.#persistentSettings = new PersistentRecord("settings", this.#defaultSettings);
    await this.#persistentSettings.init();
    this.#initialized = true;
  }

  setSettings(callback: (newSettings: Readonly<Settings>) => Settings) {
    this.#defaultSettings = callback(this.#defaultSettings);
  }

  async saveSettings() {
    if (!this.#persistentSettings) {
      throw new Error("You must initialize SettingsManager before using.");
    }
    await this.#persistentSettings.set(this.#defaultSettings);
    this.dispatchEvent("settingssaved", this.#defaultSettings);
  }

  async loadSettings() {
    if (!this.#persistentSettings) {
      throw new Error("You must initialize SettingsManager before using.");
    }

    this.#defaultSettings = await this.#persistentSettings.get();
    this.dispatchEvent("settingsloaded", this.#defaultSettings);
    return this.#defaultSettings;
  }
}
