import React from "react";
import useGetFetch from "../../hooks/useGetFetch";
import Divider from "../../components/Dvider";
import { FaSearch } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";

function Rating() {
  const {
    data: reyting,
    isPending,
    error,
  } = useGetFetch(`${import.meta.env.VITE_BASE_URL}/reyting_app/reyting/`);

  return (
    <section className="relative mt-24 md:mt-35 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12">
      {isPending && (
        <span className="loading loading-ring loading-xl sm:w-24 w-10 sm:h-24 h-10 absolute sm:left-1/2 left-1/2 sm:top-1/3 top-1/4"></span>
      )}
      {error && <div>{error}</div>}
      {reyting?.results && (
        <>
          <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-10">
            Fan o‘qituvchilari reytingi
          </h2>
          <div className="flex gap-5 md:hidden mb-6">
            <div className="drawer">
              <input
                id="my-drawer-1"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer-1"
                  className="btn btn-primary btn-sm drawer-button"
                >
                  Filtr <FaSearch />
                </label>
              </div>
              <div className="drawer-side mt-20 sm:mt-25 lg:m-0">
                <label
                  htmlFor="my-drawer-1"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4 gap-2 text-sm">
                  <li>
                    <select defaultValue="" className="select outline-0">
                      <option value="" disabled={true}>
                        O‘quv yili
                      </option>
                      <option value="">2023</option>
                      <option value="">2024</option>
                      <option value="">2025</option>
                    </select>
                  </li>
                  <li>
                    <select defaultValue="" className="select outline-0">
                      <option disabled={true} value="">
                        Ta'lim darajasi
                      </option>
                      <option value="">3 darajasi</option>
                      <option value="">4 darajasi</option>
                      <option value="">5 darajasi</option>
                    </select>
                  </li>
                  <li>
                    <select defaultValue="" className="select outline-0">
                      <option value="" disabled={true}>
                        Bilim sohasi
                      </option>
                      <option value="">ta'lim sohasi</option>
                      <option value="">xavfsizlik sohasi</option>
                    </select>
                  </li>
                  <li>
                    <select defaultValue="" className="select outline-0">
                      <option value="" disabled={true}>
                        Ta'lim sohasi
                      </option>
                      <option value="">qishloq xo'jaligi</option>
                    </select>
                  </li>
                  <li>
                    <select defaultValue="" className="select outline-0">
                      <option value="" disabled={true}>
                        Ta'lim yo'nalish
                      </option>
                      <option value="" disabled={true}>
                        Ta'lim yo'nalish
                      </option>
                    </select>
                  </li>
                  <li>
                    <select defaultValue="" className="select outline-0">
                      <option value="" disabled={true}>
                        Kasb va mutaxasislik
                      </option>
                      <option value="">Kasb va mutaxasislik</option>
                      <option value="">Kasb va mutaxasislik</option>
                    </select>
                  </li>
                  <li>
                    <select defaultValue="" className="select outline-0">
                      <option value="" disabled={true}>
                        Fanlar
                      </option>
                      <option value="">Fanlar</option>
                      <option value="">Fanlar</option>
                    </select>
                  </li>
                </ul>
              </div>
            </div>
            <button className="btn btn-success btn-sm">
              Filtrni tozalash <GrClearOption />
            </button>
          </div>
          <div className="hidden gap-4 mb-10 border px-2 py-3 rounded-lg md:flex">
            <select defaultValue="" className="select">
              <option value="" disabled={true}>
                O‘quv yili
              </option>
              <option value="">2023</option>
              <option value="">2024</option>
              <option value="">2025</option>
            </select>
            <select defaultValue="" className="select">
              <option disabled={true} value="">
                Ta'lim darajasi
              </option>
              <option value="">3 darajasi</option>
              <option value="">4 darajasi</option>
              <option value="">5 darajasi</option>
            </select>
            <select defaultValue="" className="select">
              <option value="" disabled={true}>
                Bilim sohasi
              </option>
              <option value="">ta'lim sohasi</option>
              <option value="">xavfsizlik sohasi</option>
            </select>
            <select defaultValue="" className="select">
              <option value="" disabled={true}>
                Ta'lim sohasi
              </option>
              <option value="">qishloq xo'jaligi</option>
            </select>
            <select defaultValue="" className="select">
              <option value="" disabled={true}>
                Ta'lim yo'nalish
              </option>
              <option value="" disabled={true}>
                Ta'lim yo'nalish
              </option>
            </select>
            <select defaultValue="" className="select">
              <option value="" disabled={true}>
                Kasb va mutaxasislik
              </option>
              <option value="">Kasb va mutaxasislik</option>
              <option value="">Kasb va mutaxasislik</option>
            </select>
            <select defaultValue="" className="select">
              <option value="" disabled={true}>
                Fanlar
              </option>
              <option value="">Fanlar</option>
              <option value="">Fanlar</option>
            </select>
            <button className="btn btn-primary">Filterni tozalash</button>
          </div>
          <div className="hidden md:block">
            <Divider color="blue" />
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra md:text-[15px] lg:text-[17px]">
              {/* head */}
              <thead className="bg-base-300">
                <tr className="uppercase font-bold md:text-[14px] lg:text-[16px]">
                  <th>F.I.O</th>
                  <th>Viloyat</th>
                  <th>Tuman</th>
                  <th>Ta'lim tashkiloti</th>
                  <th>Fan</th>
                  <th>Reyting</th>
                </tr>
              </thead>
              <tbody>
                {reyting.results.map((result) => {
                  return (
                    <tr key={result.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="rounded-md h-12 w-12 md:h-16 md:w-16">
                              <img src={result.user?.image} alt="Avatar" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {result.user?.full_name}
                            </div>
                            {/* <div className="text-sm opacity-50">
                              United States
                            </div> */}
                          </div>
                        </div>
                      </td>
                      <td>{result.user?.region}</td>
                      <td>{result.user?.district}</td>
                      <td>{result.user?.college}</td>
                      <td>{result.fan?.name}</td>
                      <td className="text-primary font-bold text-sm md:text-lg">
                        {result.toplagan_bali}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-10">
            <div className="join gap-2">
            <button className="join-item btn">1</button>
            <button className="join-item btn">2</button>
            <button className="join-item btn btn-disabled">...</button>
            <button className="join-item btn">99</button>
            <button className="join-item btn">100</button>
          </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Rating;
