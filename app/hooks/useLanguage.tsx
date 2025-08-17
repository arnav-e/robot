'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { Language, LanguageTexts } from '../types/language';
import { languages } from '../data/languages';

interface LanguageContextType {
  language: Language;
  texts: LanguageTexts;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load saved language preference from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
  };

  const texts = languages[language];

  return (
    <LanguageContext.Provider value={{ language, texts, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};


