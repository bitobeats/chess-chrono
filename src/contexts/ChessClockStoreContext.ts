import { createChessClockStore } from "../stores/chessClockStore";

import { createContext, useContext } from "solid-js";

const ChessClockStoreContext = createContext<ReturnType<typeof createChessClockStore>>();

export const ChessClockStoreContextProvider = ChessClockStoreContext.Provider;

export function useChessClockStoreContext() {
  const chessClockStoreContext = useContext(ChessClockStoreContext);

  if (!chessClockStoreContext) {
    throw new Error("You must use chessClockStoreContext inside it's provider.");
  }

  return chessClockStoreContext;
}
