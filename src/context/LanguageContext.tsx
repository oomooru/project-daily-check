import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import en from '../i18n/locales/en.json';
import ko from '../i18n/locales/ko.json';
import ja from '../i18n/locales/ja.json';
import { loadLanguage, saveLanguage } from '../system/AsyncStorage';

type ContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, options?: object) => string;
  isReady: boolean;
};

const LanguageContext = createContext<ContextType | null>(null);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isReady, setIsReady] = useState(false);

  const i18n = useMemo(() => {
    const instance = new I18n({ en, ko, ja });
    instance.enableFallback = true;
    instance.defaultLocale = 'en';
    return instance;
  }, []);

  const persistLanguage = async (lang: string) => {
    try {
      await saveLanguage(lang);
    } catch (error) {
      console.error('Failed to persist language:', error);
    }
  };

  useEffect(() => {
    const initLanguage = async () => {
      try {
        const savedLanguage = await loadLanguage();
        
        const locale = savedLanguage || Localization.getLocales()[0]?.languageCode || 'en';
        
        i18n.locale = locale;
        setLanguage(locale);
        
        if (!savedLanguage) {
          await persistLanguage(locale);
        }
        
        setIsReady(true);
      } catch (error) {
        console.error('Language initialization failed:', error);
        i18n.locale = 'en';
        setLanguage('en');
        setIsReady(true);
      }
    };

    initLanguage();
  }, [i18n]);

  const handleSetLanguage = async (lang: string) => {
    try {
      i18n.locale = lang;
      setLanguage(lang);
      await persistLanguage(lang);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  const value = useMemo(() => ({
    language,
    setLanguage: handleSetLanguage,
    t: i18n.t.bind(i18n),
    isReady,
  }), [language, isReady, i18n]);

  return (
    <LanguageContext.Provider value={value}>
      {isReady ? children : null}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};