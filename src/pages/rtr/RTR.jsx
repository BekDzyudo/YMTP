import { useContext, useEffect, useState } from "react";
import {
  FaChalkboardTeacher,
  FaGraduationCap,
  FaStar,
  FaVideo,
} from "react-icons/fa";
import { GrFormNextLink } from "react-icons/gr";
import { FcOk } from "react-icons/fc";
import { Link } from "react-router-dom";
import { MdReportGmailerrorred } from "react-icons/md";
import Pagination from "../../components/Pagination";
import RTRHero from "./RTRHero";

function RTR() {

    const [activeFilter, setActiveFilter] = useState(1);
    const [data, setData] = useState(null);
    const [search, setSearch] = useState("");
    
  
    const filterCards = [
      {
          id: 1,
        icon: FaChalkboardTeacher,
        title: "Boshlang‘ich kasbiy ta’lim",
      },
      {
          id: 2,
        icon: FaGraduationCap,
        title: "O'rta kasbiy ta'lim",
      },
      {
          id: 3,
        icon: FaStar,
        title: "O‘rta maxsus kasbiy ta’lim",
      },
      {
          id: 4,
        icon: FaVideo,
        title: "Media materiallar",
      },
    ];  
  
     const fetchData = async (page = 1) => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL_RTR}/v1/rtr_base_app/subject-list/${activeFilter}/level/?page=${page}&search=${search}`);
      const json = await res.json();    
      setData(json);
    };
  
    useEffect(() => {
      fetchData(1);
    }, [search, activeFilter]);

  return (
    <>
    <RTRHero/>
      <section className="relative flex flex-col items-center -mt-10 z-20 ">
        <div className="w-full mx-5 xl:max-w-7xl 2xl:max-w-10/12 flex flex-col sm:flex-row gap-10 px-4 shadow-xl rounded-2xl bg-base-100 py-10">
          {filterCards.map((card) => {
            const isActive = card.id === activeFilter;
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={
                  `cursor-pointer flex-1 rounded-full flex gap-2 items-center py-2 px-4 w-1/3 mx-auto relative transition-all duration-200 ` +
                  (isActive
                    ? "bg-info text-white shadow-lg border-info"
                    : "bg-slate-100 text-gray-800 shadow-sm border border-slate-50 hover:border-gray-200")
                }
                style={{ top: 0 }}
                onClick={() => setActiveFilter(card.id)}
              >
                <Icon
                  className={
                    `rounded-full p-3 text-5xl border ` +
                    (isActive
                      ? "bg-info text-white border-white"
                      : "text-info border-info bg-white")
                  }
                />
                <div className="w-full text-lg font-bold text-center">
                  {card.title}
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full flex items-center justify-between gap-4 mt-6 px-2 xl:max-w-7xl 2xl:max-w-10/12">
          <span className="text-base font-semibold text-gray-700 bg-blue-100 px-6 py-2 rounded-full uppercase flex items-center gap-2">
            {" "}
            <FcOk className="text-xl" /> {data?.total ? `${data.total} ta fan topildi` : "fanlar topilmadi"}
          </span>
          <div className="relative w-full max-w-lg h-12">
            <input
            onChange={(e)=>setSearch(e.target.value)}
              type="text"
              placeholder="Fan nomi bo'yicha qidirish..."
              className="w-full h-full rounded-full border border-gray-200 py-2 pl-4 pr-10 focus:outline-none focus:border-blue-400 transition text-[16px] bg-white shadow-sm"
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
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-15 px-2 xl:max-w-7xl 2xl:max-w-10/12">
          {data?.results ? (
            data.results.map((item) => (
              <div
                key={item.id}
                className="bg-slate-100 rounded-2xl shadow-md group border-2 border-gray-100 flex flex-col hover:shadow-xl transition-all duration-500 hover:border-blue-500"
              >
                <div className="overflow-hidden w-full h-54 rounded-t-2xl transition-all duration-500 group-hover:shadow-lg">
                  <img
                    src={item.photo}
                    alt={`Card image for ${item.title}`}
                    className="w-full h-full object-cover rounded-t-2xl transition-all duration-500 group-hover:scale-110"
                    style={{
                      borderTopLeftRadius: "1rem",
                      borderTopRightRadius: "1rem",
                    }}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600">
                    {item.title}
                  </div>
                  <div className="text-gray-600 text-sm mb-4 flex-1">
                    {item.code}
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
                      {item.view_count} ko'rishlar
                    </span>
                    <Link
                      to="#"
                      className="text-blue-600 font-bold text-sm flex items-center gap-1 uppercase group"
                    >
                      Batafsil
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                        <GrFormNextLink className="text-lg font-bold" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-info text-sm sm:text-2xl font-bold text-center w-full opacity-90 absolute left-0 top-40 sm:top-70 flex justify-center">
              <div className="flex items-center gap-3">
                <MdReportGmailerrorred className="text-2xl sm:text-5xl" />
                <p>Hech narsa topilmadi</p>
              </div>
            </div>
          )}
        </div>
        {data?.total > 0 && <Pagination current_page={data?.current_page} total_pages={data?.total_pages} onPageChange={fetchData}/>}
      </section>
    </>
  );
}

export default RTR;
