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
    <div className="bg-base-300 w-full py-5 px-5">
      <div className="grid grid-cols-1 gap-4 md:gap-0 md:grid-cols-3 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12 pb-5">
        <div className="flex justify-start md:justify-center">
        <div className="flex items-center gap-3">
            {theme == "night" && (
            <img
              src="/new_logo_white.png"
              alt="logo"
              className="w-16 xl:w-20"
            />
          )}
          {theme == "light" && (
            <img
              src="/new_logo_blue.png"
              alt="logo"
              className="w-12 xl:w-20 sm:w-16"
            />
          )}
          <h4 className={`font-semibold xl:text-[16px] lg:text-[16px] text-[14px]`}>
            Kasbiy ta'limni <br />
            rivojlantirish <br />
            instituti
          </h4>
        </div>
        </div>
        <div className="flex justify-start md:justify-center">
         <div className='flex flex-col gap-4'>
           <div>
            <p className="font-bold text-primary flex items-center gap-3">
              <FaPhone className="md:text-xl text-[16px]" /> Telefon
            </p>
            <p className='text-sm md:text-base'>+99871 246 90 37</p>
          </div>
          <div>
            <p className="font-bold text-primary flex items-center gap-3">
              <PiTelegramLogoLight className="md:text-xl text-[16px]" /> Telegram
            </p>
            <Link to="https://t.me/ipi_uz" className='text-sm md:text-base'>profedu.uz</Link>
          </div>
         </div>
        </div>
        <div className="flex justify-start md:justify-center">
         <div className='flex flex-col gap-4'>
           <div>
            <p className="font-bold text-primary flex items-center gap-3">
              <IoMailUnreadOutline className="md:text-xl text-[16px]" /> Email
            </p>
            <p className='text-sm md:text-base'>pedagoginnovatsiyalar@edu.uz</p>
          </div>
          <div>
            <p className="font-bold text-primary flex items-center gap-3">
              <GrLanguage className="md:text-xl text-[16px]" /> Rasmiy web-sayt
            </p>
            <Link to="https://ipitvet.uz/uz/" className='text-sm md:text-base'>https://ipitvet.uz/</Link>
          </div>
         </div>
        </div>
      </div>
      <div className="border-t border-gray-600 pt-2 flex justify-center">
        <p className="xl:w-full 2xl:w-11/12 text-center text-sm md:text-[16px]">
          Barcha huquqlar himoyalangan. Saytdan olingan barcha ma’lumotlar
          chop etilganda veb-saytga havola qilish majburiy
        </p>
      </div>
    </div>
  )
}

export default Footer