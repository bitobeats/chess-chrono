import { createEffect, onMount, onCleanup } from "solid-js";
import { Theme } from "../libs/settings-manager/enums/Theme";
import { changeTheme } from "../utils/changeTheme";

export function useTheme(theme: () => Theme) {
  onMount(() => {
    function darkModeQueryChangeEventListener(ev: MediaQueryListEvent) {
      if (theme() !== Theme.System) {
        return;
      }
      const isOsDarkThemed = ev.matches;
      changeTheme(isOsDarkThemed ? "dark" : "light");
    }

    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkModeQuery.addEventListener("change", darkModeQueryChangeEventListener);

    onCleanup(() => {
      darkModeQuery.removeEventListener("change", darkModeQueryChangeEventListener);
    });
  });

  createEffect(() => {
    const currentTheme = theme();
    let newTheme: "dark" | "light";

    if (currentTheme === Theme.System) {
      const isOsDarkThemed = window.matchMedia("(prefers-color-scheme: dark)").matches;
      newTheme = isOsDarkThemed ? "dark" : "light";
    } else {
      newTheme = currentTheme;
    }

    changeTheme(newTheme);
  });
}
