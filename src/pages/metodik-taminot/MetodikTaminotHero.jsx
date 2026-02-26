import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useHero } from "../../context/HeroContext";
import {
  FaBook,
  FaFileAlt,
  FaFolderOpen,
  FaTools,
} from "react-icons/fa";
import useGetFetch from "../../hooks/useGetFetch";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function MetodikTaminotHero() {

    const {data: statistika} = useGetFetch(`${import.meta.env.VITE_BASE_URL_EDU}/statistics/`)  

     const heroRef = useRef(null);
    
      useEffect(() => {
      const onScroll = () => {
        if (!heroRef.current) return;
    
        const heroHeight = heroRef.current.offsetHeight;
        setOnHero(window.scrollY < heroHeight);
      };
    
      onScroll();
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const { theme } = useGlobalContext();
      const { setOnHero } = useHero();
      // Animated heading and description state
      const headingText = "Kasbiy ta'lim uchun metodik ta'minot";
      const [showHeading, setShowHeading] = useState(false);
      const [showDesc, setShowDesc] = useState(false);
      useEffect(() => {
        setShowHeading(false);
        setShowDesc(false);
        const headingTimeout = setTimeout(() => setShowHeading(true), 100);
        const descTimeout = setTimeout(() => setShowDesc(true), 350);
        return () => {
          clearTimeout(headingTimeout);
          clearTimeout(descTimeout);
        };
      }, []);
      // Animated numbers for cards
      const safeStat = (val) => (typeof val === 'number' && !isNaN(val) ? val : 0);
      const cardTargets = [
        safeStat(statistika?.data?.counts?.kasb_va_mutaxasislik),
        safeStat(statistika?.data?.counts?.uquv_qullanma),
        safeStat(statistika?.data?.counts?.uquv_material),
        safeStat(statistika?.data?.counts?.qisqa_kurs)
      ];
      const [cardNumbers, setCardNumbers] = useState(cardTargets.map(() => 0));
      useEffect(() => {
        let frame = 0;
        const duration = 2000; // ms
        const steps = 60;
        const interval = duration / steps;
        function animate() {
          frame++;
          setCardNumbers(
            cardTargets.map((target) =>
              Math.round(target * Math.min(frame / steps, 1)),
            ),
          );
          if (frame < steps) setTimeout(animate, interval);
        }
        animate();
      }, [statistika]);

  return (
    <>
      <style>{`
        .metodik-hero-swiper .swiper-slide {
          width: 100%;
          height: 100%;
        }
        
        .metodik-hero-swiper .swiper-pagination {
          bottom: 20px;
        }
        
        .metodik-hero-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: white;
          opacity: 0.5;
          margin: 0 6px;
          transition: all 0.3s ease;
        }
        
        .metodik-hero-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: white;
          transform: scale(1.2);
        }
      `}</style>
      <section
         ref={heroRef}
              className={`relative w-full h-[65vh] md:h-[80vh] flex items-center px-5 ${
                theme === "light" ? "text-neutral-content" : ""
              }`}
            >
              <div className="absolute inset-0 w-full h-full">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={0}
                  slidesPerView={1}
                  speed={800}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  loop={true}
                  className="w-full h-full metodik-hero-swiper"
                >
                  <SwiperSlide>
                    <img
                      src="/edu_bg1.png"
                      alt="Metodik ta'minot 1"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src="/edu_bg2.png"
                      alt="Metodik ta'minot 2"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src="/edu_bg3.png"
                      alt="Metodik ta'minot 3"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src="/edu_bg5.png"
                      alt="Metodik ta'minot 3"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src="/edu_bg6.png"
                      alt="Metodik ta'minot 3"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src="/edu_bg7.png"
                      alt="Metodik ta'minot 3"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
              <div
                className="absolute inset-0 w-full h-[65vh] md:h-[80vh] pointer-events-none z-10"
                style={{
                  background: theme === "light" ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.7)",
                }}
              ></div>
              <div className="flex flex-col w-full justify-center">
                <div className="w-full flex flex-col items-center z-20">
                  <div className="w-4/5 mt-10">
                    <h2
                      className="text-4xl text-center sm:text-5xl md:text-6xl mb-5 lg:mb-10 font-bold text-white lg:leading-17 font-serif"
                      style={{
                        textShadow: "0 2px 8px rgba(0,0,0,0.7), 0 1px 0 #000",
                        opacity: showHeading ? 1 : 0,
                        transform: showHeading ? "translateY(0)" : "translateY(32px)",
                        transition: "opacity 0.5s, transform 0.5s",
                      }}
                    >
                      {headingText}
                    </h2>
                    <p
                      className="text-xs sm:text-sm md:text-[16px] lg:text-xl text-center w-full sm:max-w-[80%] mx-auto italic text-gray-200 font-medium"
                      style={{
                        textShadow: "0 2px 8px rgba(0,0,0,0.7), 0 1px 0 #000",
                        opacity: showDesc ? 1 : 0,
                        transform: showDesc ? "translateY(0)" : "translateY(32px)",
                        transition: "opacity 0.5s, transform 0.5s",
                      }}
                    >
                      Kasbiy ta'lim tashkilotlari uchun metodik ta'minot - bu o'quv jarayonini qo'llab-quvvatlash va rivojlantirishga qaratilgan resurslar bo'lib, u
                      kasbiy ta'lim tashkilotlari uchun metodik ta'minotni amalga oshiradi
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-6 mt-8 sm:mt-10 z-20">
                    {[
                      {
                        icon: (
                          <FaFileAlt className="text-info text-2xl md:text-4xl" />
                        ),
                        desc: "O'quv me'yoriy hujjatlar",
                      },
                      {
                        icon: (
                          <FaBook className="text-info text-2xl md:text-4xl" />
                        ),
                        desc: "O'quv adabiyotlar",
                      },
                      {
                        icon: <FaFolderOpen className="text-info text-2xl md:text-4xl" />,
                        desc: "O'qitish materiallari to'plami",
                      },
                      {
                        icon: <FaTools className="text-info text-2xl md:text-4xl" />,
                        desc: "Metodik mahsulotlar",
                      },
                    ].map((card, idx) => (
                      <div
                        key={idx}
                        className="backdrop-blur-md bg-white/60 dark:bg-white/15 rounded-xl shadow-lg p-2 lg:p-4 sm:p-3 flex flex-col gap-1 sm:gap-2 items-center w-full lg:max-w-[180px] border border-white/40"
                        style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)" }}
                      >
                        <div className="mb-0 md:mb-2">{card.icon}</div>
                        <div className="mb-0 md:mb-1 text-center">
                          <span className="text-[16px] sm:text-xl lg:text-2xl font-bold text-white">
                            {cardNumbers[idx]} ta
                          </span>
                        </div>
                        <div className="text-[11px] sm:text-sm italic text-gray-800 dark:text-white/70 text-center font-medium">
                          {card.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/10 via-primary/5 to-transparent " />
            </section>
    </>
  )
}

export default MetodikTaminotHero