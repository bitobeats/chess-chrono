import type { RecordHandler } from "../model/RecordHandler";
import type { Settings } from "./types/Settings";

import { SimpleEventTarget } from "@bitobeats/simple-event-target";
import { DEFAULT_SETTINGS } from "./DEFAULT_SETTINGS";

type EventsMap = {
  settingssaved: (newSettings: Readonly<Settings>) => void;
};

export class SettingsManager extends SimpleEventTarget<EventsMap> {
  #defaultSettings: Settings;
  #recordHandler: RecordHandler<Settings>;
  #settings: Settings;

  constructor(recordHandler: RecordHandler<Settings>, defaultSettings?: Settings) {
    super(["settingssaved"]);
    this.#defaultSettings = defaultSettings ? structuredClone(defaultSettings) : DEFAULT_SETTINGS;
    this.#settings = this.#defaultSettings;
    this.#recordHandler = recordHandler;
  }
  async init() {
    try {
      this.#settings = (await this.#recordHandler.get()) ?? this.#defaultSettings;
    } catch (err) {
      console.error("Couldn't load persistent settings. Returning default settings. Error: " + err);
    }
  }

  get settings(): Readonly<Settings> {
    return this.#settings;
  }

  async saveSettings(newSettings: Readonly<Settings>) {
    try {
      await this.#recordHandler.set(newSettings);
      this.dispatchEvent("settingssaved", newSettings);
    } catch (err) {
      console.error("Couldn't persist settings. Error: " + err);
    }
  }
}
