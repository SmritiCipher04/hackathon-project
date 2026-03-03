import { translations } from "../i18n/translations";
import { useAppStore } from "../stores/appStore";

/**
 * useTranslation — returns a `t(key)` function that resolves
 * UI strings in the currently selected language.
 * Falls back to English if a key is missing in the active language.
 */
export function useTranslation() {
  const language = useAppStore((s) => s.language);

  const t = (key) => {
    const lang = translations[language] ?? translations.en;
    return lang[key] ?? translations.en[key] ?? key;
  };

  return { t, language };
}
