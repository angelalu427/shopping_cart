import React from "react";
import { ThemeContext } from "../providers/ThemeContext";
import { ToggleButton } from "./ToggleButton";

export function ThemeToggle() {
  const { theme, handleThemeToggle } = React.useContext(ThemeContext);
  return (
    <ToggleButton
      value={theme === "light"}
      onToggle={handleThemeToggle}
      onLabel="☀️"
      offLabel="🌙"
    />
  );
}