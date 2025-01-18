import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

/**
 * i18n configuration for internationalization.
 *
 * Configures the i18next library with language detection, backend loading,
 * and React integration for handling translations throughout the application.
 *
 * @example
 * ```tsx
 * // Basic usage in component
 * import { useTranslation } from 'react-i18next';
 *
 * function Component() {
 *   const { t } = useTranslation();
 *   return <div>{t('key')}</div>;
 * }
 * ```
 *
 * @see {@link i18next} For core internationalization functionality
 * @see {@link Backend} For loading translation files
 * @see {@link LanguageDetector} For auto-detecting user language
 */
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    fallbackLng: "en-US",
    supportedLngs: ["en-US", "fr-FR"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: [
        "localStorage",
        "navigator",
        "path",
        "cookie",
        "htmlTag",
        "subdomain",
      ],
      caches: ["localStorage"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

export default i18n;
