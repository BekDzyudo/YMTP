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
    <div className="bg-base-300 w-full py-5 mt-20 px-5">
      <div className="grid grid-cols-3 2xl:w-[1536px] xl:w-[1280px] mr-auto ml-auto pb-5">
        <div className="flex items-center gap-3">
          {theme == "night" && (
            <img
              src="/new_logo_white.png"
              alt="logo"
              className="w-12 xl:w-20 sm:w-16"
            />
          )}
          {theme == "light" && (
            <img
              src="/new_logo_blue.png"
              alt="logo"
              className="w-12 xl:w-20 sm:w-16"
            />
          )}
          <h4 className={`font-semibold xl:text-[16px] lg:text-[14px] sm:text-[12px] text-[10px]`}>
            Kasbiy ta'limni <br />
            rivojlantirish <br />
            instituti
          </h4>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-bold text-primary flex items-center gap-3">
              <FaPhone className="text-xl" /> Telefon
            </p>
            <p>+99871 246 90 37</p>
          </div>
          <div>
            <p className="font-bold text-primary flex items-center gap-3">
              <PiTelegramLogoLight className="text-xl" /> Telegram
            </p>
            <Link to="https://t.me/ipi_uz">profedu.uz</Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-bold text-primary flex items-center gap-3">
              <IoMailUnreadOutline className="text-xl" /> Email
            </p>
            <p>pedagoginnovatsiyalar@edu.uz</p>
          </div>
          <div>
            <p className="font-bold text-primary flex items-center gap-3">
              <GrLanguage className="text-xl" /> Rasmiy web-sayt
            </p>
            <Link to="https://ipitvet.uz/uz/">https://ipitvet.uz/</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-600 pt-2 flex justify-center">
        <p className="2xl:w-[1536px] xl:w-[1280px]">
          2025. Barcha huquqlar himoyalangan. Saytdan olingan barcha ma’lumotlar
          chop etilganda veb-saytga havola qilish majburiy
        </p>
      </div>
    </div>
  )
}

export default Footer