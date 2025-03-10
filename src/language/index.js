import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';
import ma from './locales/ma.json';
import te from './locales/te.json';
import ta from './locales/ta.json';
import mr from './locales/mr.json'

export const langResources = {
  en: {translation: en},
  hi: { translation: hi },
  ma: { translation: ma },
  te: { translation: te },
  ta: { translation: ta },
  mr: { translation: mr }
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: langResources,
  iterpolation:{
    escapeValue:false
  }
});
export default i18next;
