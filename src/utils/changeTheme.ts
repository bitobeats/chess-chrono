import { Theme } from "../libs/settings-manager/enums/Theme";

export function changeTheme(theme: Theme) {
  changeColorScheme(theme === Theme.System ? "light dark" : theme);

  const rootClasses = document.documentElement.classList;

  rootClasses.remove(Theme.Light, Theme.Dark);

  switch (theme) {
    case Theme.System: {
      const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (darkModeQuery) {
        changeThemeColor("rgb(30, 30, 30)");
      } else {
        changeThemeColor("white");
      }
      break;
    }
    case Theme.Dark: {
      rootClasses.add(Theme.Dark);
      changeThemeColor("rgb(30, 30, 30)");
      break;
    }
    case Theme.Light: {
      rootClasses.add(Theme.Light);
      changeThemeColor("white");
      break;
    }
  }
}

function changeColorScheme(colorScheme: "light" | "dark" | "light dark") {
  document.documentElement.style.colorScheme = colorScheme;
}

export function changeThemeColor(color: string) {
  const themeColor = document.querySelector<HTMLMetaElement>(`meta[name="theme-color"]`);
  if (themeColor) {
    themeColor.content = color;
  }
}
