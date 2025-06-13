// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ⏩ Импортируем каждую локаль ЯВНО:
import en from './locales/en.json';
import ru from './locales/ru.json';
import et from './locales/et.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      et: { translation: et },
    },
    lng: 'et',         // язык по умолчанию
    fallbackLng: 'et', // язык запасной

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
