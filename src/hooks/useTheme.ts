import { createEffect, onMount, onCleanup } from "solid-js";
import { ThemeOption } from "../libs/settings-manager/enums/ThemeOption";
import { changeTheme } from "../utils/changeTheme";

export function useTheme(theme: () => ThemeOption) {
  const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const isOsDarkThemed = () => darkModeQuery.matches;

  onMount(() => {
    function darkModeQueryChangeEventListener() {
      if (theme() !== ThemeOption.System) {
        return;
      }

      changeTheme(isOsDarkThemed() ? "dark" : "light");
    }

    darkModeQuery.addEventListener("change", darkModeQueryChangeEventListener);

    onCleanup(() => {
      darkModeQuery.removeEventListener("change", darkModeQueryChangeEventListener);
    });
  });

  createEffect(() => {
    const currentTheme = theme();
    let newTheme: "dark" | "light";

    if (currentTheme === ThemeOption.System) {
      newTheme = isOsDarkThemed() ? "dark" : "light";
    } else {
      newTheme = currentTheme;
    }

    changeTheme(newTheme);
  });
}
