import { SettingsStoreContextProvider } from "../contexts/SettingsStoreContext";
import { useSettingsStore } from "../stores/settingsStore";

import { Controls } from "./Controls";
import { ChessClock } from "./ChessClock";

export const Main = () => {
  const settingsStore = useSettingsStore();

  return (
    <SettingsStoreContextProvider value={settingsStore}>
      <ChessClock />
      <Controls />
    </SettingsStoreContextProvider>
  );
};
