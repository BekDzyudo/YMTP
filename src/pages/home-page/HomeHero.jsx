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
    setOnHero(window.scrollY < heroHeight);
  };

  onScroll();
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);

  // useEffect(() => {
  //   const onScroll = () => {
  //     setOnHero(window.scrollY < window.innerHeight);
  //   };

  //   onScroll();
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);


  // ========================================================================================
    const cardTargets = [60, 22, 35, 1458];
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

  const items = [
    { id: "item1", src: "/rtr_bg7.jpg" },
    { id: "item2", src: "/rtr_bg4.jpg" },
    { id: "item3", src: "/rtr_bg8.png" },
    { id: "item4", src: "/rtr_bg3.jpg" },
    { id: "item5", src: "/rtr_bg5.jpg" },
  ];

  const headingText = "Metodik ta’minlash yagona axborot-ta’lim portali";
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

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    const onScroll = () => {
      setOnHero(window.scrollY < window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <section
      className={`relative w-full h-screen flex items-center px-5 ${
        theme === "light" ? "text-neutral-content" : ""
      }`}
      ref={heroRef}
    >
      <div className="absolute inset-0 w-full h-full">
        <div className="carousel w-full absolute inset-0 h-full flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full" style={{ height: '100%' }}>
            {items.map((item, idx) => {
              let translate = (idx - activeIndex) * 100;
              // For infinite loop effect
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
      </div>
      <div
        className="absolute inset-0 w-full h-screen pointer-events-none z-10"
        style={{
          background: theme === "light"
            ? "linear-gradient(90deg, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.98) 100%)"
            : "linear-gradient(90deg, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0.98) 100%)"
        }}
      />
      <div className="flex flex-col w-full justify-center">
        <div className="w-full flex flex-col items-center z-20">
         <div className="w-4/5 mt-10">
            <h2
              className="text-4xl text-center sm:text-6xl mb-5 lg:mb-10 font-bold text-white lg:leading-17 font-serif"
              style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 1px 0 #000',
                opacity: showHeading ? 1 : 0,
                transform: showHeading ? 'translateY(0)' : 'translateY(32px)',
                transition: 'opacity 0.5s, transform 0.5s',
              }}
            >
              {headingText}
            </h2>
          <p
            className="text-xs sm:text-sm md:text-xl text-center"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 1px 0 #000',
              opacity: showDesc ? 1 : 0,
              transform: showDesc ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.5s, transform 0.5s',
            }}
          >
            Kasbiy ta'lim tizimini rivojlantirish va metodik ta'minlash bo‘yicha
          yagona integrator
          </p>
          <Divider color="white" />
         </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-10 z-20">
            {[
              {
                icon: <FaChalkboardTeacher size={32} className="text-info" />,
                desc: "Boshlang‘ich kasbiy ta’lim"
              },
              {
                icon: <FaGraduationCap size={32} className="text-info" />,
                desc: "O'rta kasbiy ta'lim"
              },
              {
                icon: <FaStar size={32} className="text-info" />,
                desc: "O‘rta maxsus kasbiy ta’lim"
              },
              {
                icon: <FaVideo size={32} className="text-info" />,
                desc: "Media materiallar"
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="backdrop-blur-md bg-white/60 dark:bg-white/15 rounded-xl shadow-lg p-3 lg:p-4 sm:p-5 flex flex-col gap-2 items-center w-full lg:max-w-[180px] border border-white/40"
                style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}
              >
                <div className="mb-2">{card.icon}</div>
                <div className="mb-1 text-center">
                  <span className="text-xl lg:text-2xl font-bold text-white">
                    {cardNumbers[idx]} ta
                  </span>
                </div>
                <div className="text-sm italic text-gray-800 dark:text-white/70 text-center font-medium">{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/10 via-primary/5 to-transparent " />
    </section>
      {/* <section
      className={`relative w-full h-screen flex items-center px-5 ${
        theme === "light" ? "text-neutral-content" : ""
      }`}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="
      absolute inset-0
      w-full h-full
      object-cover
      brightness-80
      contrast-95
      saturate-70
      hue-rotate-[200deg]
      hidden
      sm:block
    "
      >
        <source src="/video_fon.mp4" type="video/mp4" />
      </video>
      <img
        src="/bg_mobile.jpg"
        alt=""
        className="absolute inset-0
      w-full h-full
      object-cover sm:hidden"
      />
      <div
        className={`absolute inset-0 w-full h-screen pointer-events-none z-10 ${
          theme === "light"
            ? // ? "bg-gradient-to-b from-[#0E3A8A]/85 via-[#1E4FD8]/70 to-[#2563EB]/85"
              "bg-gradient-to-b from-[#002d6d]/85 via-[#002d6d]/70 to-[#002d6d]/85"
            : "bg-gradient-to-b from-base-100/90 via-base-100/90 to-base-200/90"
        }`}
      />
      <div className="xl:max-w-3/4 w-full text-center xl:text-start px-12 xl:px-48 z-20">
        <h2 className="text-2xl lg:text-6xl mb-5 lg:mb-10 font-bold text-white lg:leading-17">
          Metodik ta’minlash yagona axborot-ta’lim portali
        </h2>
        <p className="text-xs lg:text-xl">
          Kasbiy ta'lim tizimini rivojlantirish va metodik ta'minlash bo‘yicha
          yagona integrator
        </p>
        <Divider color="white" />
        <div className="flex justify-center xl:justify-start gap-5">
          {theme == "light" ? (
            <button className="btn btn-outline btn-dash btn-sm lg:btn-md flex gap-2 items-center">
              {" "}
              <FaGooglePlay /> Video yo‘riqnoma
            </button>
          ) : (
            <button className="btn btn-outline btn-primary btn-sm lg:btn-md flex gap-2 items-center">
              {" "}
              <FaGooglePlay /> Video yo‘riqnoma
            </button>
          )}
        </div>
      </div>
      <div className="hidden xl:block absolute right-5 h-full py-5 pt-32 z-20">
        {theme == "night" ? (
          <img
            className={`h-full object-contain brightness-65 contrast-95 saturate-65`}
            src="/bilib_soha_banner.png"
            alt=""
          />
        ) : (
          <img
            className={`h-full object-contain brightness-95 contrast-95 saturate-95`}
            src="/bilib_soha_banner.png"
            alt=""
          />
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/10 via-primary/5 to-transparent " />
    </section> */}
    </>
  );
}

export default HomeHero;
