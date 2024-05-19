const DARK_THEME_COLOR = "rgb(30, 30, 30)";
const LIGHT_THEME_COLOR = "white";

export function changeTheme(theme: "light" | "dark") {
  changeColorScheme(theme);

  const rootClasses = document.documentElement.classList;

  rootClasses.remove("light", "dark");

  switch (theme) {
    case "dark": {
      enableDarkTheme(rootClasses);
      break;
    }
    case "light": {
      enableLightTheme(rootClasses);
      break;
    }
  }
}

function enableLightTheme(rootClasses: DOMTokenList) {
  rootClasses.add("light");
  changeThemeColor(LIGHT_THEME_COLOR);
}

function enableDarkTheme(rootClasses: DOMTokenList) {
  rootClasses.add("dark");
  changeThemeColor(DARK_THEME_COLOR);
}

function changeColorScheme(colorScheme: "light" | "dark") {
  document.documentElement.style.colorScheme = colorScheme;
}

function changeThemeColor(color: string) {
  const themeColor = document.querySelector<HTMLMetaElement>(`meta[name="theme-color"]`);
  if (themeColor) {
    themeColor.content = color;
  }
}
