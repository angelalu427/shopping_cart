import React from "react";
import { CurrencyContext, type Currency } from "./CurrencyContext";
import { type ExchangeRates, fetchExchangeRates } from "../services/exchangeRates";

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => 
  {
    const [currency, setCurrency] = React.useState<Currency>("USD");
    const [rates, setRates] = React.useState<ExchangeRates>({ USD: 1, EUR: 0.85 });
    const handleCurrencyToggle = () => {
      setCurrency((curr) => (curr === "USD" ? "EUR" : "USD"));
    };

    React.useEffect(() => {
      const loadRates = async () => {
        const data = await fetchExchangeRates();
        setRates(data);
      };
      loadRates();
    }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, handleCurrencyToggle, rates }}>
      {children}
    </CurrencyContext.Provider>
  );
};
