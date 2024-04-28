import { Theme } from "../libs/settings-manager/enums/Theme";

export function changeTheme(theme: Theme) {
  changeColorScheme(theme === Theme.System ? "light dark" : theme);

  const rootClasses = document.documentElement.classList;

  rootClasses.remove(Theme.Light, Theme.Dark);

  switch (theme) {
    case Theme.System: {
      break;
    }
    case Theme.Dark: {
      rootClasses.add(Theme.Dark);
      changeThemeColor("black");
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

function changeThemeColor(color: string) {
  const themeColor = document.querySelector<HTMLMetaElement>(`meta[name="theme-color"]`);
  if (themeColor) {
    themeColor.content = color;
  }
}
