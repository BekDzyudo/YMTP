import { useTranslation } from "../i18n/LanguageContext";

// Header bo'lmagan sahifalar (kirish, ro'yxatdan o'tish) uchun ixcham til tanlagich
function LanguageSwitcher({ className = "" }) {
  const { lang, setLang, languages, t } = useTranslation();

  return (
    <div
      role="group"
      aria-label={t("nav.language")}
      className={`flex items-center gap-1 rounded-full bg-white/90 shadow-md border border-gray-200 p-1 ${className}`}
    >
      {languages.map((language) => (
        <button
          key={language.code}
          type="button"
          onClick={() => setLang(language.code)}
          aria-pressed={language.code === lang}
          title={language.name}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            language.code === lang ? "bg-[#0B2B4E] text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <img
            src={`https://flagcdn.com/w20/${language.flag}.png`}
            srcSet={`https://flagcdn.com/w40/${language.flag}.png 2x`}
            alt=""
            className="w-5 h-auto rounded-sm"
          />
          {language.label}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
