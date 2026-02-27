import React from 'react'
import { IoMailUnreadOutline } from "react-icons/io5";
import { PiTelegramLogoLight } from "react-icons/pi";
import { GrLanguage } from "react-icons/gr";
import { FaPhone } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

function Footer() {
    const {theme} = useGlobalContext()
    
    const usefulLinks = [
      { title: "O'zbekiston Respublikasi Prezidenti rasmiy veb-sayti", url: "https://president.uz/uz", logo: "/gerb.png" },
      { title: "Oliy ta'lim, fan va innovatsiyalar vazirligi", url: "https://gov.uz/oz/edu", logo: "/oliytalimvazirligi.png" },
      { title: "Kasbiy ta'lim agentligi", url: "https://gov.uz/oz/kasbiytalim", logo: "/gerb.png" },
      { title: "O'zbekiston Respublikasi Yagona interaktiv davlat xizmatlari portali", url: "https://my.gov.uz/uz", logo: "/mygov.png" },
      { title: "O'zbekiston Respublikasi Qonunchilik ma'lumotlari milliy bazasi", url: "https://lex.uz/", logo: "/lex_uz.svg" },
    ];
    
  return (
    <div className="bg-linear-to-r from-[#002d6d] via-[#003d7d] to-[#002d6d] w-full py-5 px-5 relative mt-20">
      
      {/* Foydali havolalar carousel - yarmi header ustida */}
      {/* <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-full xl:w-full 2xl:w-11/12 px-5">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">          
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            speed={800}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1440: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="useful-links-swiper"
          >
            {usefulLinks.map((link, index) => (
              <SwiperSlide key={index}>
                <Link 
                  to={link.url} 
                  target="_blank"
                  className="group block rounded-xl p-4 hover:shadow-lg transition-all duration-300 h-full"
                >
                  <div className="flex flex-col items-center gap-4 h-full">
                    {link.logo && (
                      <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                        <img 
                          src={link.logo} 
                          alt={link.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <h4 className="font-semibold text-center text-gray-800 group-hover:text-[#002d6d] transition-colors text-sm sm:text-base">
                      {link.title}
                    </h4>
                    <button className="relative text-sm md:text-base text-[#002d6d] rounded-lg p-[2px] bg-gradient-to-r from-cyan-400 via-[#003d7d] to-cyan-400 transition-all duration-300 hover:shadow-lg">
                      <span className="bg-white hover:bg-transparent rounded-[6px] px-4 py-2 flex items-center gap-2 transition-all duration-300">
                        my.gov.uz
                        <HiOutlineExternalLink className="text-lg" />
                      </span>
                    </button>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div> */}

      <div className="grid grid-cols-1 gap-4 md:gap-0 md:grid-cols-3 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12 pb-5 pt-5">
        <div className="flex justify-start md:justify-center">
        <div className="flex items-center gap-3">
            <img
              src="/new_logo_white.png"
              alt="logo"
              className="w-12 xl:w-20 sm:w-16"
            />
          <h4 className="font-semibold xl:text-[16px] lg:text-[16px] text-[14px] text-white">
            Kasbiy ta'limni <br />
            rivojlantirish <br />
            instituti
          </h4>
        </div>
        </div>
        <div className="flex justify-start md:justify-center">
         <div className='flex flex-col gap-4'>
           <div>
            <p className="font-bold text-cyan-400 flex items-center gap-3">
              <FaPhone className="md:text-xl text-[16px]" /> Telefon
            </p>
            <p className='text-sm md:text-base text-white'>+99871 246 90 37</p>
          </div>
          <div>
            <p className="font-bold text-cyan-400 flex items-center gap-3">
              <PiTelegramLogoLight className="md:text-xl text-[16px]" /> Telegram
            </p>
            <Link to="https://t.me/ipi_uz" className='text-sm md:text-base text-white hover:text-cyan-300 transition-colors'>ktri.uz</Link>
          </div>
         </div>
        </div>
        <div className="flex justify-start md:justify-center">
         <div className='flex flex-col gap-4'>
           <div>
            <p className="font-bold text-cyan-400 flex items-center gap-3">
              <IoMailUnreadOutline className="md:text-xl text-[16px]" /> Email
            </p>
            <p className='text-sm md:text-base text-white'>kasbiytalim@edu.uz</p>
          </div>
          <div>
            <p className="font-bold text-cyan-400 flex items-center gap-3">
              <GrLanguage className="md:text-xl text-[16px]" /> Rasmiy web-sayt
            </p>
            <Link to="https://ipitvet.uz/uz/" className='text-sm md:text-base text-white hover:text-cyan-300 transition-colors'>https://ipitvet.uz/</Link>
          </div>
         </div>
        </div>
      </div>
      <div className="border-t border-white/20 pt-2 flex justify-center">
        <p className="xl:w-full 2xl:w-11/12 text-center text-sm md:text-[16px] text-white/80">
          Barcha huquqlar himoyalangan. Saytdan olingan barcha ma’lumotlar
          chop etilganda veb-saytga havola qilish majburiy
        </p>
      </div>
    </div>
  )
}

export default Footer