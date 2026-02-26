import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import useGetFetch from "../../hooks/useGetFetch";
import DOMPurify from "dompurify";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { GrFormNextLink } from "react-icons/gr";
import { FaBook } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { FaSlidersH } from "react-icons/fa";
import { LuFileSliders } from "react-icons/lu";
import { RiNewsLine } from "react-icons/ri";
import { GlobalWorkerOptions } from "pdfjs-dist";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { RiShareForwardFill } from "react-icons/ri";
import { useHero } from "../../context/HeroContext";
import { useGlobalContext } from "../../hooks/useGlobalContext";

function RTRDetail() {
  const [themeNumber, setThemeNumber] = React.useState(1);
  // Clear localStorage and reset activeCard on unmount
  React.useEffect(() => {
    return () => {
      localStorage.removeItem("rtr_active_card");
      // Optionally reset state if component is remounted
      // setActiveCard(1);
    };
  }, []);
  const [activeCard, setActiveCard] = React.useState(() => {
    const saved = localStorage.getItem("rtr_active_card");
    return saved ? Number(saved) : 1;
  });

  React.useEffect(() => {
    localStorage.setItem("rtr_active_card", activeCard);
  }, [activeCard]);
  const { rtrId } = useParams("rtrId");

  const { data } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL_RTR}/v1/rtr_base_app/subject-list/${rtrId}/`,
  );
  console.log(data);

  const processContent = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    doc.querySelectorAll("img").forEach((img) => {
      const src = img.getAttribute("src");
      if (src && !src.startsWith("http")) {
        img.setAttribute("src", "https://rtr.profedu.uz" + src);
      }
    });
    return doc.body.innerHTML;
  };

  const newPlugin = defaultLayoutPlugin();
  GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

 const heroRef = useRef(null);
    
      useEffect(() => {
      const onScroll = () => {
        if (!heroRef.current) return;
    
        const heroHeight = heroRef.current.offsetHeight;
        const headerHeight = 80; // Header balandligi
        setOnHero(window.scrollY < (heroHeight - headerHeight));
      };
    
      onScroll();
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const { theme } = useGlobalContext();
    const { setOnHero } = useHero();

  return (
    <>
      {/* IT-themed header with overlayed fan nomi */}
      <div  ref={heroRef} className="relative w-full h-[50vh] flex items-center px-25 mb-5 rounded-2xl overflow-hidden shadow-lg">
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
          {(data?.themes?.length > 0 && data?.title) ||
            "Hech narsa topilmadi !"}
        </h1>
      </div>
      {data?.themes?.length > 0 && (
        <section className="relative min-h-[50vh] px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-10/12">
          <div className="flex items-center justify-between mb-8">
            <div className="breadcrumbs text-sm md:text-[16px] hidden md:block">
              <ul>
                <li>
                  <Link to="/">Bosh sahifa</Link>
                </li>
                <li>
                  <Link to="/digital-educational-resources">
                    Raqamli ta'lim resurslari{" "}
                  </Link>
                </li>
              </ul>
            </div>
            {data?.author?.file && (
              <Link
                to={data?.author?.file}
                target="_blank"
                className="link text-blue-600 font-semibold flex items-center gap-1 group"
              >
                Muallif guvohnomasi{" "}
                <GrFormNextLink className="text-xl transform transition-transform duration-300 group-hover:translate-x-1" />{" "}
              </Link>
            )}
          </div>
          {/* Filter */}
          <div className="w-full grid sm:grid-cols-2 lg:grid-cols-6 gap-1 sm:gap-2 xl:gap-4 px-2 sm:px-4 shadow-xl rounded-2xl bg-blue-900 py-1 sm:py-3 lg:py-5">
            {/* Card 1 */}
            {
               data?.themes[themeNumber]?.content &&
                <div
              className={
                `cursor-pointer rounded-full flex gap-2 items-center py-1 sm:py-2 px-2 sm:px-3 transition-all duration-200 group ` +
                (activeCard === 1
                  ? "bg-info text-white shadow-lg border-info"
                  : "bg-slate-100 text-gray-800 shadow-sm border border-slate-50 hover:border-gray-200")
              }
              style={{ top: 0 }}
              onClick={() => setActiveCard(1)}
            >
              <span
                className={
                  `md:w-12 md:h-10 rounded-full md:p-2 p-1 border flex items-center justify-center transition-all duration-500 ` +
                  (activeCard === 1
                    ? "text-white border-white"
                    : "text-info border-info bg-white") +
                  " group-hover:bg-info group-hover:text-white"
                }
              >
                {/* Card 1 icon */}
                <FaBook className="transition-transform duration-500 group-hover:scale-110" />
              </span>
              <div className="w-full text-sm sm:text-xs md:text-sm font-bold text-center">
                Ma'ruza matni
              </div>
            </div> 
            }
            {/* Card 2 */}
            {
              data?.themes[themeNumber]?.media && <div
              className={
                `cursor-pointer rounded-full flex gap-2 items-center py-1 sm:py-2 px-2 sm:px-4 transition-all duration-200 group ` +
                (activeCard === 2
                  ? "bg-info text-white shadow-lg border-info"
                  : "bg-slate-100 text-gray-800 shadow-sm border border-slate-50 hover:border-gray-200")
              }
              style={{ top: 0 }}
              onClick={() => setActiveCard(2)}
            >
              <span
                className={
                  `md:w-12 md:h-10 rounded-full md:p-2 p-1 border flex items-center justify-center transition-all duration-500 ` +
                  (activeCard === 2
                    ? "text-white border-white"
                    : "text-info border-info bg-white") +
                  " group-hover:bg-info group-hover:text-white"
                }
              >
                {/* Card 2 icon */}
                <FaVideo className="transition-transform duration-500 group-hover:scale-110" />
              </span>
              <div className="w-full text-sm sm:text-xs md:text-sm font-bold text-center">
                Media materiallar
              </div>
            </div>
            }
            
            {/* Card 3 */}
            {
              data?.themes[themeNumber]?.show_material?.length>0 && 
              <div
              className={
                `cursor-pointer rounded-full flex gap-2 items-center py-1 sm:py-2 px-2 sm:px-4 transition-all duration-200 group ` +
                (activeCard === 3
                  ? "bg-info text-white shadow-lg border-info"
                  : "bg-slate-100 text-gray-800 shadow-sm border border-slate-50 hover:border-gray-200")
              }
              style={{ top: 0 }}
              onClick={() => setActiveCard(3)}
            >
              <span
                className={
                  `md:w-12 md:h-10 rounded-full md:p-2 p-1 border flex items-center justify-center transition-all duration-500 ` +
                  (activeCard === 3
                    ? "text-white border-white"
                    : "text-info border-info bg-white") +
                  " group-hover:bg-info group-hover:text-white"
                }
              >
                {/* Card 3 icon */}
                <FaImage className="transition-transform duration-500 group-hover:scale-110" />
              </span>
              <div className="w-full text-sm sm:text-xs md:text-sm font-bold text-center">
                Ko‘rgazma materiallari
              </div>
            </div>
            }
            
            {/* Card 4 */}
            {
              data?.themes[themeNumber]?.presentation && <Link
              to={data?.themes[themeNumber]?.presentation}
              target="_blank"
              className={
                `cursor-pointer rounded-full flex gap-2 items-center py-1 sm:py-2 px-2 sm:px-4 transition-all duration-200 group ` +
                (activeCard === 4
                  ? "bg-info text-white shadow-lg border-info"
                  : "bg-slate-100 text-gray-800 shadow-sm border border-slate-50 hover:border-gray-200")
              }
              style={{ top: 0 }}
              onClick={() => setActiveCard(4)}
            >
              <span
                className={
                  `md:w-12 md:h-10 rounded-full md:p-2 p-1 border flex items-center justify-center transition-all duration-500 ` +
                  (activeCard === 4
                    ? "text-white border-white"
                    : "text-info border-info bg-white") +
                  " group-hover:bg-info group-hover:text-white"
                }
              >
                {/* Card 4 icon */}
                <RiNewsLine className="transition-transform duration-500 group-hover:scale-110" />
              </span>
              <div className="w-full text-sm sm:text-xs md:text-sm font-bold text-center flex items-center justify-center gap-1">
                Taqdimotlar <RiShareForwardFill className="text-lg"/>
              </div>
            </Link>
            }
            
            {/* Card 5 */}
            {
              data?.themes[themeNumber]?.practical_assignment && 
               <div
              className={
                `cursor-pointer rounded-full flex gap-2 items-center py-1 sm:py-2 px-2 sm:px-4 transition-all duration-200 group ` +
                (activeCard === 5
                  ? "bg-info text-white shadow-lg border-info"
                  : "bg-slate-100 text-gray-800 shadow-sm border border-slate-50 hover:border-gray-200")
              }
              style={{ top: 0 }}
              onClick={() => setActiveCard(5)}
            >
              <span
                className={
                  `md:w-12 md:h-10 rounded-full md:p-2 p-1 border flex items-center justify-center transition-all duration-500 ` +
                  (activeCard === 5
                    ? "text-white border-white"
                    : "text-info border-info bg-white") +
                  " group-hover:bg-info group-hover:text-white"
                }
              >
                {/* Card 5 icon */}
                <LuFileSliders className="transition-transform duration-500 group-hover:scale-110" />
              </span>
              <div className="w-full text-sm sm:text-xs md:text-sm font-bold text-center">
                Nazariy-amaliy topshiriqlar
              </div>
            </div>
            }
           
            {/* Card 6 */}
            {
              data?.themes[themeNumber]?.educational_technologies && 
              <Link
              to={data?.themes[themeNumber]?.educational_technologies}
              target="_blank"
              className={
                `cursor-pointer rounded-full flex gap-2 items-center py-1 sm:py-2 px-2 sm:px-4 transition-all duration-200 group ` +
                (activeCard === 6
                  ? "bg-info text-white shadow-lg border-info"
                  : "bg-slate-100 text-gray-800 shadow-sm border border-slate-50 hover:border-gray-200")
              }
              style={{ top: 0 }}
              onClick={() => setActiveCard(6)}
            >
              <span
                className={
                  `md:w-12 md:h-10 rounded-full md:p-2 p-1 border flex items-center justify-center transition-all duration-500 ` +
                  (activeCard === 6
                    ? "text-white border-white"
                    : "text-info border-info bg-white") +
                  " group-hover:bg-info group-hover:text-white"
                }
              >
                {/* Card 6 icon */}
                <FaSlidersH className="transition-transform duration-500 group-hover:scale-110" />
              </span>
              <div className="w-full text-sm sm:text-xs md:text-sm font-bold text-center flex items-center gap-1">
                Ta'lim texnologiyalari <RiShareForwardFill className="text-lg"/>
              </div>
            </Link>
            }
            
          </div>
          <div className="flex flex-col md:flex-row gap-8 mt-10">
            {/* Sidebar: Mundarija */}
            <aside className="w-full h-min md:w-1/4 lg:w-1/5 flex flex-col gap-4 bg-white rounded-xl shadow-lg p-4 border border-blue-100">
              <div className="text-lg font-bold mb-3 text-blue-700 uppercase text-center">
                Mundarija
              </div>
              {data?.themes?.map((topic, idx) => (
                <button
                  onClick={() => setThemeNumber(idx + 1)}
                  key={topic.id || idx}
                  className={`cursor-pointer flex items-center justify-between px-4 py-2 rounded-lg border  ${
                    themeNumber == idx + 1
                      ? "bg-blue-600 border-blue-600 text-white shadow-sm font-semibold text-sm group"
                      : "bg-blue-50 border-blue-300 text-blue-700 shadow-sm hover:bg-blue-100 transition-all duration-200 font-semibold text-sm group"
                  }`}
                >
                  <span>{idx + 1}-mavzu</span>
                  <span className={`text-xl transition-transform duration-300 ${themeNumber == idx + 1 ? '' : 'group-hover:translate-x-2'}`}>&#8594;</span>
                </button>
              ))}
            </aside>
            {/* contents */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-lg pb-6">
                <div className="text-xl font-bold text-gray-800 font-serif text-center mb-5 rounded-t-xl py-6 px-6 bg-blue-100">
                  {data?.themes[themeNumber]?.title || "Mavzu topilmadi"}
                </div>
                {/* Main text content */}
                <div className="px-6">
                  {/* maruza */}
                  {activeCard === 1 && (
                    <div
                      className="prose max-w-none text-gray-800 text-base leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          processContent(data?.themes[themeNumber]?.content),
                        ),
                      }}
                    ></div> 
                  )}
                  {/* media */}
                  {activeCard === 2 && (
                    <iframe
                      src={(() => {
                        if (data?.themes[themeNumber]?.media) {
                          let videoId = null;
                          if (
                            data?.themes[themeNumber]?.media.includes(
                              "youtube.com/watch",
                            )
                          ) {
                            const match =
                              data?.themes[themeNumber]?.media.match(
                                /[?&]v=([^&]+)/,
                              );
                            videoId = match ? match[1] : null;
                          } else if (
                            data?.themes[themeNumber]?.media.includes(
                              "youtu.be/",
                            )
                          ) {
                            const match =
                              data?.themes[themeNumber]?.media.match(
                                /youtu\.be\/([^?&]+)/,
                              );
                            videoId = match ? match[1] : null;
                          }
                          return videoId
                            ? `https://www.youtube.com/embed/${videoId}`
                            : data?.themes[themeNumber]?.media;
                        }
                        return "";
                      })()}
                      title={
                        data?.themes[themeNumber]?.title || "Media material"
                      }
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full object-cover rounded-t-2xl"
                      style={{
                        borderTopLeftRadius: "1rem",
                        borderTopRightRadius: "1rem",
                        aspectRatio: "16/9",
                        minHeight: "400px",
                        background: "#000",
                      }}
                    />
                  )}
                  {/* ko'rgazma material */}
                  {activeCard === 3 && (
                    <img
                      src={data?.themes[themeNumber]?.show_material[0]?.content}
                      title={
                        data?.themes[themeNumber]?.title ||
                        "Ko'rgazma materiali"
                      }
                      className="w-full min-h-[400px] object-cover rounded-t-2xl"
                    />
                  )}
                  {/* taqdimot */}
                  {/* {activeCard === 4 && (
                    <Worker workerUrl={GlobalWorkerOptions.workerSrc}>
                      <Viewer
                        fileUrl={data?.themes[themeNumber]?.presentation}
                        plugins={[newPlugin]}
                      />
                    </Worker>
                  )} */}
                  {/* nazariy-amaliy topshiriq */}
                  {activeCard === 5 && (
                    <div
                      className="prose max-w-none text-gray-800 text-base leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          processContent(
                            data?.themes[themeNumber]?.practical_assignment,
                          ),
                        ),
                      }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default RTRDetail;
