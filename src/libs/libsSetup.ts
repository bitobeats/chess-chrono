import type { Settings } from "./settings-manager/types/Settings";

import { ChessClockService } from "./chess-clock-service/ChessClockService";
import { SettingsManager } from "./settings-manager/SettingsManager";
import { Database } from "./persister/Database";
import { AudioPlayer } from "./audio-player/AudioPlayer";

const audioPlayer = new AudioPlayer();

type DatabaseStores = {
  app: {
    settings: Settings;
    session: {};
  };
};

const db = new Database<DatabaseStores>();

await Promise.all([
  db.init({
    name: "chess-chrono",
    version: 1,
    onUpgradeNeeded: (request) => {
      request.result.createObjectStore("app");
    },
  }),
  audioPlayer.init(),
]);

const settingsManager = new SettingsManager(db.createRecordHandler("app", "settings"));
await settingsManager.init();

const chessClockService = new ChessClockService(
  {
    countdownFrom: settingsManager.settings.player1.startTime,
    incrementBy: settingsManager.settings.player1.incrementBy,
  },
  {
    countdownFrom: settingsManager.settings.player2.startTime,
    incrementBy: settingsManager.settings.player2.incrementBy,
  }
);

function updateSettings(newSettings: Readonly<Settings>) {
  if (
    chessClockService.player1Config.countdownFrom !== newSettings.player1.startTime ||
    chessClockService.player1Config.incrementBy !== newSettings.player1.incrementBy ||
    chessClockService.player2Config.countdownFrom !== newSettings.player2.startTime ||
    chessClockService.player2Config.incrementBy !== newSettings.player2.incrementBy
  ) {
    chessClockService.reset();
  }

  chessClockService.player1Config.countdownFrom = newSettings.player1.startTime;
  chessClockService.player1Config.incrementBy = newSettings.player1.incrementBy;
  chessClockService.player2Config.countdownFrom = newSettings.player2.startTime;
  chessClockService.player2Config.incrementBy = newSettings.player2.incrementBy;

  chessClockService.dispatchEvent(
    "playerconfigchange",
    chessClockService.player1Config,
    chessClockService.player2Config
  );
}

settingsManager.addEventListener("settingssaved", updateSettings);

export { settingsManager, chessClockService, audioPlayer };
