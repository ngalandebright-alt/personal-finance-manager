import { useState } from "react";
import { CurrencyContext } from "./CurrencyContext";

type CurrencyProviderProps = {
  children: React.ReactNode;
};

export default function CurrencyProvider({
  children,
}: CurrencyProviderProps) {
  const [currency, setCurrencyState] = useState(() => {
    const savedProfile = localStorage.getItem("profile");

    if (!savedProfile) {
      return "ZMW";
    }

    try {
      const profile = JSON.parse(savedProfile);
      return profile.currency || "ZMW";
    } catch {
      return "ZMW";
    }
  });

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);

    const savedProfile = localStorage.getItem("profile");

    let profile = {};

    if (savedProfile) {
      try {
        profile = JSON.parse(savedProfile);
      } catch {
        profile = {};
      }
    }

    localStorage.setItem(
      "profile",
      JSON.stringify({
        ...profile,
        currency: newCurrency,
      })
    );
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}