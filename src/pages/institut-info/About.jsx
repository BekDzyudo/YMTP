import React from "react";
import { Link } from "react-router-dom";
import useGetFetch from "../../hooks/useGetFetch";
import { FaHome, FaCircle, FaBuilding } from "react-icons/fa";
import DOMPurify from "dompurify";

function About() {
  const { data, isPending, error } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/shared_app/institut/`,
  );

  return (
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
                Bosh sahifa
              </Link>
            </li>
            <li>
              <Link className="text-base-content/70 hover:text-blue-700 transition-colors">
                Institut
              </Link>
            </li>
            <li className="text-blue-700 font-semibold">Institut haqida</li>
          </ul>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif">
          Institut haqida
        </h1>
      </div>

      {isPending ? (
        <div className="flex justify-center items-center py-8 sm:py-10 md:py-12">
          <div className="loading loading-spinner loading-lg text-blue-600"></div>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <span>Ma'lumotlarni yuklashda xatolik yuz berdi</span>
        </div>
      ) : data?.length ? (
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-5 md:left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-500 via-blue-400 to-blue-300"></div>
          
          {/* Timeline Items */}
          <div className="space-y-6 sm:space-y-8">
            {data.map((item, index) => (
              <div key={index} className="relative flex gap-3 sm:gap-4 md:gap-6 items-start group">
                {/* Icon Circle */}
                <div className="relative z-10 shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-linear-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg ring-2 sm:ring-4 ring-white group-hover:scale-110 transition-transform duration-300">
                    <FaBuilding className="text-white" size={16} />
                  </div>
                  {/* Pulse effect */}
                  <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-20 animate-ping"></div>
                </div>

                {/* Content Card */}
                <div className="flex-1 border-b border-dashed sm:border-b-2 border-gray-300 pb-4 sm:pb-6">
                  <div
                    className="text-sm sm:text-base md:text-lg prose prose-sm sm:prose-base md:prose-lg max-w-none text-base-content/90 text-justify prose-headings:text-blue-700 prose-p:leading-relaxed prose-ul:list-disc prose-ol:list-decimal"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(item.description),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-base-content/70 text-sm sm:text-base">
          Bu bo'lim uchun kontent topilmadi.
        </p>
      )}
    </section>
  );
}

export default About;
