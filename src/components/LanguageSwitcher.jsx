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
            src={`/flags/${language.flag}.svg`}
            alt=""
            className="w-5 h-3.5 object-cover rounded-sm"
          />
          {language.label}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
