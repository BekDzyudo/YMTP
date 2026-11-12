import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  LANGUAGES,
  getLanguageInfo,
  isSupportedLang,
  readSavedLang,
  setCurrentLang,
  translate,
  txFor,
  txDataFor,
} from "./i18n";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const initial = readSavedLang();
    setCurrentLang(initial);
    return initial;
  });

  const setLang = useCallback((code) => {
    if (!isSupportedLang(code)) return;
    // Modul darajasidagi til darhol yangilanadi, shunda keyingi fetchlar yangi tilda ketadi
    setCurrentLang(code);
    setLangState(code);
  }, []);

  const value = useMemo(() => {
    const info = getLanguageInfo(lang);
    return {
      lang,
      setLang,
      // "O'z" / "O'zbekcha" o'zbek tilida yangi alifboda ko'rsatiladi
      languages: LANGUAGES.map((l) => ({ ...l, label: txFor(lang, l.label), name: txFor(lang, l.name) })),
      locale: info.locale,
      ogLocale: info.ogLocale,
      t: (key, vars) => translate(lang, key, vars),
      // Qattiq yozilgan o'zbekcha matn/ma'lumot: faqat til "uz" bo'lsa yangi alifboga o'tadi
      tx: (str) => txFor(lang, str),
      txData: (data) => txDataFor(lang, data),
    };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation LanguageProvider ichida ishlatilishi kerak");
  return ctx;
}
