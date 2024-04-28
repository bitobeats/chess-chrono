import type { createSettingsStore } from "../stores/settingsStore";

import { createContext, useContext } from "solid-js";
const SettingsStoreContext = createContext<ReturnType<typeof createSettingsStore>>();

export const SettingsStoreContextProvider = SettingsStoreContext.Provider;

export function useSettingsStoreContext() {
  const settingsStoreContext = useContext(SettingsStoreContext);

  if (!settingsStoreContext) {
    throw new Error("useSettingsStoreContext must be used inside it's context.");
  }

  return settingsStoreContext;
}
