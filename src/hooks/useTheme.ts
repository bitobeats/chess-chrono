import { createEffect, onMount, onCleanup } from "solid-js";
import { ThemeOptions } from "../libs/settings-manager/enums/ThemeOptions";
import { changeTheme } from "../utils/changeTheme";

export function useTheme(theme: () => ThemeOptions) {
  onMount(() => {
    function darkModeQueryChangeEventListener(ev: MediaQueryListEvent) {
      if (theme() !== ThemeOptions.System) {
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

    if (currentTheme === ThemeOptions.System) {
      const isOsDarkThemed = window.matchMedia("(prefers-color-scheme: dark)").matches;
      newTheme = isOsDarkThemed ? "dark" : "light";
    } else {
      newTheme = currentTheme;
    }

    changeTheme(newTheme);
  });
}
