import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // LocalStorage'dan tilni olish yoki default o'zbek
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'uz';
  });

  // Tilni o'zgartirish funksiyasi
  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  useEffect(() => {
    // Tilni HTML attribute'ga qo'shish (SEO uchun)
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
