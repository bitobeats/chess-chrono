import { SettingsStoreContextProvider } from "../contexts/SettingsStoreContext";
import { createSettingsStore } from "../stores/settingsStore";

import { ChessClockStoreContextProvider } from "../contexts/ChessClockStoreContext";
import { createChessClockStore } from "../stores/chessClockStore";

import { Controls } from "./Controls";
import { ChessClock } from "./ChessClock";

export const Main = () => {
  const settingsStore = createSettingsStore();
  const chessClockStore = createChessClockStore();

  return (
    <SettingsStoreContextProvider value={settingsStore}>
      <ChessClockStoreContextProvider value={chessClockStore}>
        <ChessClock />
        <Controls />
      </ChessClockStoreContextProvider>
    </SettingsStoreContextProvider>
  );
};
