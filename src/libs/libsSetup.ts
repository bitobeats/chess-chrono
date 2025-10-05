import type { Settings } from "./settings-manager/types/Settings";

import { ChessClockService } from "./chess-clock-service/ChessClockService";
import { SettingsManager } from "./settings-manager/SettingsManager";
import { AudioPlayer } from "./audio-player/AudioPlayer";

const settingsManager = new SettingsManager();

const chessClockService = new ChessClockService(
  {
    countdownFrom: settingsManager.defaultSettings.player1.startTime,
    incrementBy: settingsManager.defaultSettings.player1.incrementBy,
  },
  {
    countdownFrom: settingsManager.defaultSettings.player2.startTime,
    incrementBy: settingsManager.defaultSettings.player2.incrementBy,
  }
);

settingsManager.addEventListener("settingsloaded", updateSettings);

settingsManager.addEventListener("settingssaved", updateSettings);

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

const audioPlayer = new AudioPlayer();

await Promise.all([settingsManager.init(), audioPlayer.init()]);

export { settingsManager, chessClockService, audioPlayer };
