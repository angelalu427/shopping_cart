import React from "react";
import { CurrencyContext } from "../providers/CurrencyContext";
import { ToggleButton } from "./ToggleButton";

export function CurrencyToggle() {
  const { currency, handleCurrencyToggle } = React.useContext(CurrencyContext);
  return (
    <ToggleButton
      value={currency === "USD"}
      onToggle={handleCurrencyToggle}
      onLabel="USD $"
      offLabel="EUR €"
    />
  );
}
