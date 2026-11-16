import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useHero } from "../../context/HeroContext";
import { useTranslation } from "../../i18n/LanguageContext";

// Media resurslar sahifalari uchun umumiy qobiq (sarlavha + breadcrumb)
function MediaPageLayout({ title, subtitle, icon: Icon, stats, children }) {
  const { t } = useTranslation();
  const { setOnHero } = useHero();

  useEffect(() => {
    setOnHero(false);
    return () => setOnHero(false);
  }, [setOnHero]);

  return (
    <section className="bg-slate-100 min-h-screen w-full py-10 sm:py-20 mb-16 sm:mb-32">
      <div className="px-3.5 sm:px-5 mx-auto w-full 2xl:w-11/12">
        <div className="hidden md:block breadcrumbs text-base mb-4">
          <ul>
            <li>
              <Link to="/" className="text-base-content/70 hover:text-blue-700 transition-colors">
                <FaHome className="w-4 h-4 mr-1" />
                {t("common.home")}
              </Link>
            </li>
            <li className="text-base-content/70">{t("nav.media")}</li>
            <li className="text-blue-700 font-semibold">{title}</li>
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#002d6d] via-[#194882] to-info text-white px-5 sm:px-8 py-7 sm:py-9 mb-8 shadow-xl">
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10" />
          <div className="absolute right-24 -bottom-16 w-40 h-40 rounded-full bg-white/5" />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
            {Icon && (
              <span className="grid place-items-center w-14 h-14 rounded-2xl bg-white/15 shrink-0">
                <Icon size={26} />
              </span>
            )}
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl font-black font-serif">{title}</h1>
              {subtitle && <p className="text-white/80 mt-1.5 text-sm sm:text-base">{subtitle}</p>}
            </div>
            {stats?.length > 0 && (
              <div className="flex gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl bg-white/12 border border-white/20 px-4 py-2.5 text-center min-w-24">
                    <p className="text-2xl font-black leading-none">{s.value}</p>
                    <p className="text-[11px] uppercase tracking-wide text-white/75 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}

export default MediaPageLayout;
