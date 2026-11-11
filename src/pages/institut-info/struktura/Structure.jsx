import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import useGetFetch from "../../../hooks/useGetFetch";
import SEO from "../../../components/SEO";
import "./structure.css";
import { useTranslation } from "../../../i18n/LanguageContext";

function Structure() {
  const { t } = useTranslation();
  const { data } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/shared_app/tuzilma/`,
  );
  
  const navigate = useNavigate();
  
  // Navigate funksiyasi - xodim_soni ga qarab yo'naltirish
  const handleCardClick = (item, parentId) => {
    
    if (!item) return;
    
    // Agar xodim obyekti bo'lsa (xodim_soni yo'q, lekin id mavjud - o'rinbosar kartalari)
    if (!item.xodim_soni && item.id) {
      // navigate(`/structure/employee/${parentId}`);
      navigate(`/structure/employee/${item.id}`);
      return;
    }
    
    // Agar xodim_soni 0 bo'lsa, navigate bo'lmasligi kerak
    if (item.xodim_soni === 0) return;
    
    // Agar xodim_soni >= 1 bo'lsa va id mavjud bo'lsa (bo'lim/boshqarma kartalari)
    if (item.xodim_soni >= 1 && item.id) {
      // xodim_soni === 1 va xodimlar massivi mavjud bo'lsa, to'g'ridan employee ga o'tish
      if (item.xodim_soni === 1 && item.xodimlar && item.xodimlar.length > 0) {
        navigate(`/structure/employee/${item.xodimlar[0].id}`);
        
      } 
      // Aks holda department sahifasiga o'tish (xodimlar u yerda yuklanadi)
      else {
        navigate(`/structure/department/${item.id}`);
      }
    }
  };

  return (
    <>
      <SEO 
        title={t("institutLinks.structure")}
        description={t("inst.structure.seoDesc")}
        keywords="tuzilma, struktura, boshqarmalar, bo'limlar, xodimlar, orgstruktura"
      />
      
      <section className="w-full bg-base-100 rounded-2xl border border-base-300 p-4 sm:p-6 lg:p-8 min-h-105 mb-25 sm:mb-35">
      <div className="rounded-2xl mb-8 px-6 pt-3 pb-6 bg-slate-100 border-t-8 border-blue-800">
        <div className="breadcrumbs hidden md:block text-base mb-5">
          <ul>
            <li>
              <Link
                to="/"
                className="text-base-content/70 hover:text-blue-700 transition-colors"
              >
                <FaHome className="w-4 h-4 mr-2" />
                {t("common.home")}
              </Link>
            </li>
            <li>
              <Link className="text-base-content/70 hover:text-blue-700 transition-colors">
                {t("nav.institute")}
              </Link>
            </li>
            <li className="text-blue-700 font-semibold">{t("institutLinks.structure")}</li>
          </ul>
        </div>
        <h1 className="text-xl text-center sm:text-start sm:text-3xl font-bold font-serif">
          {t("institutLinks.structure")}
        </h1>
      </div>

      {data && data?.results?.length > 0 ? (
        <div className="w-full flex flex-col items-center mt-15">
          {/* Direktor - Top Level */}
          <ul className="direktors flex flex-col md:flex-row md:justify-between gap-5 md:gap-10">
            <li 
              onClick={() => handleCardClick(data?.results[0]?.children[1])}
              className="cursor-pointer hidden md:flex flex-col w-full md:w-1/3 direktor-1 border border-gray-300 rounded-lg p-4 text-center shadow  items-center gap-2 border-t-8 border-t-blue-200"
            >
               <span className="bg-gray-200 font-bold px-3 py-1 rounded-lg text-lg">
                {data?.results[0]?.children[1].xodim_soni || "0"}
              </span>
              <h3 className="text-base font-semibold">
                {data?.results[0]?.children[1].nomi}
              </h3>
            </li>
            <li 
              onClick={() => handleCardClick(data?.results[0]?.xodimlar[0], data?.results[0]?.id)}
              className="cursor-pointer w-full md:w-1/3 z-10 border border-gray-300 rounded-lg p-4 text-center shadow flex flex-col items-center bg-gradient-to-br from-[#194882] to-info relative pt-12"
            >
              <img
                src={data?.results[0]?.xodimlar[0]?.rasm || "/president.jpg"}
                alt="image"
                className="rounded-full w-20 h-20 object-cover absolute top-[-40px] left-1/2 transform -translate-x-1/2 border-2 border-white"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-white">
                  {data?.results[0]?.xodimlar[0]?.FISH ||
                    t("inst.structure.noDirectorName")}
                </h3>
                <h1 className="font-bold text-base text-gray-300">
                  {data?.results[0]?.nomi || t("inst.structure.noDirectorPos")}
                </h1>
              </div>
            </li>
            <li 
              onClick={() => handleCardClick(data?.results[0]?.children[1])}
              className="cursor-pointer md:hidden flex flex-col w-full md:w-1/3 direktor-1 border border-gray-300 rounded-lg p-4 text-center shadow  items-center gap-2 border-t-8 border-t-blue-200"
            >
              <span className="bg-gray-200 font-bold px-3 py-1 rounded-lg text-lg">
                {data?.results[0]?.children[1].xodim_soni || "0"}
              </span>
              <h3 className="text-base font-semibold">
                {data?.results[0]?.children[1].nomi}
              </h3>
            </li>
            <li 
              onClick={() => handleCardClick(data?.results[0]?.children[3])}
              className="cursor-pointer w-full md:w-1/3 direktor-2 border border-gray-300 rounded-lg p-4 text-center shadow flex flex-col items-center gap-2 border-t-8 border-t-blue-200"
            >
              <span className="bg-gray-200 font-bold px-3 py-1 rounded-lg text-lg">
                {data?.results[0]?.children[3].xodim_soni || "0"}
              </span>
              <h3 className="text-base font-semibold">
                {data?.results[0]?.children[3].nomi}
              </h3>
            </li>
          </ul>

          {/* O'rinbosarlar */}
          <ul className="orinbosar-wrapper flex flex-col md:flex-row md:justify-between gap-5 md:gap-10 mt-20 w-full">
            <li className="w-full md:w-1/3">
              <div
                onClick={() =>
                  handleCardClick(data?.results[1]?.xodimlar[0], data?.results[1]?.id)
                }
                className="cursor-pointer orinbosar-card border border-gray-300 rounded-lg p-4 text-center shadow flex flex-col items-center gap-2"
              >
                <img
                  src={data?.results[1]?.xodimlar[0]?.rasm || "/person.jpg"}
                  alt="image"
                  className="rounded-full w-18 h-18 object-cover absolute top-[-30px] left-1/2 transform -translate-x-1/2 border-2 border-[#194882]"
                />
                <div className="flex flex-col gap-1 mt-10">
                  <h3 className="text-lg font-bold text-black">
                    {data?.results[1]?.xodimlar[0]?.FISH ||
                      t("inst.structure.noDeputyName")}
                  </h3>
                  <h4 className="font-bold text-sm text-black/60">
                    {data?.results[1]?.nomi || t("inst.structure.noDeputyPos")}
                  </h4>
                </div>
              </div>
              {data?.results[1]?.children?.length > 0 && (
                <ul className="boshqarma-wrapper mx-2 md:ml-5 flex flex-col gap-5 mt-5 md:mt-10">
                  {data?.results[1]?.children?.map((child, index) => (
                    <li key={child.id} className="w-full">
                      <div
                        onClick={() => handleCardClick(child)}
                        className="boshqarma-card cursor-pointer border border-gray-300 rounded-lg p-4 text-center shadow flex flex-col items-center gap-2 border-t-8 border-t-blue-700"
                      >
                        <span className="bg-gray-200 font-bold px-3 py-1 rounded-lg text-lg">
                          {child.xodim_soni || "0"}
                        </span>
                        <h3 className="text-base font-semibold">
                          {child.nomi ||
                            `${index + 1} - ${t("inst.structure.noDivision")}`}
                        </h3>
                      </div>
                      {child.children?.length > 0 && (
                        <ul className="bolim-wrapper mx-3 flex flex-col gap-5 mt-5">
                          {child.children.map((subChild, subIndex) => (
                            <li key={subChild.id} className="w-full">
                              <div
                                onClick={() =>
                                  handleCardClick(subChild)
                                }
                                className="cursor-pointer border border-gray-300 rounded-lg p-4 text-center shadow flex flex-col items-center gap-2 border-t-8 border-t-blue-400"
                              >
                                <span className="bg-gray-200 font-bold px-3 py-1 rounded-lg text-lg">
                                  {subChild.xodim_soni || "0"}
                                </span>
                                <h3 className="text-base font-semibold">
                                  {subChild.nomi ||
                                    ` ${subIndex + 1} - ${t("inst.structure.noDepartment")}`}
                                </h3>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className="w-full md:w-1/3 mt-10 md:mt-0">
              <div
                onClick={() =>
                  handleCardClick(data?.results[2]?.xodimlar[0], data?.results[2]?.id)
                }
                className="cursor-pointer orinbosar-card border border-gray-300 rounded-lg p-4 text-center shadow flex flex-col items-center gap-2"
              >
                <img
                  src={data?.results[2]?.xodimlar[0]?.rasm || "/person.jpg"}
                  alt="image"
                  className="rounded-full w-18 h-18 object-cover absolute top-[-30px] left-1/2 transform -translate-x-1/2 border-2 border-[#194882]"
                />
                <div className="flex flex-col gap-1 mt-10">
                  <h3 className="text-lg font-bold text-black">
                    {data?.results[2]?.xodimlar[0]?.FISH ||
                      t("inst.structure.noDeputyName")}
                  </h3>
                  <h4 className="font-bold text-sm text-black/60">
                    {data?.results[2]?.nomi || t("inst.structure.noDeputyPos")}
                  </h4>
                </div>
              </div>
              {data?.results[2]?.children?.length > 0 && (
                <ul className="boshqarma-wrapper mx-2 md:ml-5 flex flex-col gap-5 mt-5 md:mt-10">
                  {data?.results[2]?.children?.map((child, index) => (
                    <li key={child.id} className="w-full">
                      <div
                        onClick={() =>
                          handleCardClick(child)
                        }
                        className="boshqarma-card cursor-pointer border border-gray-300 rounded-lg p-4 text-center shadow flex flex-col items-center gap-2 border-t-8 border-t-blue-700"
                      >
                        <span className="bg-gray-200 font-bold px-3 py-1 rounded-lg text-lg">
                          {child.xodim_soni || "0"}
                        </span>
                        <h3 className="text-base font-semibold">
                          {child.nomi ||
                            `${index + 1} - ${t("inst.structure.noDivision")}`}
                        </h3>
                      </div>
                      {child.children?.length > 0 && (
                        <ul className="bolim-wrapper mx-3 flex flex-col gap-5 mt-5">
                          {child.children.map((subChild, subIndex) => (
                            <li key={subChild.id} className="w-full">
                              <div
                                onClick={() =>
                                  handleCardClick(subChild)
                                }
                                className="cursor-pointer border border-gray-300 rounded-lg p-4 text-center shadow flex flex-col items-center gap-2 border-t-8 border-t-blue-400"
                              >
                                <span className="bg-gray-200 font-bold px-3 py-1 rounded-lg text-lg">
                                  {subChild.xodim_soni || "0"}
                                </span>
                                <h3 className="text-base font-semibold">
                                  {subChild.nomi ||
                                    ` ${subIndex + 1} - ${t("inst.structure.noDepartment")}`}
                                </h3>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
             <li className="w-full md:w-1/3 mt-10 md:mt-0">
              <div
                onClick={() =>
                  handleCardClick(data?.results[3]?.xodimlar[0], data?.results[3]?.id)
                }
                className="cursor-pointer orinbosar-card border border-gray-300 rounded-lg p-4 text-center shadow flex flex-col items-center gap-2"
              >
                <img
                  src={data?.results[3]?.xodimlar[0]?.rasm || "/person.jpg"}
                  alt="image"
                  className="rounded-full w-18 h-18 object-cover absolute top-[-30px] left-1/2 transform -translate-x-1/2 border-2 border-[#194882]"
                />
                <div className="flex flex-col gap-1 mt-10">
                  <h3 className="text-lg font-bold text-black">
                    {data?.results[3]?.xodimlar[0]?.FISH ||
                      t("inst.structure.noDeputyName")}
                  </h3>
                  <h4 className="font-bold text-sm text-black/60">
                    {data?.results[3]?.nomi || t("inst.structure.noDeputyPos")}
                  </h4>
                </div>
              </div>
              {data?.results[3]?.children?.length > 0 && (
                <ul className="boshqarma-wrapper mx-2 md:ml-5 flex flex-col gap-5 mt-5 md:mt-10">
                  {data?.results[3]?.children?.map((child, index) => (
                    <li key={child.id} className="w-full">
                      <div
                        onClick={() =>
                          handleCardClick(child)
                        }
                        className="boshqarma-card cursor-pointer border border-gray-300 rounded-lg p-4 text-center shadow flex flex-col items-center gap-2 border-t-8 border-t-blue-700"
                      >
                        <span className="bg-gray-200 font-bold px-3 py-1 rounded-lg text-lg">
                          {child.xodim_soni || "0"}
                        </span>
                        <h3 className="text-base font-semibold">
                          {child.nomi ||
                            `${index + 1} - ${t("inst.structure.noDivision")}`}
                        </h3>
                      </div>
                      {child.children?.length > 0 && (
                        <ul className="bolim-wrapper mx-3 flex flex-col gap-5 mt-5">
                          {child.children.map((subChild, subIndex) => (
                            <li key={subChild.id} className="w-full">
                              <div
                                onClick={() =>
                                  handleCardClick(subChild)
                                }
                                className="cursor-pointer border border-gray-300 rounded-lg p-4 text-center shadow flex flex-col items-center gap-2 border-t-8 border-t-blue-400"
                              >
                                <span className="bg-gray-200 font-bold px-3 py-1 rounded-lg text-lg">
                                  {subChild.xodim_soni || "0"}
                                </span>
                                <h3 className="text-base font-semibold">
                                  {subChild.nomi ||
                                    ` ${subIndex + 1} - ${t("inst.structure.noDepartment")}`}
                                </h3>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-base-content/70 text-sm sm:text-base">
            {t("inst.structure.loadingOrEmpty")}
          </p>
        </div>
      )}
    </section>
    </>
  );
}

export default Structure;
