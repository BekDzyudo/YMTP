import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGetFetch from "../../hooks/useGetFetch";
import { FaHome, FaChevronDown, FaChevronUp } from "react-icons/fa";
import DOMPurify from "dompurify";

function Management() {
  const { data, isPending, error } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/shared_app/rahbariyat/`
  );
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (personId, type) => {
    const key = `${personId}-${type}`;
    setOpenDropdowns(prev => {
      // Agar shu dropdown ochiq bo'lsa - yopish, aks holda faqat shuni ochish
      if (prev[key]) {
        return {};
      } else {
        return { [key]: true };
      }
    });
  };

  console.log(data);

  return (
    <section className="w-full bg-base-100 rounded-2xl border border-base-300 p-4 sm:p-6 lg:p-8 min-h-105">
      <div className="rounded-xl sm:rounded-2xl mb-5 sm:mb-8 px-6 pt-3 pb-4 sm:pb-6 bg-slate-100 border-t-4 sm:border-t-8 border-blue-800">
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
              <Link className="text-base-content/70 hover:text-blue-700 transition-colors">
                Institut
              </Link>
            </li>
            <li className="text-blue-700 font-semibold">Rahbariyat</li>
          </ul>
        </div>
        <h1 className="text-center sm:text-start text-xl sm:text-3xl font-bold font-serif">Rahbariyat</h1>
      </div>

      {isPending ? (
        <div className="flex justify-center items-center py-12">
          <div className="loading loading-spinner loading-lg text-blue-600"></div>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <span>Ma'lumotlarni yuklashda xatolik yuz berdi</span>
        </div>
      ) : data?.length > 0 ? (
        <div className="space-y-6">
          {data.map((person) => (
            <div
              key={person.id}
              className="bg-white rounded-xl sm:rounded-2xl border border-base-300 shadow-sm md:shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Header with Image and Main Info */}
              <div className="flex flex-col sm:flex-row sm:gap-6 gap-3 p-3 sm:p-6">
                {/* Image */}
                <div className="shrink-0">
                  <img
                    src={person.image || '/default-avatar.png'}
                    alt={person.fullname}
                    className="sm:w-64 sm:h-80 w-full h-80 rounded-xl object-cover shadow-lg border-2 border-blue-600"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 space-y-3">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 font-serif">
                    {person.FISH}
                  </h2>
                  <p className="text-sm md:text-lg text-gray-600 font-semibold">
                    {person.lavozim}
                  </p>
                  
                  <div className="flex flex-col gap-4 pt-2">
                    {person.nomeri && (
                      <a
                        href={`tel:${person.nomeri}`}
                        className="flex items-center gap-2 text-black transition-colors bg-slate-300 rounded-lg px-3 py-2 w-max"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span className="text-sm md:text-base">{person.nomeri}</span>
                      </a>
                    )}
                    
                    {person.pochtasi && (
                      <a
                        href={`mailto:${person.pochtasi}`}
                        className="flex items-center gap-2 text-black transition-colors bg-slate-300 rounded-lg px-3 py-2 w-max"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm md:text-base">{person.pochtasi}</span>
                      </a>
                    )}

                    {/* Buttons for Dropdown */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      {person.vazifasi && (
                        <button
                          onClick={() => toggleDropdown(person.id, 'vazifa')}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-md text-sm md:text-base font-medium cursor-pointer"
                        >
                          Vazifalari
                          {openDropdowns[`${person.id}-vazifa`] ? (
                            <FaChevronUp className="w-3 h-3" />
                          ) : (
                            <FaChevronDown className="w-3 h-3" />
                          )}
                        </button>
                      )}

                      {person.mehnat_faoliyati && (
                        <button
                          onClick={() => toggleDropdown(person.id, 'faoliyat')}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-md text-sm md:text-base font-medium cursor-pointer"
                        >
                          Faoliyati
                          {openDropdowns[`${person.id}-faoliyat`] ? (
                            <FaChevronUp className="w-3 h-3" />
                          ) : (
                            <FaChevronDown className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dropdown Content */}
              <div className="px-3 sm:px-6 space-y-4">
                {/* Vazifasi Content */}
                {person.vazifasi && openDropdowns[`${person.id}-vazifa`] && (
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 transition-all duration-300 mb-6">
                    <h3 className="text-[16px] sm:text-lg font-semibold text-blue-800 mb-3">{person.lavozim}</h3>
                    <div
                      className="prose prose-sm sm:prose-base max-w-none text-gray-600 text-justify text-sm sm:text-base"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(person.vazifasi),
                      }}
                    />
                  </div>
                )}

                {/* Faoliyati Content */}
                {person.mehnat_faoliyati && openDropdowns[`${person.id}-faoliyat`] && (
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 transition-all duration-300 mb-6">
                    <h3 className="text-[16px] sm:text-lg font-semibold text-blue-800 mb-3">Mehnat faoliyati</h3>
                    <div
                      className="prose prose-sm sm:prose-base max-w-none text-gray-600 text-justify text-sm sm:text-base"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(person.mehnat_faoliyati),
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-base-content/70 text-sm sm:text-base">
          Bu bo'lim uchun kontent topilmadi.
        </p>
      )}
    </section>
  );
}

export default Management;
