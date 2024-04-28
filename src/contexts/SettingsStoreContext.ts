import type { useSettingsStore } from "../stores/settingsStore";

import { createContext, useContext } from "solid-js";
const SettingsStoreContext = createContext<ReturnType<typeof useSettingsStore>>();

export const SettingsStoreContextProvider = SettingsStoreContext.Provider;

export function useSettingsStoreContext() {
  const settingsStoreContext = useContext(SettingsStoreContext);

  if (!settingsStoreContext) {
    throw new Error("useSettingsStoreContext must be used inside it's context.");
  }

  return settingsStoreContext;
}
