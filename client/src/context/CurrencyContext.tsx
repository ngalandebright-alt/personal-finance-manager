import { createContext } from "react";

export type CurrencyContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
};

export const CurrencyContext =
  createContext<CurrencyContextType | undefined>(undefined);