import { Link } from "react-router-dom";
import { FaHome, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import DOMPurify from "dompurify";
import useGetFetch from "../../hooks/useGetFetch";
import SEO from "../../components/SEO";
import { useTranslation } from "../../i18n/LanguageContext";

function InternationalCooperation() {
  const { t } = useTranslation();
  const base = import.meta.env.VITE_BASE_URL;
  const { data: sahifa, isPending: p1 } = useGetFetch(`${base}/institut/sahifalar/xalqaro-hamkorlik/`);
  const { data: hamkorlar, isPending: p2 } = useGetFetch(`${base}/institut/xalqaro-hamkorlar/`);
  const { data: materiallar, isPending: p3 } = useGetFetch(`${base}/institut/materiallar/?bolim=xalqaro`);

  const isPending = p1 || p2 || p3;

  return (
    <>
      <SEO title={t("institutLinks.xalqaro")} description={t("inst.xalqaro.seoDesc")} />

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
              <li className="text-blue-700 font-semibold">{t("institutLinks.xalqaro")}</li>
            </ul>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif">
            {t("institutLinks.xalqaro")}
          </h1>
        </div>

        {isPending ? (
          <div className="flex justify-center items-center py-8 sm:py-10 md:py-12">
            <div className="loading loading-spinner loading-lg text-blue-600"></div>
          </div>
        ) : (
          <>
            {sahifa?.matn && (
              <div
                className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-base-content/90 text-justify prose-headings:text-blue-700 prose-p:leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sahifa.matn) }}
              />
            )}

            {/* Xalqaro hamkorlar jadvali */}
            {hamkorlar?.length > 0 && (
              <div className="mb-10">
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-blue-700">
                  {t("inst.xalqaro.hamkorlarTitle")}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {hamkorlar.map((h) => (
                    <div
                      key={h.id}
                      className="p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-base-200 flex flex-col gap-3"
                    >
                      {h.logo && (
                        <img
                          src={h.logo}
                          alt={h.nomi}
                          className="h-14 object-contain self-start"
                        />
                      )}
                      <h3 className="font-semibold text-sm sm:text-base">
                        {h.sayt ? (
                          <a href={h.sayt} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                            {h.nomi} <FaExternalLinkAlt className="inline text-xs opacity-60" />
                          </a>
                        ) : (
                          h.nomi
                        )}
                      </h3>
                      {h.davlat && <span className="badge badge-sm">{h.davlat}</span>}
                      {h.faoliyati && <p className="text-sm opacity-70">{h.faoliyati}</p>}
                      {h.memorandum && (
                        <a
                          href={h.memorandum}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm bg-gradient-to-br from-[#194882] to-info text-white rounded-lg self-start"
                        >
                          <FaDownload /> {t("inst.xalqaro.memorandum")}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loyiha materiallari (Avestos, dual ta'lim va h.k.) */}
            {materiallar?.length > 0 && (
              <div>
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-blue-700">
                  {t("inst.xalqaro.materiallarTitle")}
                </h2>
                <div className="grid gap-3">
                  {materiallar.map((m) => {
                    const href = m.fayl || m.havola;
                    return (
                      <div
                        key={m.id}
                        className="p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-base-200 flex items-center justify-between gap-4"
                      >
                        <h3 className="text-sm sm:text-base font-medium">{m.sarlavha}</h3>
                        {href && (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm bg-gradient-to-br from-[#194882] to-info text-white rounded-lg shrink-0"
                          >
                            {m.fayl ? <FaDownload /> : <FaExternalLinkAlt />}
                            {t("common.download")}
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {!sahifa?.matn && !hamkorlar?.length && !materiallar?.length && (
              <p className="text-base-content/70 text-sm sm:text-base">{t("inst.noContent")}</p>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default InternationalCooperation;
