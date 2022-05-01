const initTheme = (theme) => {
  const currentTheme = theme.currentTheme;
  if (currentTheme === null || currentTheme === "light") {
    return "";
  } else if (currentTheme === "dark") {
    return "dark-theme";
  } else {
    console.error("Error in theme mode, please debug");
  }
};

export { initTheme };
