import i18n from 'i18next';
import httpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const languages = ['uz', 'ru', 'en'];

i18n
    .use(LanguageDetector)
    .use(httpApi)
    .use(initReactI18next)
    .init({
        fallbackLng: false,
        debug: true,
        whitelist: languages,

        // Prevent multi json load
        load: 'currentOnly',
        backend: { allowMultiLoading: false, },
        // ------------------

        react: { useSuspense: false },
        interpolation: { escapeValue: false }
    });

export default i18n;
