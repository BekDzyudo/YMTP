import React from "react";
import Dvider from "../components/Dvider"
import { FaGooglePlay } from "react-icons/fa";

function Home() {
  return (
  <div className="relative w-full h-[calc(100vh-72px)] sm:h-[calc(100vh-95px)] xl:h-[calc(100vh-107px)] flex items-center px-5">
    <div className="xl:max-w-2/3 w-full text-center xl:text-start px-12 xl:px-48 z-10">
      <h2 className="text-2xl lg:text-5xl mb-5 lg:mb-10 font-bold text-white lg:leading-15">Yagona metodik ta'minlash platformasi</h2>
      <p className="text-xs lg:text-xl">Kasbiy ta'lim tizimini rivojlantirish va metodik ta'minlash bo‘yicha yagona integrator</p>
      <Dvider/>
      <div className="flex justify-center xl:justify-start gap-5">
        <button className="btn btn-outline btn-primary btn-sm lg:btn-md flex gap-2 items-center"> <FaGooglePlay/> Videoni ko‘rish</button>
        <button className="btn btn-info btn-sm lg:btn-md">Batafsil</button>
      </div>
    </div>
  <div className="hidden xl:block absolute right-5 h-full py-5">
    <img
      className="h-full object-contain brightness-65 contrast-95 saturate-65"
      src="/bilib_soha_banner.png"
      alt=""
    />
  </div>
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/10 via-primary/5 to-transparent " />
</div>
  );
}

export default Home;
