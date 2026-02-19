import React from 'react'
import { IoMailUnreadOutline } from "react-icons/io5";
import { PiTelegramLogoLight } from "react-icons/pi";
import { GrLanguage } from "react-icons/gr";
import { FaPhone } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../hooks/useGlobalContext';

function Footer() {
    const {theme} = useGlobalContext()
  return (
    <div className="bg-linear-to-r from-[#002d6d] via-[#003d7d] to-[#002d6d] w-full py-5 px-5">
      <div className="grid grid-cols-1 gap-4 md:gap-0 md:grid-cols-3 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12 pb-5">
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
            <Link to="https://t.me/ipi_uz" className='text-sm md:text-base text-white hover:text-cyan-300 transition-colors'>profedu.uz</Link>
          </div>
         </div>
        </div>
        <div className="flex justify-start md:justify-center">
         <div className='flex flex-col gap-4'>
           <div>
            <p className="font-bold text-cyan-400 flex items-center gap-3">
              <IoMailUnreadOutline className="md:text-xl text-[16px]" /> Email
            </p>
            <p className='text-sm md:text-base text-white'>pedagoginnovatsiyalar@edu.uz</p>
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