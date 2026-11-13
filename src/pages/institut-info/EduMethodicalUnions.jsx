import { Link } from "react-router-dom";
import { FaHome, FaLayerGroup } from "react-icons/fa";
import DOMPurify from "dompurify";
import useGetFetch from "../../hooks/useGetFetch";
import SEO from "../../components/SEO";
import { useTranslation } from "../../i18n/LanguageContext";

function EduMethodicalUnions() {
  const { t } = useTranslation();
  const { data, isPending, error } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/institut/birlashmalar/`,
  );
  const items = data || [];

  return (
    <>
      <SEO title={t("institutLinks.omb")} description={t("inst.omb.seoDesc")} />

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
              <li className="text-blue-700 font-semibold">{t("institutLinks.omb")}</li>
            </ul>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif">
            {t("institutLinks.omb")}
          </h1>
          <p className="text-sm sm:text-base opacity-70 mt-3">{t("inst.omb.intro")}</p>
        </div>

        {isPending ? (
          <div className="flex justify-center items-center py-8 sm:py-10 md:py-12">
            <div className="loading loading-spinner loading-lg text-blue-600"></div>
          </div>
        ) : error ? (
          <div className="alert alert-error">
            <span>{t("inst.loadError")}</span>
          </div>
        ) : items.length === 0 ? (
          <p className="text-base-content/70 text-sm sm:text-base">{t("inst.noContent")}</p>
        ) : (
          <ol className="grid sm:grid-cols-2 gap-3">
            {items.map((item, i) => (
              <li
                key={item.id}
                className="flex items-start gap-3 p-4 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
              >
                <span className="shrink-0 w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-semibold text-sm">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-sm sm:text-base">{item.nomi}</p>
                  {item.rais && (
                    <p className="text-xs sm:text-sm opacity-60 mt-1">
                      {t("inst.omb.rais")}: {item.rais}
                    </p>
                  )}
                  {item.tavsif && (
                    <div
                      className="text-sm opacity-70 mt-1 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.tavsif) }}
                    />
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}

        <div className="alert bg-gradient-to-br from-[#194882] to-info text-white mt-8">
          <FaLayerGroup className="text-base md:text-4xl" />
          <div>
            <h4 className="font-semibold">{t("inst.note")}</h4>
            <p className="text-sm">{t("inst.omb.noteText")}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default EduMethodicalUnions;
