import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// locales
import en from './locales/en.json';
import ru from './locales/ru.json';
import et from './locales/et.json';

// Try to get saved language, fallback to 'et'
const savedLang = localStorage.getItem('lang') || 'et';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      et: { translation: et },
    },
    lng: savedLang,
    fallbackLng: 'et',

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
