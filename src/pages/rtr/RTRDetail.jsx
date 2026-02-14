import React from "react";
import { Link, useParams } from "react-router-dom";
import useGetFetch from "../../hooks/useGetFetch";

function RTRDetail() {
  const { rtrId } = useParams("rtrId");

  const { data } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL_RTR}/v1/rtr_base_app/subject-list/${rtrId}/`,
  );

  return (
    <>
      {/* IT-themed header with overlayed fan nomi */}
      <div className="relative w-full h-[50vh] flex items-center px-25 mb-10 rounded-2xl overflow-hidden shadow-lg">
        <img
          src="/rtr_bg5.jpg"
          alt="IT fan header"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 w-full h-full"
          style={{ background: "rgba(0,0,0,0.7)" }}
        />
        <h1 className="relative z-10 text-white/90 mt-15 text-4xl md:text-5xl font-bold text-start w-1/2 leading-16 drop-shadow-lg px-4 font-serif">
          {data?.title || "Fan nomi"}
        </h1>
      </div>
      <section className="relative min-h-[50vh] px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-10/12">
        <div className="breadcrumbs text-sm md:text-[16px] hidden md:block">
          <ul>
            <li>
              <Link to="/region">Viloyatlar</Link>
            </li>
            <li>
              <Link to={`/region/districts`}>Tumanlar</Link>
            </li>
            <li>Texnikumlar</li>
          </ul>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar: Mundarija */}
          <aside className="w-full md:w-1/4 lg:w-1/5 flex flex-col gap-4 bg-white rounded-xl shadow-lg p-4 border border-blue-100">
            <div className="text-lg font-bold mb-3 text-blue-700">
              Mundarija
            </div>
            {data?.topics?.map((topic, idx) => (
              <button
                key={topic.id || idx}
                className="flex items-center justify-between px-4 py-2 rounded-lg border border-blue-300 bg-blue-50 shadow-sm hover:bg-blue-100 transition-all duration-200 text-blue-700 font-semibold text-sm"
              >
                <span>{idx + 1}-mavzu</span>
                <span className="text-xl">&#8594;</span>
              </button>
            ))}
          </aside>
          {/* Filter bar */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-6 justify-center">
              {data?.categories?.map((cat, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold text-sm shadow-md hover:bg-blue-700 transition-all duration-200"
                >
                  {cat}
                </span>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-3 text-gray-800">
                {data?.subtitle || ""}
              </h2>
              <div className="mb-4">
                <span className="font-bold text-lg text-gray-700">Reja:</span>
                <ul className="list-decimal list-inside mt-2 text-gray-700 text-base">
                  {data?.plan?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              {/* Main text content */}
              <div className="prose max-w-none text-gray-800 text-base leading-relaxed">
                {data?.content}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RTRDetail;
