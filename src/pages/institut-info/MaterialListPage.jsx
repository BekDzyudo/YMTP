import { Link } from "react-router-dom";
import { FaHome, FaFileAlt, FaFilePdf, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import useGetFetch from "../../hooks/useGetFetch";
import SEO from "../../components/SEO";
import { useTranslation } from "../../i18n/LanguageContext";

/**
 * institut_app.Material ro'yxatini (fayl/havolalar) ko'rsatadi.
 * Masalan: Karyera rivojlantirish, Doktorantlar, Ilmiy qarorlar, Dars jadvali.
 */
function MaterialListPage({ bolim, titleKey, seoDescKey, showImage = false }) {
  const { t } = useTranslation();
  const { data, isPending, error } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/institut/materiallar/?bolim=${bolim}`,
  );
  const items = data || [];

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

        <div className="grid gap-4">
          {isPending && (
            <div className="text-center py-12">
              <span className="loading loading-spinner loading-lg text-blue-600"></span>
              <p className="text-lg opacity-70 mt-4">{t("common.loading")}</p>
            </div>
          )}

          {!isPending && error && (
            <div className="alert alert-error">
              <span>{t("inst.loadError")}</span>
            </div>
          )}

          {!isPending && !error && items.length === 0 && (
            <div className="text-center py-12">
              <FaFileAlt className="mx-auto text-6xl opacity-30 mb-4" />
              <p className="text-lg opacity-70">{t("inst.noContent")}</p>
            </div>
          )}

          {!isPending &&
            !error &&
            items.map((item) => {
              const href = item.fayl || item.havola;
              const external = !item.fayl && item.havola;
              return (
                <div
                  key={item.id}
                  className="p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-base-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 flex items-start gap-3">
                      {showImage && item.rasm ? (
                        <img
                          src={item.rasm}
                          alt={item.sarlavha}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                      ) : (
                        <FaFilePdf className="text-red-500 text-2xl mt-1 shrink-0" />
                      )}
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-1">{item.sarlavha}</h3>
                        {item.tavsif && (
                          <p className="text-sm opacity-70 mb-1">{item.tavsif}</p>
                        )}
                        {item.yil && (
                          <span className="badge badge-sm badge-secondary text-white">{item.yil}</span>
                        )}
                      </div>
                    </div>
                    {href && (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn bg-gradient-to-br from-[#194882] to-info text-white btn-sm sm:btn-md rounded-lg shrink-0"
                      >
                        {external ? <FaExternalLinkAlt /> : <FaDownload />}
                        {t("common.download")}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
}

export default MaterialListPage;
