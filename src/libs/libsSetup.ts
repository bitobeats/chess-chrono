import type { Settings } from "./settings-manager/types/Settings";

import { ChessClockService } from "./chess-clock-service/ChessClockService";
import { SettingsManager } from "./settings-manager/SettingsManager";
import { Database } from "./persister/Database";
import { AudioPlayer } from "./audio-player/AudioPlayer";

type DatabaseStores = {
  app: {
    settings: Settings;
    session: {};
  };
};

async function initLibs() {
  const db = new Database<DatabaseStores>();
  await db.init({
    name: "chess-chrono",
    version: 1,
    onUpgradeNeeded: (request) => {
      request.result.createObjectStore("app");
    },
  });

  const audioPlayer = new AudioPlayer();
  const settingsManager = new SettingsManager(db.createRecordHandler("app", "settings"));

  await Promise.all([audioPlayer.init(), settingsManager.init()]);

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

  return { settingsManager, chessClockService, audioPlayer };
}

function wireLibs(chessClockService: ChessClockService, settingsManager: SettingsManager) {
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
}

const { audioPlayer, chessClockService, settingsManager } = await initLibs();

wireLibs(chessClockService, settingsManager);

export { settingsManager, chessClockService, audioPlayer };
