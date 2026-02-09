import type { Currency } from "../providers/CurrencyContext";

const BASE_URL = "https://open.er-api.com/v6/latest/USD";

export type ExchangeRates = {
  [K in Currency]: number;
};

export const fetchExchangeRates = async (): Promise<ExchangeRates> => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();

    return {
      USD: 1,
      EUR: data.rates.EUR,
    };
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);
    return {
      USD: 1,
      EUR: 0.85,
    };
  }
};
