import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../hooks/useGlobalContext';
import useGetFetch from '../../../hooks/useGetFetch';
import { MdReportGmailerrorred } from 'react-icons/md';
import { FaUser } from 'react-icons/fa6';
import { GiMaterialsScience } from 'react-icons/gi';

function TeachersCollage() {

    const { Id } = useParams();
  const { theme } = useGlobalContext();
  const {
    data: teachers,
    isPending,
    error,
  } = useGetFetch(`${import.meta.env.VITE_BASE_URL}/pedagoklar/${Id}`);
  

  return (
     <div className="w-full">
      {isPending && (
        <span className="loading loading-ring loading-xl sm:w-24 w-10 sm:h-24 h-10 absolute sm:left-1/2 left-1/2 sm:top-1/3 top-1/4"></span>
      )}
      {error && <div>{error}</div>}
      {teachers ? (
        <div
          className={`p-3 md:p-5 rounded-md ${
            theme == "night" ? "bg-gray-700" : "bg-slate-300"
          }`}
        >
          <h1 className='font-bold '>Pedagoglar <span className='text-primary font-bold rounded ml-2 px-3 py-0.5 bg-base-300'>{teachers.length}</span></h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-5 gap-4 sm:gap-5 md:gap-10">
            {teachers?.map((item, index) => {
              return (
                <Link
                  key={index}
                  className={`border ${
                    theme == "night"
                      ? "bg-gray-800 border-gray-500"
                      : "bg-slate-400 border-slate-500"
                  } group p-4 rounded-2xl`}
                >
                  <div className="h-36 mb-2">
                    <img
                      src={item.image}
                      alt=""
                      className="rounded-t-lg h-full w-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <div className={`relative`}>
                    <div
                      className="h-[1px] w-full"
                      style={{
                        background: `linear-gradient(to right, transparent, ${
                          theme == "night" ? "orange" : "blue"
                        }, transparent)`,
                        opacity: 0.6,
                      }}
                    />
                  </div>
                  <div className="mt-2">
                    <h4 className='flex items-center gap-2 justify-end mb-2'>Reyting: <span className='bg-base-300 px-3 py-1 rounded'><span className='font-bold text-amber-600'>{item.rate}</span>/ <span className='text-primary font-bold'>50</span></span></h4>
                    <h3 className="font-semibold flex items-center gap-2 md:gap-3 mb-2">
                     <FaUser className='text-md md:text-xl'/> {item.last_name + " " + item.first_name}
                    </h3>
                    <h3 className="font-semibold flex items-center gap-2 md:gap-3 leading-5">
                     <GiMaterialsScience className='text-md md:text-xl'/> Axborot texnologiyalari asoslari
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-primary text-sm sm:text-2xl font-bold text-center w-full opacity-90 absolute left-0 top-40 sm:top-52 flex justify-center">
          <div className="flex items-center gap-3">
            <MdReportGmailerrorred className="text-2xl sm:text-5xl" />{" "}
            <p>Malumot kiritilmagan</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeachersCollage