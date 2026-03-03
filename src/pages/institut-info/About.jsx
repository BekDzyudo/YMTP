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
    <section className="w-full bg-base-100 rounded-2xl border border-base-300 p-4 sm:p-6 lg:p-8 min-h-105">
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
              <Link className="text-base-content/70 hover:text-blue-700 transition-colors">
                Institut
              </Link>
            </li>
            <li className="text-blue-700 font-semibold">Institut haqida</li>
          </ul>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif">
          Institut haqida
        </h1>
      </div>

      {isPending ? (
        <div className="flex justify-center items-center py-12">
          <div className="loading loading-spinner loading-lg text-blue-600"></div>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <span>Ma'lumotlarni yuklashda xatolik yuz berdi</span>
        </div>
      ) : data?.length ? (
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300"></div>
          
          {/* Timeline Items */}
          <div className="space-y-8">
            {data.map((item, index) => (
              <div key={index} className="relative flex gap-6 items-start group">
                {/* Icon Circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg ring-4 ring-white group-hover:scale-110 transition-transform duration-300">
                    <FaBuilding className="text-white" size={20} />
                  </div>
                  {/* Pulse effect */}
                  <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-20 animate-ping"></div>
                </div>

                {/* Content Card */}
                <div className="flex-1 bg-white rounded-xl p-6 shadow-md hover:shadow-xl border border-gray-200 hover:border-blue-300 transition-all duration-300">
                  <div
                    className="text-lg prose prose-base sm:prose-lg max-w-none text-base-content/90 text-justify prose-headings:text-blue-700 prose-p:leading-relaxed prose-ul:list-disc prose-ol:list-decimal"
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
