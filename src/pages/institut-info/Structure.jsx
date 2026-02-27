import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import useGetFetch from "../../hooks/useGetFetch";

function Structure() {

  const {data} = useGetFetch(`${import.meta.env.VITE_BASE_URL}/shared_app/tuzilma/`)
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

      {
        data && data.length > 0 ? (
          // <img src={data[0]?.file} alt="" className="w-full h-auto"/>
          <h1>Ma'lumot yuklanmagan</h1>
        ) : (
          <p className="text-base-content/70 text-sm sm:text-base">
            Bu bo'lim uchun kontent topilmadi.
          </p>
        )
      }
    </section>
  );
}

export default Structure;
