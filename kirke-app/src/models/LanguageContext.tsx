import React, { createContext, useContext, useState } from "react";
import da from "../locales/da.json";
import en from "../locales/en.json";

export interface Locale {
  error: {
    [key: string]: string;
    generic: string;
    loginFailed: string;
    //more fails here if needed
  };
  login: {
    title: string;
    email: string;
    password: string;
    submit: string;
    failedToLogIn: string;
  };
  dashboard: {
    title: string;
    welcomeMessage: string;
  };
  historie: {
    title: string;
    introText: string;
  };
  personlige: {
    title: string;
    fullName: string;
    address: string;
    submit: string;
  };
}

interface LanguageContextProps {
  locale: Locale;
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
  const [locale, setLocale] = useState<Locale>(da);

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
