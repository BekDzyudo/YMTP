import React from "react";
import { Link } from "react-router-dom";
import useGetFetch from "../../hooks/useGetFetch";
import { FaHome } from "react-icons/fa";
import DOMPurify from "dompurify";

function Structure() {
  const { data, isPending, error } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/shared_app/tuzilma/`
  );
console.log(data);

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
            <li className="text-blue-700 font-semibold">Institut tuzilmasi</li>
          </ul>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif">Institut tuzilmasi</h1>
      </div>

      {isPending ? (
        <div className="flex justify-center items-center py-12">
          <div className="loading loading-spinner loading-lg text-blue-600"></div>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <span>Ma'lumotlarni yuklashda xatolik yuz berdi</span>
        </div>
      ) : data?.description ? (
        <div
          className="prose prose-base sm:prose-lg max-w-none text-base-content/80"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }}
        />
      ) : (
        <p className="text-base-content/70 text-sm sm:text-base">
          Bu bo'lim uchun kontent topilmadi.
        </p>
      )}
    </section>
  );
}

export default Structure;
