import { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [theme, setThemeState] = useState({
    currentTheme: ["light", "dark"].includes(
      localStorage.getItem("currentTheme")
    )
      ? localStorage.getItem("currentTheme")
      : "light",
  });

  const setTheme = (updatedTheme) => {
    localStorage.setItem("currentTheme", updatedTheme.currentTheme);

    setThemeState(() => {
      return {
        ...updatedTheme,
      };
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);
export { ThemeContextProvider, useTheme };
