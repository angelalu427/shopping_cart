import React from "react";

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  handleThemeToggle: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>(
  {
    theme: "light",
    handleThemeToggle: () => {},
  }
);
