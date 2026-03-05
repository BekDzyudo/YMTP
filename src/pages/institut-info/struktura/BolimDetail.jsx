import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaHome, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useGetFetch from "../../../hooks/useGetFetch";

function BolimDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/shared_app/tuzilma/${id}/xodimlar/`
  );

  const handleXodimClick = (xodimId) => {
    navigate(`/structure/employee/${xodimId}`);
  };

  return (
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
                Bosh sahifa
              </Link>
            </li>
            <li>
              <Link
                to="/structure"
                className="text-base-content/70 hover:text-blue-700 transition-colors"
              >
                Institut tuzilmasi
              </Link>
            </li>
          </ul>
        </div>
        <h1 className="text-xl text-center sm:text-start sm:text-3xl font-bold font-serif">
          {data?.bolim_nomi || "Bo'lim nomi"}
        </h1>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <span className="loading loading-spinner loading-lg text-blue-700"></span>
          <p className="text-base-content/70 mt-4">Ma'lumotlar yuklanmoqda...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Xatolik yuz berdi!</p>
        </div>
      ) : data?.results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data?.results.map((xodim) => (
            <div
              key={xodim.id}
              className="bg-white border h-54 border-gray-300 rounded-2xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden flex"
            >
              <img
                src={xodim.rasm || "/person.jpg"}
                alt={xodim.FISH}
                className="rounded-l-2xl w-1/3 object-cover"
              />
              <div className="w-2/3 bg-gradient-to-br from-[#194882] to-[#0ea5e9] p-6 flex flex-col justify-between relative overflow-hidden">
                <img 
                  src="/humo.png" 
                  alt="logo" 
                  className="absolute right-0 top-0 w-1/3 h-full object-contain opacity-10 pointer-events-none"
                />
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {xodim.FISH}
                  </h3>
                  {xodim.lavozimi && (
                    <p className="text-sm text-white/90">
                      {xodim.lavozimi}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-start gap-2 relative z-10">
                  <div>
                    {xodim.pochta && (
                      <a
                        href={`mailto:${xodim.pochta}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm text-white hover:underline flex items-center gap-2"
                      >
                        {xodim.pochta}
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => handleXodimClick(xodim.id)}
                    className="text-white text-sm font-semibold transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                  >
                    Batafsil
                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-base-content/70 text-sm sm:text-base">
            Bu bo'limda hozircha xodimlar yo'q.
          </p>
        </div>
      )}
    </section>
  );
}

export default BolimDetail;
