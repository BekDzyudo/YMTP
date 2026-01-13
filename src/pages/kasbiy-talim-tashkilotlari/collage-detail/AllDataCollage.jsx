import React from "react";
import { useParams } from "react-router-dom";
import useGetFetch from "../../../hooks/useGetFetch";
import { FaKitchenSet, FaMapLocation } from "react-icons/fa6";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import Divider from "../../../components/Dvider";
import { TbChartArcs, TbHomeCheck } from "react-icons/tb";
import { GrDatabase } from "react-icons/gr";
import { PiBuildingApartment } from "react-icons/pi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FiPieChart } from "react-icons/fi";
import { MdOutlineAddHomeWork, MdOutlineBedroomParent, MdOutlineMeetingRoom } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { IoBuildOutline } from "react-icons/io5";

function AllDataCollage() {
  const { collageId, Id } = useParams();
  const { theme } = useGlobalContext();
  const {
    data: collage,
    isPending,
    error,
  } = useGetFetch(`${import.meta.env.VITE_BASE_URL}/college-detail/${Id}`);
  return (
    <div className="w-full">
      {isPending && (
        <span className="loading loading-ring loading-xl sm:w-24 w-10 sm:h-24 h-10 absolute sm:left-1/2 left-1/2 sm:top-1/3 top-1/4"></span>
      )}
      {error && <div>{error}</div>}
      {collage && (
        <div
          className={`p-3 md:p-5 rounded-md ${
            theme == "night" ? "bg-gray-700" : "bg-slate-300"
          }`}
        >
          <div className="flex items-center gap-3 md:gap-5 pb-2 md:pb-5 border-gray-500 border-b-1">
            <div className="flex items-center gap-2 md:gap-5 pr-2 md:pr-5 border-r-2">
              <FaMapLocation className="text-3xl md:text-5xl text-primary" />
              <p className="text-sm md:text-xl font-bold md:uppercase">
                Manzil
              </p>
            </div>
            <h3 className="text-center w-full text-sm md:text-xl font-bold">
              Toshkent shahar, Olmazor tumani, Yangi beltepa MFY, Beltepa
              ko‘chasi, 10-uy
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 pt-5 gap-4 sm:gap-5 md:gap-10">
            <div className="border border-base-300 rounded flex gap-3 sm:gap-5 items-center p-2 sm:p-3">
              <div
                className="rounded flex justify-center items-center p-2 w-12 sm:w-16 sm:h-14 h-11"
                style={{ background: "#326695" }}
              >
                <TbHomeCheck className="text-white text-3xl sm:text-4xl" />
              </div>
              <div>
                <p className="text-secondary font-bold text-sm md:text-lg">
                  Foydalanishga topshirilgan yili:
                </p>
                <p className="font-bold text-primary text-md md:text-xl">
                  2019 - yil
                </p>
              </div>
            </div>
            <div className="border border-base-300 rounded flex gap-3 sm:gap-5 items-center p-2 sm:p-3">
              <div
                className="rounded flex justify-center items-center p-2 w-12 sm:w-16 sm:h-14 h-11"
                style={{ background: "#326695" }}
              >
                <GrDatabase className="text-white text-3xl sm:text-4xl" />
              </div>
              <div>
                <p className="text-secondary font-bold text-sm md:text-lg">
                  Quvvati:
                </p>
                <p className="font-bold text-primary text-md md:text-xl">
                  330 o‘rinli
                </p>
              </div>
            </div>
            <div className="border border-base-300 rounded flex gap-3 sm:gap-5 items-center p-2 sm:p-3">
              <div
                className="rounded flex justify-center items-center p-2 w-12 sm:w-16 sm:h-14 h-11"
                style={{ background: "#326695" }}
              >
                <AiOutlineUsergroupAdd className="text-white text-3xl sm:text-4xl" />
              </div>
              <div>
                <p className="text-secondary font-bold text-sm md:text-lg">
                  O‘quvchilar soni:
                </p>
                <p className="font-bold text-primary text-md md:text-xl">
                  633 ta
                </p>
              </div>
            </div>
            <div className="border border-base-300 rounded flex gap-3 sm:gap-5 items-center p-2 sm:p-3">
              <div
                className="rounded flex justify-center items-center p-2 w-12 sm:w-16 sm:h-14 h-11"
                style={{ background: "#326695" }}
              >
                <PiBuildingApartment className="text-white text-3xl sm:text-4xl" />
              </div>
              <div>
                <p className="text-secondary font-bold text-sm md:text-lg">
                  Binolar soni:
                </p>
                <p className="font-bold text-primary text-md md:text-xl">
                   15 ta
                </p>
              </div>
            </div>
            <div className="border border-base-300 rounded flex gap-3 sm:gap-5 items-center p-2 sm:p-3">
              <div
                className="rounded flex justify-center items-center p-2 w-12 sm:w-16 sm:h-14 h-11"
                style={{ background: "#326695" }}
              >
                <FiPieChart className="text-white text-3xl sm:text-4xl" />
              </div>
              <div>
                <p className="text-secondary font-bold text-sm md:text-lg">
                 Yer maydoni:
                </p>
                <p className="font-bold text-primary text-md md:text-xl">
                  2.14 gektar
                </p>
              </div>
            </div>
            <div className="border border-base-300 rounded flex gap-3 sm:gap-5 items-center p-2 sm:p-3">
              <div
                className="rounded flex justify-center items-center p-2 w-12 sm:w-16 sm:h-14 h-11"
                style={{ background: "#326695" }}
              >
                <TbChartArcs className="text-white text-3xl sm:text-4xl" />
              </div>
              <div>
                <p className="text-secondary font-bold text-sm md:text-lg">
                  O‘quv maydoni:
                </p>
                <p className="font-bold text-primary text-md md:text-xl">
                  3061 M.KV
                </p>
              </div>
            </div>
            <div className="border border-base-300 rounded flex gap-3 sm:gap-5 items-center p-2 sm:p-3">
              <div
                className="rounded flex justify-center items-center p-2 w-12 sm:w-16 sm:h-14 h-11"
                style={{ background: "#326695" }}
              >
                <MdOutlineMeetingRoom className="text-white text-3xl sm:text-4xl" />
              </div>
              <div>
                <p className="text-secondary font-bold text-sm md:text-lg">
                  O‘quv xonalari soni:
                </p>
                <p className="font-bold text-primary text-md md:text-xl">
                  26 ta
                </p>
              </div>
            </div>
            <div className="border border-base-300 rounded flex gap-3 sm:gap-5 items-center p-2 sm:p-3">
              <div
                className="rounded flex justify-center items-center p-2 w-12 sm:w-16 sm:h-14 h-11"
                style={{ background: "#326695" }}
              >
                <MdOutlineBedroomParent className="text-white text-3xl sm:text-4xl" />
              </div>
              <div>
                <p className="text-secondary font-bold text-sm md:text-lg">
                  Yotoqxona:
                </p>
                <p className="font-bold text-primary text-md md:text-xl">
                  Mavjud emas
                </p>
              </div>
            </div>
            <div className="border border-base-300 rounded flex gap-3 sm:gap-5 items-center p-2 sm:p-3">
              <div
                className="rounded flex justify-center items-center p-2 w-12 sm:w-16 sm:h-14 h-11"
                style={{ background: "#326695" }}
              >
                <CgGym className="text-white text-3xl sm:text-4xl" />
              </div>
              <div>
                <p className="text-secondary font-bold text-sm md:text-lg">
                  Sport zal:
                </p>
                <p className="font-bold text-primary text-md md:text-xl">
                  18x36 M (648 KV.M)
                </p>
              </div>
            </div>
            <div className="border border-base-300 rounded flex gap-3 sm:gap-5 items-center p-2 sm:p-3">
              <div
                className="rounded flex justify-center items-center p-2 w-12 sm:w-16 sm:h-14 h-11"
                style={{ background: "#326695" }}
              >
                <FaKitchenSet className="text-white text-3xl sm:text-4xl" />
              </div>
              <div>
                <p className="text-secondary font-bold text-sm md:text-lg">
                  Oshxona:
                </p>
                <p className="font-bold text-primary text-md md:text-xl">
                  60 o‘rinli
                </p>
              </div>
            </div>
            <div className="border border-base-300 rounded flex gap-3 sm:gap-5 items-center p-2 sm:p-3">
              <div
                className="rounded flex justify-center items-center p-2 w-12 sm:w-16 sm:h-14 h-11"
                style={{ background: "#326695" }}
              >
                <MdOutlineAddHomeWork className="text-white text-3xl sm:text-4xl" />
              </div>
              <div>
                <p className="text-secondary font-bold text-sm md:text-lg">
                  Ishlab chiqarish ustaxonasi:
                </p>
                <p className="font-bold text-primary text-md md:text-xl">
                  Mavjud emas
                </p>
              </div>
            </div>
            <div className="border border-base-300 rounded flex gap-3 sm:gap-5 items-center p-2 sm:p-3">
              <div
                className="rounded flex justify-center items-center p-2 w-12 sm:w-16 sm:h-14 h-11"
                style={{ background: "#326695" }}
              >
                <IoBuildOutline className="text-white text-3xl sm:text-4xl" />
              </div>
              <div>
                <p className="text-secondary font-bold text-sm md:text-lg">
                  So‘ngi tamirlangan yili:
                </p>
                <p className="font-bold text-primary text-md md:text-xl">
                  2023 - yil
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllDataCollage;
