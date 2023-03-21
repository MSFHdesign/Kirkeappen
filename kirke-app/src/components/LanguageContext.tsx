import React, { createContext, useContext, useState } from "react";
import da from "../locales/da.json";
import en from "../locales/en.json";
import { iTexts } from "../models/iTexts";

interface LanguageContextProps {
  locale: iTexts;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextProps>({
  locale: da,
  toggleLocale: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [locale, setLocale] = useState<iTexts>(da);

  const toggleLocale = () => {
    if (locale === da) {
      setLocale(en);
    } else {
      setLocale(da);
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};
