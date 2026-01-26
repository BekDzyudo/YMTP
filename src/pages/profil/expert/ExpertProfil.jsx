import React, { useContext } from 'react'
import useGetFetchProfile from '../../../hooks/useGetFetchProfile';
import { AuthContext } from '../../../context/AuthContext';
import { TiMessages } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../../hooks/useGlobalContext';

function ExpertProfil() {

    const {userData} = useContext(AuthContext)
    const { theme } = useGlobalContext();

     const { data: Materiallar } = useGetFetchProfile(
    `${import.meta.env.VITE_BASE_URL}/birlashma/metodist/${
      userData?.userId
    }`
  );
  console.log(Materiallar);
  

  return (
    <section className="relative mt-28 md:mt-35 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-10/12">
          <div
            className={`p-3 md:p-5 rounded-md ${
              theme == "night" ? "bg-gray-700" : "bg-slate-300"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="table text-[12px] md:text-[15px] lg:text-[17px] text-center">
                {/* head */}
                <thead className="bg-base-300">
                  <tr className="uppercase font-bold text-[12px] md:text-[14px] lg:text-[16px]">
                    <th>№</th>
                    <th>Fan nomi</th>
                    <th>Material turi</th>
                    <th>Holati</th>
                    <th>ko'rish</th>
                  </tr>
                </thead>
                <tbody>
                  {Materiallar?.results?.map((item, index) => {
                    return (
                      <tr key={item.id} className="">
                        <td className="font-bold">{index + 1}</td>
                        <td>{item.fan?.name}</td>
                        <td>{item.kategoriya_material?.name}</td>
                        <td className="">
                          {item.holat == "yangi" && (
                            <div className="flex justify-center">
                              <span className="badge bg-blue-500 border-0 badge-md min-w-22 sm:min-w-24 text-black">
                                Yangi
                              </span>
                            </div>
                          )}
                          {item.holat == "rad_etildi" && (
                            <div className="flex justify-center">
                              <span className="badge bg-red-500 border-0 badge-md min-w-22 sm:min-w-24 text-black">
                                Rad etildi
                              </span>
                            </div>
                          )}
                          {item.holat == "tasdiqlandi" && (
                            <div className="flex justify-center">
                              <span className="badge bg-green-600 badge-md border-0 min-w-22 sm:min-w-24 text-black">
                                Tasdiqlandi
                              </span>
                            </div>
                          )}
    
                          <div className="text-[12px] sm:text-sm text-center opacity-70">
                            {new Date(item.created_at).getDate() < 10
                              ? "0" + new Date(item.created_at).getDate()
                              : new Date(item.created_at).getDate()}
                            .{new Date(item.created_at).getMonth() + 1}.
                            {new Date(item.created_at).getFullYear()}
                          </div>
                        </td>
                        <td>
                          <Link
                            // to={item.file}
                            target="_blanck"
                            className="link text-sm md:text-lg flex items-center justify-center hover:text-primary"
                          >
                            <div
                            className="indicator"
                          >
                            <span className="indicator-item badge badge-sm badge-primary text-sm">
                            {item.count_not_read}
                            </span>
                            <button className="btn btn-sm md:btn-md bg-none">
                              Kirish <TiMessages className="text-xl" />
                            </button>
                          </div>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
  )
}

export default ExpertProfil