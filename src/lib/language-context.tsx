"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, detectLanguage, setLanguage as saveLanguage, t as translate } from './i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const detected = detectLanguage();
    setLanguageState(detected);
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    saveLanguage(lang);
  };

  const t = (key: string) => translate(key, language);

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return default values if not in provider (for SSR)
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: (key: string) => translate(key, 'en')
    };
  }
  return context;
}
