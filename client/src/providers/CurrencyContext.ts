import React from "react";
import { type ExchangeRates } from "../services/exchangeRates";
export type Currency = "USD" | "EUR";

interface CurrencyContextType {
  currency: Currency;
  handleCurrencyToggle: () => void;
  rates: ExchangeRates;
}

export const CurrencyContext = React.createContext<CurrencyContextType>({
  currency: "USD",
  handleCurrencyToggle: () => {},
  rates: { USD: 1, EUR: 0.85 },
});

