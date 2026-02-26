import { useContext, useEffect, useState } from "react";
import {
  FaBook,
  FaBookOpen,
  FaCalendar,
  FaDownload,
  FaFileAlt,
  FaFolderOpen,
  FaTools,
} from "react-icons/fa";
import { GrFormNextLink } from "react-icons/gr";
import { FcOk } from "react-icons/fc";
import { Link } from "react-router-dom";
import { MdReportGmailerrorred } from "react-icons/md";
import Pagination from "../../components/Pagination";
import useGetFetch from "../../hooks/useGetFetch";
import MetodikTaminotHero from "./MetodikTaminotHero";

function MetodikTaminot() {
  const [activeFilter, setActiveFilter] = useState(() => {
    const saved = sessionStorage.getItem("metodik_filter");
    return saved ? parseInt(saved) : 1;
  });
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [yearId, setYearId] = useState("");
  const [bilimSoxasiId, setBilimSoxasiId] = useState("");
  
  // Format date from YYYY-MM-DD to DD.MM.YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };
  

  const filterCards = [
    {
      id: 1,
      icon: FaFileAlt,
      title: "O‘quv me'yoriy hujjatlar",
    },
    {
      id: 2,
      icon: FaBook,
      title: "O‘quv adabiyotlar",
    },
    {
      id: 3,
      icon: FaFolderOpen,
      title: "O‘qitish materiallari to‘plami",
    },
    {
      id: 4,
      icon: FaTools,
      title: "Metodik mahsulotlar",
    },
  ];

  // Dinamik URL yaratish
  const bilimSoxasiUrl =
    activeFilter === 1
      ? `${import.meta.env.VITE_BASE_URL_EDU}/bilim-soxasi/?year=${yearId}`
      : activeFilter === 2
        ? `${import.meta.env.VITE_BASE_URL_EDU}/uquv-mat-type/`
        : activeFilter === 3
          ? `${import.meta.env.VITE_BASE_URL_EDU}/talim-soxasi/?year=${yearId}`
          : activeFilter === 4
            ? `${import.meta.env.VITE_BASE_URL_EDU}/qisqa-kurs-tur/`
            : ``;

  const { data: bilimSoxasi } = useGetFetch(bilimSoxasiUrl);    
  const { data: years } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL_EDU}/education-years/`,
  );
  // omt
    const { data: yearsOMT } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL_EDU}/talim-soxa-years/`,
  );
  

  const fetchData = async (page = 1) => {
    let url = "";
    if (activeFilter === 1) {
      url = `${import.meta.env.VITE_BASE_URL_EDU}/kasb/?page=${page}&search=${search}&year=${yearId}&bilim_soxasi=${bilimSoxasiId}`;
    } else if (activeFilter === 2) {
      url = `${import.meta.env.VITE_BASE_URL_EDU}/uquv-qullanma/?page=${page}&search=${search}&u_type=${bilimSoxasiId}`;
    } else if (activeFilter === 3) {
      url = `${import.meta.env.VITE_BASE_URL_EDU}/uquv-material/?page=${page}&search=${search}&year=${yearId}&soxa=${bilimSoxasiId}`;
    } else if (activeFilter === 4) {
      url = `${import.meta.env.VITE_BASE_URL_EDU}/qisqa-kurs/?page=${page}&search=${search}&kurs_tur_id=${bilimSoxasiId}`;
    }
    const res = await fetch(url);
    const json = await res.json();
    setData(json);
  };  

  useEffect(() => {
    fetchData(1);
  }, [search, activeFilter, yearId, bilimSoxasiId]);

  useEffect(() => {
    sessionStorage.setItem("metodik_filter", activeFilter.toString());
  }, [activeFilter]);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  // Item ID ning birinchi belgisiga qarab ta'lim turini aniqlash
  const getEducationLevel = (itemId) => {
    const firstChar = String(itemId).charAt(0);
    switch (firstChar) {
      case "3":
        return {
          text: "Boshlang'ich kasbiy ta'lim",
          color: "from-emerald-400 to-teal-500",
        };
      case "4":
        return {
          text: "O'rta kasbiy ta'lim",
          color: "from-purple-600 to-fuchsia-700",
        };
      case "5":
        return {
          text: "O'rta maxsus kasbiy ta'lim",
          color: "from-blue-400 to-indigo-500",
        };
      default:
        return { text: "Kasbiy ta'lim", color: "from-gray-400 to-gray-500" };
    }
  };

  return (
    <>
      <MetodikTaminotHero />
      <section className="relative flex flex-col items-center -mt-10 z-20 mb-10 sm:mb-20">
        <div className="w-full mx-5 xl:max-w-7xl 2xl:max-w-10/12 grid sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-5 xl:gap-10 px-2 sm:px-4 shadow-xl rounded-2xl bg-base-100 py-2 sm:py-4 lg:py-10">
          {filterCards.map((card) => {
            const isActive = card.id === activeFilter;
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={
                  `cursor-pointer rounded-full flex gap-2 items-center py-1 sm:py-2 px-2 sm:px-4 transition-all duration-200 ` +
                  (isActive
                    ? "bg-info text-white shadow-lg border-info"
                    : "bg-slate-100 text-gray-800 shadow-sm border border-slate-50 hover:border-gray-200")
                }
                style={{ top: 0 }}
                onClick={() => handleFilterChange(card.id)}
              >
                <Icon
                  className={
                    `md:w-14 md:h-12 sm:w-12 sm:h-10 w-10 h-8 rounded-full md:p-3 p-2 border flex items-center justify-center ` +
                    (isActive
                      ? "bg-info text-white border-white"
                      : "text-info border-info bg-white")
                  }
                />
                <div className="w-full text-sm sm:text-[16px] md:text-lg font-bold text-center">
                  {card.title}
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full flex lg:flex-row flex-col items-center justify-between gap-4 mt-6 px-2 xl:max-w-7xl 2xl:max-w-10/12">
          <div className="flex items-center gap-5">
            <style>{`
              .ok-glow {
                position: relative;
                z-index: 1;
                animation: ok-glow-anim 1.8s infinite cubic-bezier(.68,-0.55,.27,1.55);
              }
              .ok-glow::before {
                content: '';
                position: absolute;
                left: 50%;
                top: 50%;
                width: 200%;
                height: 200%;
                transform: translate(-50%, -50%) scale(0.7);
                border-radius: 50%;
                background: radial-gradient(rgba(34,197,94,0.18), transparent 70%);
                opacity: 0;
                pointer-events: none;
                z-index: 0;
                animation: ok-glow-wave 1.8s infinite cubic-bezier(.68,-0.55,.27,1.55);
              }
              @keyframes ok-glow-anim {
                0%, 100% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.13);
                }
              }
              @keyframes ok-glow-wave {
                0% {
                  opacity: 0.5;
                  transform: translate(-50%, -50%) scale(0.7);
                }
                70% {
                  opacity: 0.15;
                  transform: translate(-50%, -50%) scale(1.25);
                }
                100% {
                  opacity: 0;
                  transform: translate(-50%, -50%) scale(1.4);
                }
              }
            `}</style>
            <span className="font-semibold text-gray-700 bg-blue-100 sm:px-6 px-4 py-2 rounded-full sm:uppercase flex items-center gap-2 text-xs sm:text-[16px]">
              <FcOk className="sm:text-xl text-lg ok-glow" />{" "}
              {data?.total > 0
                ? `${data?.total} ta hujjat topildi`
                : "fanlar topilmadi"}
            </span>
          </div>
          <div className="flex gap-5 sm:flex-row flex-col items-center">
            <div className="flex flex-row items-center gap-5">
              {activeFilter === 1 && (
                <div className="relative">
                  <select
                    className="select select-sm md:select-lg outline-0 rounded-full min-w-32 text-sm md:text-[16px] shadow-sm border border-gray-200"
                    onChange={(e) => setYearId(e.target.value)}
                  >
                    <option value="">Yil</option>
                    {years?.map((year) => (
                      <option key={year.id} value={year.id}>
                        {year.year}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {activeFilter === 3 && (
                <div className="relative">
                  <select
                    className="select select-sm md:select-lg outline-0 rounded-full min-w-32 text-sm md:text-[16px] shadow-sm border border-gray-200"
                    onChange={(e) => setYearId(e.target.value)}
                  >
                    <option value="">Yil</option>
                    {yearsOMT?.map((year) => (
                      <option key={year.id} value={year.id}>
                        {year.year}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="relative">
                <select
                  className="select select-sm md:select-lg outline-0 rounded-full min-w-44 text-sm md:text-[16px] shadow-sm border border-gray-200"
                  onChange={(e) => setBilimSoxasiId(e.target.value)}
                >
                  <option value="">{activeFilter === 2 ? "Modullar" : "Bilim sohasi"}</option>
                  {bilimSoxasi?.map((bilim) => (
                    <option key={bilim.id} value={bilim.id}>
                      {bilim.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="relative w-full sm:max-w-4/5 lg:w-96 h-8 md:h-12">
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Izlash..."
                className="w-full h-full rounded-full border border-gray-200 py-1 sm:py-2 pl-4 pr-10 focus:outline-none focus:border-blue-400 transition text-sm sm:text-[16px] bg-white shadow-sm"
              />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-2-2" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8 mt-10 sm:mt-15 px-2 xl:max-w-7xl 2xl:max-w-10/12">
          {data?.results?.length > 0 ? (
            data.results.map((item) => {
              if (activeFilter === 1) {
                return (
                  <Link
                    to={`${item.id}`}
                    key={item.id}
                    className="bg-slate-100 rounded-2xl shadow-md group border-2 border-gray-100 flex gap-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="p-3 sm:p-5 flex flex-col justify-between flex-1 w-2/3 gap-3">
                      <div>
                        <div className="text-sm sm:text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600">
                          {item._id + "-" + item.name}
                        </div>
                        <div className="text-gray-600 text-xs sm:text-sm mb-4 flex-1">
                          {item.definition}
                        </div>
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${getEducationLevel(item._id).color} shadow-md mb-1 sm:mb-3`}
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                          </svg>
                          <span className="text-white text-xs font-semibold">
                            {getEducationLevel(item._id).text}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          {/* Eye icon for views */}
                          <svg
                            width="18"
                            height="18"
                            fill="currentColor"
                            className="inline-block"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 4.5c-5 0-8 5-8 5s3 5 8 5 8-5 8-5-3-5-8-5Zm0 8.33A3.33 3.33 0 1 1 13.33 9.5 3.33 3.33 0 0 1 10 12.83Zm0-5.33A2 2 0 1 0 12 9.5 2 2 0 0 0 10 7.5Z" />
                          </svg>
                          {item.view} ko'rishlar
                        </span>
                        <div className="text-blue-600 font-bold text-xs sm:text-sm flex items-center gap-1 uppercase group">
                          Batafsil
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                            <GrFormNextLink className="text-lg font-bold" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-hidden w-1/3 h-full rounded-r-2xl">
                      <img
                        src={item.img}
                        alt={`Card image for ${item.name}`}
                        className="w-full h-full object-cover rounded-r-2xl"
                      />
                    </div>
                  </Link>
                );
              } else if (activeFilter === 2) {
                return (
                  <div
                    key={item.id}
                    className="bg-slate-100 rounded-2xl shadow-md group border-2 border-gray-100 flex gap-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="p-3 sm:p-5 flex flex-col justify-between flex-1 w-2/3 gap-3">
                      <div>
                        <div className="text-sm sm:text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600">
                          {item.name}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <FaCalendar className="text-sm" />
                          {formatDate(item.date)}
                        </span>
                        <Link
                          to={item.prof_stand}
                          target="_blank"
                          className="text-blue-600 font-bold text-xs sm:text-sm flex items-center gap-1 group"
                        >
                          <span className="inline-block">
                            <FaDownload className="text-md font-bold" />
                          </span>
                          Yuklab olish
                        </Link>
                      </div>
                    </div>
                    <div className="overflow-hidden w-1/3 h-full rounded-r-2xl">
                      <img
                        src={item.img}
                        alt={`Card image for ${item.name}`}
                        className="w-full h-full object-cover rounded-r-2xl"
                      />
                    </div>
                  </div>
                );
              } else if (activeFilter === 3) {
                return (
                  <div
                    key={item.id}
                    className="bg-slate-100 rounded-2xl shadow-md group border-2 border-gray-100 flex gap-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="p-3 sm:p-5 flex flex-col justify-between flex-1 w-2/3 gap-3">
                      <div>
                        <div className="text-sm sm:text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600">
                          {item.name}
                        </div>
                        <div className="mb-2">
                          <div className="text-xs sm:text-sm text-gray-700 font-medium">
                            <span className="font-semibold">Muallif:</span>{" "}
                            <p className="italic">
                              {item.guv_muall || "Noma'lum"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                          {item.guv_img && (
                            <Link
                              to={item.guv_img}
                              target="_blank"
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 hover:from-blue-400 hover:to-indigo-500 shadow-md`}
                            >
                              <span className="text-white text-xs font-semibold flex items-center gap-1">
                                Guvohnoma
                                <span className="inline-block">
                                  <GrFormNextLink className="text-lg font-bold" />
                                </span>
                              </span>
                            </Link>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                         <span className="text-xs text-gray-400 flex items-center gap-1">
                          <FaCalendar className="text-sm" />
                          {formatDate(item.date)}
                        </span>
                        <Link
                          to={item.prof_stand}
                          target="_blank"
                          className="text-blue-600 font-bold text-xs sm:text-sm flex items-center gap-1 group"
                        >
                          <span className="inline-block">
                            <FaDownload className="text-md font-bold" />
                          </span>
                          Yuklab olish
                        </Link>
                      </div>
                    </div>
                    <div className="overflow-hidden w-1/3 h-full rounded-r-2xl">
                      <img
                        src={item.img}
                        alt={`Card image for ${item.name}`}
                        className="w-full h-full object-cover rounded-r-2xl"
                      />
                    </div>
                  </div>
                );
              } else if (activeFilter === 4) {
                return (
                  <div
                    key={item.id}
                    className="bg-slate-100 rounded-2xl shadow-md group border-2 border-gray-100 flex gap-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="p-3 sm:p-5 flex flex-col justify-between flex-1 w-2/3 gap-3">
                      <div>
                        <div className="text-sm sm:text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600">
                          {item.name}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                         <span className="text-xs text-gray-400 flex items-center gap-1">
                          <FaCalendar className="text-sm" />
                          {formatDate(item.date)}
                        </span>
                        <Link
                          to={item.pdf}
                          target="_blank"
                          className="text-blue-600 font-bold text-xs sm:text-sm flex items-center gap-1 group"
                        >
                          <span className="inline-block">
                            <FaDownload className="text-md font-bold" />
                          </span>
                          Yuklab olish
                        </Link>
                      </div>
                    </div>
                    <div className="overflow-hidden w-1/3 h-full rounded-r-2xl">
                      <img
                        src={item.img}
                        alt={`Card image for ${item.name}`}
                        className="w-full h-full object-cover rounded-r-2xl"
                      />
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <div className="text-info text-sm sm:text-2xl font-bold text-center w-full opacity-90 absolute left-0 top-40 sm:top-70 flex justify-center">
              <div className="flex items-center gap-3">
                <MdReportGmailerrorred className="text-2xl sm:text-5xl" />
                <p>Hech narsa topilmadi</p>
              </div>
            </div>
          )}
        </div>
        {data?.total > 0 && (
          <Pagination
            current_page={data?.current_page}
            total_pages={data?.total_pages}
            onPageChange={fetchData}
          />
        )}
      </section>
    </>
  );
}

export default MetodikTaminot;
