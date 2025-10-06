import type { Settings } from "./types/Settings";
import type { DbRecordHandler } from "../persister/DbRecordHandler";

import { SimpleEventTarget } from "@bitobeats/simple-event-target";
import { DEFAULT_SETTINGS } from "./DEFAULT_SETTINGS";

type EventsMap = {
  settingssaved: (newSettings: Readonly<Settings>) => void;
};

export class SettingsManager extends SimpleEventTarget<EventsMap> {
  #defaultSettings: Settings;
  #dbRecordHandler: DbRecordHandler<Settings>;
  #settings: Settings;

  constructor(dbRecordHandler: DbRecordHandler<Settings>, defaultSettings?: Settings) {
    super(["settingssaved"]);
    this.#defaultSettings = defaultSettings ? structuredClone(defaultSettings) : DEFAULT_SETTINGS;
    this.#settings = this.#defaultSettings;
    this.#dbRecordHandler = dbRecordHandler;
  }
  async init() {
    try {
      this.#settings = (await this.#dbRecordHandler.get()) ?? this.#defaultSettings;
    } catch (err) {
      console.error("Couldn't load persistent settings. Returning default settings. Error: " + err);
    }
  }

  get settings(): Readonly<Settings> {
    return this.#settings;
  }

  async saveSettings(newSettings: Readonly<Settings>) {
    try {
      await this.#dbRecordHandler.set(newSettings);
      this.dispatchEvent("settingssaved", newSettings);
    } catch (err) {
      console.error("Couldn't persist settings. Error: " + err);
    }
  }
}
