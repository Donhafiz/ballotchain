"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language, languages } from "./translations";

interface I18nContextType {
  t: (key: string) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
  languages: typeof languages;
}

const I18nContext = createContext<I18nContextType>({} as I18nContextType);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("ballotchain-lang") as Language;
    if (saved && translations[saved]) setLanguage(saved);
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("ballotchain-lang", lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ t, language, setLanguage: changeLanguage, languages }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);