"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Locale = 'en' | 'es';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
  translations: Record<Locale, Record<string, string>>;
}

export const LanguageProvider = ({ children, translations }: LanguageProviderProps) => {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    // 1. Check Local Storage
    const saved = localStorage.getItem('dental-prodigy-lang') as Locale;
    if (saved) {
      setLocale(saved);
      return;
    }

    // 2. Check Browser Language / IP (Simulation)
    // In a real Vercel deployment, check headers 'x-vercel-ip-country'
    const browserLang = navigator.language;
    if (browserLang.startsWith('es')) {
      setLocale('es');
    }
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('dental-prodigy-lang', newLocale);
  };

  const t = (key: string) => {
    const keys = key.split('.');
    // Simple flat lookup for now
    return translations[locale][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
