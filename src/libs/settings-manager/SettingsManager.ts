import type { Settings } from "./types/Settings";
import type { DbRecordHandler } from "../persister/DbRecordHandler";

import { SimpleEventTarget } from "@bitobeats/simple-event-target";
import { DEFAULT_SETTINGS } from "./DEFAULT_SETTINGS";

type EventsMap = {
  settingssaved: (newSettings: Readonly<Settings>) => void;
  settingsloaded: (newSettings: Readonly<Settings>) => void;
};

export class SettingsManager extends SimpleEventTarget<EventsMap> {
  #defaultSettings: Settings;
  #dbRecordHandler: DbRecordHandler<Settings>;

  constructor(dbRecordHandler: DbRecordHandler<Settings>, defaultSettings?: Settings) {
    super(["settingssaved", "settingsloaded"]);
    this.#defaultSettings = defaultSettings ? structuredClone(defaultSettings) : DEFAULT_SETTINGS;
    this.#dbRecordHandler = dbRecordHandler;
  }

  get defaultSettings(): Readonly<Settings> {
    return this.#defaultSettings;
  }

  async saveSettings(newSettings: Readonly<Settings>) {
    try {
      await this.#dbRecordHandler.set(newSettings);
      this.dispatchEvent("settingssaved", newSettings);
    } catch (err) {
      console.error("Couldn't persist settings. Error: " + err);
    }
  }

  async loadSettings(): Promise<Readonly<Settings>> {
    try {
      const settings = (await this.#dbRecordHandler.get()) ?? this.#defaultSettings;
      this.dispatchEvent("settingsloaded", settings);
      return settings;
    } catch (err) {
      console.error("Couldn't load persistent settings. Returning default settings. Error: " + err);
      return this.#defaultSettings;
    }
  }
}
