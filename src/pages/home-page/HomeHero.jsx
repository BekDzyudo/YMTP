import React, { useContext, useEffect, useRef, useState } from "react";
import Divider from "../../components/Dvider";
import { FaGooglePlay } from "react-icons/fa";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useHero } from "../../context/HeroContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaChalkboardTeacher, FaGraduationCap, FaStar, FaVideo } from "react-icons/fa";


function HomeHero() {
  const { theme } = useGlobalContext();
  const { auth } = useContext(AuthContext);
  const { setOnHero } = useHero();

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
  }, [setOnHero]);

  // Kartochkalar uchun animatsiya
  const cardTargets = [2405, 119, 1053, 38206];
  const [cardNumbers, setCardNumbers] = useState(cardTargets.map(() => 0));
  useEffect(() => {
    let frame = 0;
    const duration = 1000; // ms
    const steps = 60;
    const interval = duration / steps;
    function animate() {
      frame++;
      setCardNumbers(cardTargets.map((target) => Math.round(target * Math.min(frame / steps, 1))));
      if (frame < steps) setTimeout(animate, interval);
    }
    animate();
  }, []);

  // Carousel uchun rasmlar
  const items = [
    { id: "item1", src: "/rtr_bg7.jpg" },
    { id: "item2", src: "/rtr_bg4.jpg" },
    { id: "item3", src: "/rtr_bg8.png" },
    { id: "item4", src: "/rtr_bg3.jpg" },
    { id: "item5", src: "/rtr_bg5.jpg" },
  ];

  // Sarlavha animatsiyasi
  const headingText = "Kasbiy ta'limni rivojlantirish instituti yagona axborot-ta'lim portali";
  const [showHeading, setShowHeading] = useState(false);
  useEffect(() => {
    setShowHeading(false);
    const headingTimeout = setTimeout(() => setShowHeading(true), 100);
    return () => clearTimeout(headingTimeout);
  }, []);

  // Carousel aktiv index
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <section
      className={`relative w-full h-screen flex items-center px-5 ${
        theme === "light" ? "text-neutral-content" : ""
      }`}
      ref={heroRef}
    >
      {/* Carousel rasm fon */}
      {/* <div className="absolute inset-0 w-full h-full">
        <div className="carousel w-full absolute inset-0 h-full flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full" style={{ height: '100%' }}>
            {items.map((item, idx) => {
              let translate = (idx - activeIndex) * 100;
              if (idx === 0 && activeIndex === items.length - 1) translate = 100;
              if (idx === items.length - 1 && activeIndex === 0) translate = -100;
              return (
                <img
                  key={item.id}
                  src={item.src}
                  alt=""
                  className="object-cover w-full h-full absolute top-0 left-0 transition-all duration-700 ease-in-out"
                  style={{
                    objectFit: "cover",
                    transform: `translateX(${translate}%)`,
                    opacity: idx === activeIndex ? 1 : 0.7,
                    zIndex: idx === activeIndex ? 10 : 0,
                  }}
                />
              );
            })}
          </div>
        </div>
        
        <div className="flex w-full justify-center gap-2 py-2 absolute bottom-4 z-20">
          {items.map((item, idx) => (
            <button
              key={item.id}
              className="focus:outline-none"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: activeIndex === idx ? 32 : 10,
                height: 10,
                borderRadius: 8,
                background: activeIndex === idx ? '#2563EB' : '#fff',
                opacity: activeIndex === idx ? 1 : 0.5,
                border: 'none',
                transition: 'all 0.3s',
                cursor: 'pointer',
                padding: 0,
                margin: 0,
                display: 'inline-block',
              }}
            />
          ))}
        </div>
      </div> */}

      {/* Video fon */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video_fon.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Matn o'qilishi uchun yengil overlay */}
      <div
        className="absolute inset-0 w-full h-screen pointer-events-none z-10"
        style={{ background: "rgba(0,0,0,0.38)" }}
      />

      {/* Main content */}
      <div className="flex flex-col w-full justify-center">
        <div className="w-full flex flex-col items-center z-20">
          <div className="w-full sm:w-4/5 mt-10">
            <h2
              className="text-xl sm:text-2xl md:text-5xl w-full md:max-w-[90%] xl:max-w-[80%] mx-auto text-center lg:text-6xl mb-5 lg:mb-10 font-black font-serif relative text-white md:leading-13 lg:leading-16"
              style={{
                opacity: showHeading ? 1 : 0,
                transform: showHeading ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
                filter: showHeading ? 'blur(0px)' : 'blur(3px)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
              }}
            >
              {headingText.split(' ').slice(0, -3).map((word, idx) => (
                <span
                  key={idx}
                  className="inline-block mx-1"
                  style={{
                    opacity: showHeading ? 1 : 0,
                    transform: showHeading ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.5s ease-out ${0.05 * idx}s`,
                  }}
                >
                  {word}
                </span>
              ))}
              <span className="block">
                {headingText.split(' ').slice(-3).join(' ')}
              </span>
            </h2>
            <Divider color="white" />
          </div>

          {/* Statistika kartochalari */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mt-4 sm:mt-12 z-20 max-w-6xl mx-auto w-full sm:px-4">
            {[
              {
                icon: <FaChalkboardTeacher size={22} />,
                desc: "O'quv meyoriy hujjatlar",
                gradient: "from-info to-cyan-400",
                glowColor: "rgba(6, 182, 212, 0.3)"
              },
              {
                icon: <FaGraduationCap size={22} />,
                desc: "Raqamli ta'lim resurslari",
                gradient: "from-info to-cyan-400",
                glowColor: "rgba(6, 182, 212, 0.3)"
              },
              {
                icon: <FaStar size={22} />,
                desc: "O‘quv adabiyotlari",
                gradient: "from-info to-cyan-400",
                glowColor: "rgba(6, 182, 212, 0.3)"
              },
              {
                icon: <FaVideo size={22} />,
                desc: "Foydalanuvchilar soni",
                gradient: "from-info to-cyan-400",
                glowColor: "rgba(6, 182, 212, 0.3)"
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${0.1 * idx}s both`
                }}
              >
                {/* Card */}
                <div className="relative rounded-3xl p-4 sm:p-5 flex flex-col items-center gap-2 border border-white/20 hover:border-white/35 transition-all duration-300 hover:scale-105 min-h-40 justify-center shadow-2xl" style={{ background: "rgba(10,10,30,0.30)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>

                  {/* Icon circle */}
                  <div className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                    <div className="text-white drop-shadow-2xl relative z-10">
                      {card.icon}
                    </div>
                  </div>

                  {/* Number */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                        {cardNumbers[idx]}
                      </span>
                      <span className="text-base sm:text-lg font-semibold text-white">
                        ta
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-14 h-1 rounded-full bg-white/20 overflow-hidden mt-1">
                      <div
                        className={`h-full bg-gradient-to-r ${card.gradient} transition-all duration-1000`}
                        style={{ width: `${(cardNumbers[idx] / cardTargets[idx]) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-center text-white/80 font-medium leading-tight px-2 min-h-[28px] flex items-center">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <style>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes shimmer {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
          `}</style>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/10 via-primary/5 to-transparent" />
    </section>
  );
}

export default HomeHero;
