const DARK_THEME_COLOR = "rgb(30, 30, 30)";
const LIGHT_THEME_COLOR = "white";

type Theme = "light" | "dark";

export function changeTheme(theme: Theme) {
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
  changeDataTheme("light");
}

function enableDarkTheme(rootClasses: DOMTokenList) {
  rootClasses.add("dark");
  changeThemeColor(DARK_THEME_COLOR);
  changeDataTheme("dark");
}

function changeColorScheme(colorScheme: "light" | "dark") {
  document.documentElement.style.colorScheme = colorScheme;
}

function changeDataTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function changeThemeColor(color: string) {
  const themeColor = document.querySelector<HTMLMetaElement>(`meta[name="theme-color"]`);
  if (themeColor) {
    themeColor.content = color;
  }
}
