// Importing i18next for internationalization
import i18n from 'i18next';
// Importing initReactI18next for React integration
import { initReactI18next } from 'react-i18next';
// Importing LanguageDetector for language detection
import LanguageDetector from 'i18next-browser-languagedetector';
// Importing HttpApi for backend integration
import HttpApi from 'i18next-http-backend';

// Initializing i18n with plugins
i18n
  // Using HttpApi for backend
  .use(HttpApi)
  // Using LanguageDetector for language detection
  .use(LanguageDetector)
  // Using initReactI18next for React integration
  .use(initReactI18next)
  // Initializing i18n with configuration
  .init({
    // Setting fallback language to English
    fallbackLng: 'en',
    // Supported languages
    supportedLngs: ['en', 'ar'],
    // Configuration for language detection
    detection: {
      // Order of detection methods
      order: ['querystring', 'cookie'],
      // Caching method
      caches: ['cookie'],
    },
    // Configuration for backend
    backend: {
      // Path for loading language files
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    // Configuration for React
    react: {
      // Disabling suspense for React
      useSuspense: false,
    },
  });

// Exporting i18n instance
export default i18n;
