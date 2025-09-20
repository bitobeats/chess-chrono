const DARK_THEME_COLOR = "rgb(30, 30, 30)";
const LIGHT_THEME_COLOR = "white";

type Theme = "light" | "dark";

export function changeTheme(theme: Theme) {
  changeDataTheme(theme);

  switch (theme) {
    case "dark": {
      changeThemeColor(DARK_THEME_COLOR);
      break;
    }
    case "light": {
      changeThemeColor(LIGHT_THEME_COLOR);
      break;
    }
  }
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
