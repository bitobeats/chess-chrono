import { ChessClockService } from "./chess-clock-service/ChessClockService";
import { SettingsManager } from "./settings-manager/SettingsManager";
import { AudioPlayer } from "./audio-player/AudioPlayer";

const settingsManager = new SettingsManager();

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

settingsManager.addEventListener("settingsloaded", updateSettings);

settingsManager.addEventListener("settingssaved", updateSettings);

function updateSettings() {
  chessClockService.player1Config.countdownFrom = settingsManager.settings.player1.startTime;
  chessClockService.player1Config.incrementBy = settingsManager.settings.player1.incrementBy;
  chessClockService.player2Config.countdownFrom = settingsManager.settings.player2.startTime;
  chessClockService.player2Config.incrementBy = settingsManager.settings.player2.incrementBy;
  chessClockService.dispatchEvent(
    "playerconfigchange",
    chessClockService.player1Config,
    chessClockService.player2Config
  );
}

const audioPlayer = new AudioPlayer();

export { settingsManager, chessClockService, audioPlayer };
