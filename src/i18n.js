import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import uzTranslation from './locales/uz/translation.json';
import ruTranslation from './locales/ru/translation.json';
import enTranslation from './locales/en/translation.json';

const resources = {
  uz: {
    translation: uzTranslation
  },
  ru: {
    translation: ruTranslation
  },
  en: {
    translation: enTranslation
  }
};

i18n
  .use(LanguageDetector) // Tilni avtomatik aniqlash
  .use(initReactI18next) // React integration
  .init({
    resources,
    fallbackLng: 'uz', // Default til
    lng: localStorage.getItem('i18nextLng') || 'uz', // localStorage'dan til olish
    debug: false, // Development rejimda true qilish mumkin
    
    interpolation: {
      escapeValue: false // React allaqachon XSS'dan himoya qiladi
    },

    // LocalStorage'da saqlash uchun
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
