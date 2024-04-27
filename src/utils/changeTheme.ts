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
    }
    case Theme.Light: {
      rootClasses.add(Theme.Light);
    }
  }
}

function changeColorScheme(colorScheme: "light" | "dark" | "light dark") {
  document.documentElement.style.colorScheme = colorScheme;
}
