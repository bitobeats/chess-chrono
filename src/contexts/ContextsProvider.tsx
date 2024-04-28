import type { JSXElement } from "solid-js";

import { SettingsStoreContextProvider } from "../contexts/SettingsStoreContext";
import { createSettingsStore } from "../stores/settingsStore";
import { settingsManager } from "../libs/libsSetup";
import { ChessClockStoreContextProvider } from "../contexts/ChessClockStoreContext";
import { createChessClockStore } from "../stores/chessClockStore";
import { chessClockService } from "../libs/libsSetup";

type ContextsProviderProps = {
  children: JSXElement;
};

export const ContextsProvider = (props: ContextsProviderProps) => {
  const settingsStore = createSettingsStore(settingsManager);
  const chessClockStore = createChessClockStore(chessClockService);

  return (
    <SettingsStoreContextProvider value={settingsStore}>
      <ChessClockStoreContextProvider value={chessClockStore}>{props.children}</ChessClockStoreContextProvider>
    </SettingsStoreContextProvider>
  );
};
