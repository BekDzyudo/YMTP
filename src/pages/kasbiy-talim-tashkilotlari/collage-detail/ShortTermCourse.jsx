import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../hooks/useGlobalContext';
import useGetFetch from '../../../hooks/useGetFetch';
import { MdReportGmailerrorred } from 'react-icons/md';

function ShortTermCourse() {

    const { Id } = useParams();
  const { theme } = useGlobalContext();
  const {
    data: ShortTermCourses,
    isPending,
    error,
  } = useGetFetch(`${import.meta.env.VITE_BASE_URL}/qisqa-muddatli-kurslar`);
  

  return (
     <div className="w-full">
      {isPending && (
        <span className="loading loading-ring loading-xl sm:w-24 w-10 sm:h-24 h-10 absolute sm:left-1/2 left-1/2 sm:top-1/3 top-1/4"></span>
      )}
      {error && <div>{error}</div>}
      {ShortTermCourses ? (
        <div
          className={`p-3 md:p-5 rounded-md ${
            theme == "night" ? "bg-gray-700" : "bg-slate-300"
          }`}
        >
        <h1 className='font-bold '>Qisqa muddatli kurslar <span className='text-primary font-bold rounded ml-2 px-3 py-0.5 bg-base-300'>{ShortTermCourses.length}</span></h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 pt-5 gap-4 sm:gap-5 md:gap-10 xl:gap-5">
            {ShortTermCourses?.map((course, index) => {
              return (
                <Link
                  to={`${course.id}`}
                  key={course.id}
                  className={`border ${
                    theme == "night"
                      ? "bg-gray-800 border-gray-500"
                      : "bg-slate-400 border-slate-500"
                  } group p-4 rounded-2xl`}
                >
                  <div className="h-36 mb-2">
                    <img
                      src={course.image}
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
                    <h3 className="text-center font-semibold">
                      {course.name}
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

export default ShortTermCourse