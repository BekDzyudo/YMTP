import React from "react";
import { Link } from "react-router-dom";
import useGetFetch from "../../hooks/useGetFetch";
import { FaHome } from "react-icons/fa";
import InfographicContent from "../../components/InfographicContent";
import SEO from "../../components/SEO";
import { useTranslation } from "../../i18n/LanguageContext";

function About() {
  const { t } = useTranslation();
  const { data, isPending, error } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/shared_app/institut/`,
  );
  // Institutning maqsadi va faoliyat yo'nalishlari (eski ipitvet.uz saytidan)
  const { data: vazifalar } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/institut/sahifalar/vazifalar/`,
  );

  return (
    <>
      <SEO 
        title={t("institutLinks.about")}
        description={t("inst.about.seoDesc")}
        keywords="institut haqida, ymtp, kasb-hunar markazi, tarixi, faoliyat, maqsad, vazifalar"
      />
      
      <section className="w-full bg-base-100 rounded-xl sm:rounded-2xl border border-base-300 p-3 sm:p-4 md:p-6 lg:p-8 min-h-105 mb-25 sm:mb-35">
      <div className="rounded-xl sm:rounded-2xl mb-6 sm:mb-8 px-4 sm:px-6 pt-2 sm:pt-3 pb-4 sm:pb-6 bg-slate-100 border-t-4 sm:border-t-8 border-blue-800">
        <div className="breadcrumbs hidden md:block text-sm sm:text-base mb-4 sm:mb-5">
          <ul>
            <li>
              <Link
                to="/"
                className="text-base-content/70 hover:text-blue-700 transition-colors"
              >
                <FaHome className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                {t("common.home")}
              </Link>
            </li>
            <li>
              <Link className="text-base-content/70 hover:text-blue-700 transition-colors">
                {t("nav.institute")}
              </Link>
            </li>
            <li className="text-blue-700 font-semibold">{t("institutLinks.about")}</li>
          </ul>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif">
          {t("institutLinks.about")}
        </h1>
      </div>

      {isPending ? (
        <div className="flex justify-center items-center py-8 sm:py-10 md:py-12">
          <div className="loading loading-spinner loading-lg text-blue-600"></div>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <span>{t("inst.loadError")}</span>
        </div>
      ) : data?.length ? (
        // Barcha tavsif bloklari bitta infografikaga aylantiriladi
        <InfographicContent html={data.map((item) => item.description || "").join("")} />
      ) : (
        <p className="text-base-content/70 text-sm sm:text-base">
          {t("inst.noContent")}
        </p>
      )}

      {vazifalar?.matn && (
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-base-300">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-serif mb-4 text-blue-700">
            {vazifalar.sarlavha || t("inst.about.vazifalarTitle")}
          </h2>
          <InfographicContent html={vazifalar.matn} showStats={false} />
        </div>
      )}
    </section>
    </>
  );
}

export default About;
