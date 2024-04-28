import type { Settings } from "./types/Settings";

import { SimpleEventTarget } from "vrls-simple-event-target";
import { PersistentRecord } from "../persister/PersistentRecord";
import { DEFAULT_SETTINGS } from "./DEFAULT_SETTINGS";

type EventsMap = {
  settingssaved: (currentSettings: Readonly<Settings>) => void;
  settingsloaded: (currentSettings: Readonly<Settings>) => void;
};

export class SettingsManager extends SimpleEventTarget<EventsMap> {
  #settings: Settings;
  #persistentSettings: PersistentRecord<Settings> | null = null;
  #initialized: boolean = false;

  constructor(settings?: Settings) {
    super(["settingssaved", "settingsloaded"]);
    this.#settings = settings ? structuredClone(settings) : DEFAULT_SETTINGS;
  }

  get lastLoadedSettings(): Readonly<Settings> {
    return this.#settings;
  }

  async init() {
    if (this.#initialized) {
      return;
    }

    this.#persistentSettings = new PersistentRecord("settings", this.#settings);
    await this.#persistentSettings.init();
    this.#initialized = true;
  }

  setSettings(callback: (currentSettings: Readonly<Settings>) => Settings) {
    this.#settings = callback(this.#settings);
  }

  async saveSettings() {
    if (!this.#persistentSettings) {
      throw new Error("You must initialize SettingsManager before using.");
    }
    await this.#persistentSettings.set(this.#settings);
    this.dispatchEvent("settingssaved", this.#settings);
  }

  async loadSettings() {
    if (!this.#persistentSettings) {
      throw new Error("You must initialize SettingsManager before using.");
    }

    this.#settings = await this.#persistentSettings.get();
    this.dispatchEvent("settingsloaded", this.#settings);
    return this.#settings;
  }
}
