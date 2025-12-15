import React, { useEffect, useState } from "react";
import Divider from "../../components/Dvider";
import { FaGooglePlay } from "react-icons/fa";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useHero } from "../../context/HeroContext";

function HomeHero() {

 const { theme } = useGlobalContext();
  const { setOnHero } = useHero();

  useEffect(() => {
    const onScroll = () => {
      setOnHero(window.scrollY < window.innerHeight);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
     <div
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
      <img src="/bg_mobile.jpg" alt="" className="absolute inset-0
      w-full h-full
      object-cover sm:hidden"/>
      <div
        className={`fixed top-0 left-0 w-full h-screen pointer-events-none z-10 ${
          theme === "light"
            ? "bg-gradient-to-b from-[#0E3A8A]/85 via-[#1E4FD8]/70 to-[#2563EB]/85"
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
              <FaGooglePlay /> Videoni ko‘rish
            </button>
          ) : (
            <button className="btn btn-outline btn-primary btn-sm lg:btn-md flex gap-2 items-center">
              {" "}
              <FaGooglePlay /> Videoni ko‘rish
            </button>
          )}

          <button className="btn btn-info btn-sm lg:btn-md">Batafsil</button>
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
    </div>
  )
}

export default HomeHero