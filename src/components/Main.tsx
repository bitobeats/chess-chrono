import { SettingsStoreContextProvider } from "../contexts/SettingsStoreContext";
import { createSettingsStore } from "../stores/settingsStore";

import { Controls } from "./Controls";
import { ChessClock } from "./ChessClock";

export const Main = () => {
  const settingsStore = createSettingsStore();

  return (
    <SettingsStoreContextProvider value={settingsStore}>
      <ChessClock />
      <Controls />
    </SettingsStoreContextProvider>
  );
};
