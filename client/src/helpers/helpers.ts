import type { CartItem } from "../types";
import { type ExchangeRates } from "../services/exchangeRates";
import { type Currency } from "../providers/CurrencyContext";

export const calculateTotal = (cartItems: CartItem[]) => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const formatPrice = (
  priceUSD: number,
  targetCurrency: Currency,
  rates?: ExchangeRates
) => {
  const targetCurrencyRate = rates ? rates[targetCurrency] : 1;

  const amount = priceUSD * targetCurrencyRate;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: targetCurrency,
  }).format(amount);
};