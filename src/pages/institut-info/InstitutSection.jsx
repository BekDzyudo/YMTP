import React from "react";
import { useLocation } from "react-router-dom";
import { institutLinks } from "../../constants/institutLinks";
import useGetFetch from "../../hooks/useGetFetch";

function InstitutSection() {
  const { pathname } = useLocation();

  const current =
    institutLinks.find((item) => pathname.startsWith(item.to)) || institutLinks[0];

    const {data, isPending, error} = useGetFetch(`${import.meta.env.VITE_BASE_URL}/shared_app/institut/`)
    console.log(data);
    

  return (
    <section className="w-full bg-base-100 rounded-2xl border border-base-300 p-4 sm:p-6 lg:p-8 min-h-105">
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">{current.label}</h1>
      <p className="text-base-content/70 text-sm sm:text-base">
        Bu bo'lim uchun kontent keyin to'ldiriladi.
      </p>
    </section>
  );
}

export default InstitutSection;
