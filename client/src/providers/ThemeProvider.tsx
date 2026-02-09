import React from "react";
import { ThemeContext, type Theme } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<Theme>("light");
  const handleThemeToggle = () => setTheme(curr => curr === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, handleThemeToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
