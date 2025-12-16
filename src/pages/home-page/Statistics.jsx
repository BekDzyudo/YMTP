import React from "react";
import { IoDocumentsOutline } from "react-icons/io5";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { LuBookCopy } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";

function Statistics() {
  return (
    <section className="px-3.5 sm:px-5 mx-auto w-full 2xl:w-10/12 my-36 flex justify-center">
      <div className="stats shadow-md bg-base-200 border-base-300 border">
        <div className="stat">
          <div className="stat-figure text-primary">
            <IoDocumentsOutline className="h-8 w-8"/>
          </div>
          <div className="stat-value text-3xl mb-2">450</div>
          <div className="stat-desc text-lg">O‘quv meyoriy hujjatlar</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-primary">
            <LuBookCopy className="h-8 w-8"/>
          </div>
          <div className="stat-value text-3xl mb-2">4,200</div>
          <div className="stat-desc text-lg">O‘quv adabiyotlari</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-primary">
            <HiOutlineClipboardDocumentList className="h-8 w-8"/>
          </div>
          <div className="stat-value text-3xl mb-2">1,200</div>
          <div className="stat-desc text-lg">O‘qitish materiallari to‘plami</div>
        </div>
          <div className="stat">
          <div className="stat-figure text-primary">
           <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div className="stat-value text-3xl mb-2">137</div>
          <div className="stat-desc text-lg">Qisqa muddatli kurslar</div>
        </div>
         <div className="stat">
          <div className="stat-figure text-primary">
            <PiUsersThree className="w-8 h-8"/>
          </div>
          <div className="stat-value text-3xl mb-2">5,602</div>
          <div className="stat-desc text-lg">Foydalanuvchilar soni</div>
        </div>
      </div>
    </section>
  );
}

export default Statistics;
