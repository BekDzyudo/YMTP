import { Link } from "react-router-dom";
import { FaHome, FaFileDownload } from "react-icons/fa";
import DOMPurify from "dompurify";
import useGetFetch from "../../hooks/useGetFetch";
import SEO from "../../components/SEO";
import { useTranslation } from "../../i18n/LanguageContext";

/**
 * Backenddagi institut_app.Sahifa modelidan bitta matnli sahifani ko'rsatadi.
 * (Masalan: Hududiy fakultetlar, Raqamlashtirish laboratoriyasi)
 */
function SahifaPage({ slug, titleKey, seoDescKey, icon }) {
  const { t } = useTranslation();
  const Icon = icon || FaFileDownload;
  const { data, isPending, error } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/institut/sahifalar/${slug}/`,
  );

  return (
    <>
      <SEO title={t(titleKey)} description={seoDescKey ? t(seoDescKey) : undefined} />

      <section className="w-full bg-base-100 rounded-xl sm:rounded-2xl border border-base-300 p-3 sm:p-4 md:p-6 lg:p-8 min-h-105 mb-25 sm:mb-35">
        <div className="rounded-xl sm:rounded-2xl mb-6 sm:mb-8 px-4 sm:px-6 pt-2 sm:pt-3 pb-4 sm:pb-6 bg-slate-100 border-t-4 sm:border-t-8 border-blue-800">
          <div className="breadcrumbs hidden md:block text-sm sm:text-base mb-4 sm:mb-5">
            <ul>
              <li>
                <Link to="/" className="text-base-content/70 hover:text-blue-700 transition-colors">
                  <FaHome className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  {t("common.home")}
                </Link>
              </li>
              <li>
                <Link className="text-base-content/70 hover:text-blue-700 transition-colors">
                  {t("nav.institute")}
                </Link>
              </li>
              <li className="text-blue-700 font-semibold">{t(titleKey)}</li>
            </ul>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif">{t(titleKey)}</h1>
        </div>

        {isPending ? (
          <div className="flex justify-center items-center py-8 sm:py-10 md:py-12">
            <div className="loading loading-spinner loading-lg text-blue-600"></div>
          </div>
        ) : error ? (
          <div className="alert alert-error">
            <span>{t("inst.loadError")}</span>
          </div>
        ) : data?.matn ? (
          <>
            <div
              className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-base-content/90 text-justify prose-headings:text-blue-700 prose-p:leading-relaxed prose-ul:list-disc prose-ol:list-decimal"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.matn) }}
            />
            {data.rasm && (
              <img src={data.rasm} alt={data.sarlavha} className="rounded-xl mt-6 max-w-full" />
            )}
            {data.fayl && (
              <a
                href={data.fayl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-gradient-to-br from-[#194882] to-info text-white rounded-lg mt-6"
              >
                <Icon /> {t("common.download")}
              </a>
            )}
          </>
        ) : (
          <p className="text-base-content/70 text-sm sm:text-base">{t("inst.noContent")}</p>
        )}
      </section>
    </>
  );
}

export default SahifaPage;
