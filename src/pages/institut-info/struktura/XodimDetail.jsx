import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { FaHome, FaEnvelope } from "react-icons/fa";
import useGetFetch from "../../../hooks/useGetFetch";

function XodimDetail() {
  const { id } = useParams();

  const navigate = useNavigate();
//   const { data, loading, error } = useGetFetch(
//     `${import.meta.env.VITE_BASE_URL}/shared_app/tuzilma/${id}/xodimlar/`,
//   );
  const { data, loading, error } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/shared_app/xodim/${id}/`,
  );

  return (
    <section className="w-full bg-base-100 rounded-2xl border border-base-300 p-4 sm:p-6 lg:p-8 min-h-105 mb-25 sm:mb-35">
      <div className="bg-slate-200 border-t-8 border-blue-800 rounded-t-2xl rounded-b-2xl py-3 sm:py-5 px-5 sm:px-8 flex gap-10">
        <div className="hidden md:block">
          <img
            src={data?.rasm || "/person.png"}
            alt={data?.FISH || "Xodim nomi"}
            className="rounded-2xl w-48 h-48 object-cover border-2 border-blue-800  shadow-xl"
          />
        </div>
        <div className="h-full flex-col justify-between gap-5">
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
          <div className="flex flex-col gap-4">
            <h1 className="text-lg text-center sm:text-start md:text-3xl sm:text-2xl font-bold">
              {data?.FISH || "Xodim nomi"}
            </h1>
            <p className="text-center sm:text-start text-xs sm:text-sm md:text-lg italic">
              {data?.lavozimi || "Lavozim ma'lumotlari mavjud emas"}
            </p>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <FaEnvelope className="text-blue-700 text-xl" />
            <a
              href={`mailto:${data?.pochta}`}
              className="text-sm sm:text-base font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              {data?.pochta || "Email mavjud emas"}
            </a>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <span className="loading loading-spinner loading-lg text-blue-700"></span>
          <p className="text-base-content/70 mt-4">
            Ma'lumotlar yuklanmoqda...
          </p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Xatolik yuz berdi!</p>
        </div>
      ) : data ? (
        <div className="w-full mx-auto flex flex-col gap-10 mt-8">
            {!(data?.biografiya || data?.vazifasi || data?.mehnat_faoliyati) && <p>Ma'lumotlar mavjud emas</p>}
          {data?.vazifasi && (
            <div className="bg-white border border-gray-300 rounded-2xl shadow-lg overflow-hidden">
              {/* Vazifalari */}
              <div className="p-8">
                <h1 className="text-xl font-bold mb-6 font-serif bg-gradient-to-r from-[#194882] to-[#0ea5e9] bg-clip-text text-transparent">
                  Vazifalari
                </h1>
                <div
                  className="text-base md:text-lg text-justify space-y-4 leading-relaxed [&>p]:mb-4 [&>p]:pl-10 [&>p]:py-2 [&>p]:relative [&>p]:before:content-['✓'] [&>p]:before:absolute [&>p]:before:left-0 [&>p]:before:top-1/2 [&>p]:before:-translate-y-1/2 [&>p]:before:w-7 [&>p]:before:h-7 [&>p]:before:rounded-full [&>p]:before:bg-gradient-to-br [&>p]:before:from-[#194882] [&>p]:before:to-[#0ea5e9] [&>p]:before:text-white [&>p]:before:text-center [&>p]:before:leading-7 [&>p]:before:text-base [&>p]:before:font-bold [&>p]:before:shadow-md [&>p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(data?.vazifasi),
                  }}
                />
              </div>
            </div>
          )}
          {data?.biografiya && (
            <div className="bg-white border border-gray-300 rounded-2xl shadow-lg overflow-hidden">
              {/* Biografiya */}
              <div className="p-8">
              <h1 className="text-xl font-bold mb-6 font-serif bg-gradient-to-r from-[#194882] to-[#0ea5e9] bg-clip-text text-transparent">
                  Biografiya
                </h1>
                <div
                  className="text-base md:text-lg text-justify space-y-4 leading-relaxed [&>p]:mb-4 [&>p]:pl-10 [&>p]:py-2 [&>p]:relative [&>p]:before:content-['i'] [&>p]:before:absolute [&>p]:before:left-0 [&>p]:before:top-1/2 [&>p]:before:-translate-y-1/2 [&>p]:before:w-7 [&>p]:before:h-7 [&>p]:before:rounded-full [&>p]:before:bg-gradient-to-br [&>p]:before:from-[#194882] [&>p]:before:to-[#0ea5e9] [&>p]:before:text-white [&>p]:before:text-center [&>p]:before:leading-7 [&>p]:before:text-sm [&>p]:before:font-bold [&>p]:before:italic [&>p]:before:shadow-md [&>p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(data?.biografiya),
                  }}
                />
              </div>
            </div>
          )}
          {data?.mehnat_faoliyati && (
            <div className="bg-white border border-gray-300 rounded-2xl shadow-lg overflow-hidden">
              {/* mehnat faoliyati */}
              <div className="p-8">
              <h1 className="text-xl font-bold mb-6 font-serif bg-gradient-to-r from-[#194882] to-[#0ea5e9] bg-clip-text text-transparent">
                  Mehnat faoliyati
                </h1>
                <div
                  className="text-base md:text-lg text-justify space-y-4 leading-relaxed [&>p]:mb-4 [&>p]:pl-10 [&>p]:py-2 [&>p]:relative [&>p]:before:content-['★'] [&>p]:before:absolute [&>p]:before:left-0 [&>p]:before:top-1/2 [&>p]:before:-translate-y-1/2 [&>p]:before:w-7 [&>p]:before:h-7 [&>p]:before:rounded-full [&>p]:before:bg-gradient-to-br [&>p]:before:from-[#194882] [&>p]:before:to-[#0ea5e9] [&>p]:before:text-white [&>p]:before:text-center [&>p]:before:leading-7 [&>p]:before:text-base [&>p]:before:font-bold [&>p]:before:shadow-md [&>p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      data?.mehnat_faoliyati,
                    ),
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-base-content/70 text-sm sm:text-base">
            Ma'lumot topilmadi.
          </p>
        </div>
      )}
    </section>
  );
}

export default XodimDetail;
