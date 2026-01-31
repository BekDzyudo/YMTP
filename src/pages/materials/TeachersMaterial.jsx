import React, { useState } from "react";
import useGetFetch from "../../hooks/useGetFetch";
import { FaSearch, FaUser } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import Divider from "../../components/Dvider";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { MdReportGmailerrorred } from "react-icons/md";
import { GiMaterialsScience } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";

function TeachersMaterial() {
  const { theme } = useGlobalContext();

  // get filter data
  const [bilim, setBilim] = useState("");
  const [talim, setTalim] = useState("");
  const [yunalish, setYunalish] = useState("");
  const [kasb, setKasb] = useState("");
  const [fan, setFan] = useState("");

  const { data: bilim_soha } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/edu-prof/bilim-soha/`,
  );
  const { data: talim_soha } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/edu-prof/talim-soha/?bilim_soha=${bilim}`,
  );
  const { data: talim_yunalish } = useGetFetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/edu-prof/talim-yunalish/?talim_soha=${talim}`,
  );
  const { data: kasb_mutaxassislik } = useGetFetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/edu-prof/kasb-va-mutaxassislik/?talim_yunalish=${yunalish}`,
  );
  const { data: fanlar } = useGetFetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/edu-prof/fan/?kasb_va_mutaxassislik=${kasb}`,
  );

  // get teachers list
  const {
    data: materialList,
    isPending,
    error,
  } = useGetFetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/teachers/?fan__kasb_va_mutaxassislik__talim_yunalish__talim_soha__bilim_soha__id=${bilim}&fan__kasb_va_mutaxassislik__talim_yunalish__talim_soha__id=${talim}&fan__kasb_va_mutaxassislik__talim_yunalish__id=${yunalish}&
    fan__kasb_va_mutaxassislik__id=${kasb}&
    fan__id=${fan}`,
  );

  return (
    <section className="relative mt-24 md:mt-35 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12">
      {isPending && (
        <span className="loading loading-ring loading-xl sm:w-24 w-10 sm:h-24 h-10 absolute sm:left-1/2 left-1/2 sm:top-1/3 top-1/4"></span>
      )}
      {error && <div>{error}</div>}
      {materialList ? (
        <>
          <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-8 md:mb-10">
            Fan o‘qituvchilari
          </h2>
          <div className="flex gap-5 md:hidden sm:mb-6">
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
                    <select
                      defaultValue=""
                      className="select outline-0"
                      onChange={(e) => setBilim(e.target.value)}
                    >
                      <option value="" disabled={true}>
                        Bilim sohasi
                      </option>
                      {bilim_soha &&
                        bilim_soha.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </li>
                  <li>
                    <select
                      defaultValue=""
                      className="select outline-0"
                      onChange={(e) => setTalim(e.target.value)}
                    >
                      <option value="" disabled={true}>
                        Ta'lim sohasi
                      </option>
                      {talim_soha &&
                        talim_soha.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </li>
                  <li>
                    <select
                      defaultValue=""
                      className="select outline-0"
                      onChange={(e) => setYunalish(e.target.value)}
                    >
                      <option value="" disabled={true}>
                        Ta'lim yo'nalish
                      </option>
                      {talim_yunalish &&
                        talim_yunalish.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </li>
                  <li>
                    <select
                      defaultValue=""
                      className="select outline-0"
                      onChange={(e) => setKasb(e.target.value)}
                    >
                      <option value="" disabled={true}>
                        Kasb va mutaxasisliklar
                      </option>
                      {kasb_mutaxassislik &&
                        kasb_mutaxassislik.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </li>
                  <li>
                    <select
                      defaultValue=""
                      className="select outline-0"
                      onChange={(e) => setFan(e.target.value)}
                    >
                      <option value="" disabled={true}>
                        Fanlar
                      </option>
                      {fanlar &&
                        fanlar.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </li>
                </ul>
              </div>
            </div>
            <button
              className="btn btn-success btn-sm"
              onClick={() => {
                (setBilim(""),
                  setTalim(""),
                  setKasb(""),
                  setYunalish(""),
                  setFan(""));
              }}
            >
              Filtrni tozalash <GrClearOption />
            </button>
          </div>
          <div className="hidden gap-4 mb-10 border px-2 py-3 rounded-lg md:flex">
            <select
              defaultValue=""
              className="select outline-0"
              onChange={(e) => setBilim(e.target.value)}
            >
              <option value="" disabled={true}>
                Bilim sohasi
              </option>
              {bilim_soha &&
                bilim_soha.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
            <select
              defaultValue=""
              className="select outline-0"
              onChange={(e) => setTalim(e.target.value)}
            >
              <option value="" disabled={true}>
                Ta'lim sohasi
              </option>
              {talim_soha &&
                talim_soha.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
            <select
              defaultValue=""
              className="select outline-0"
              onChange={(e) => setYunalish(e.target.value)}
            >
              <option value="" disabled={true}>
                Ta'lim yo'nalish
              </option>
              {talim_yunalish &&
                talim_yunalish.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
            <select
              defaultValue=""
              className="select outline-0"
              onChange={(e) => setKasb(e.target.value)}
            >
              <option value="" disabled={true}>
                Kasb va mutaxasisliklar
              </option>
              {kasb_mutaxassislik &&
                kasb_mutaxassislik.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
            <select
              defaultValue=""
              className="select outline-0"
              onChange={(e) => setFan(e.target.value)}
            >
              <option value="" disabled={true}>
                Fanlar
              </option>
              {fanlar &&
                fanlar.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
            <button
              className="btn btn-primary"
              onClick={() => {
                (setBilim(""),
                  setTalim(""),
                  setKasb(""),
                  setYunalish(""),
                  setFan(""));
              }}
            >
              Filterni tozalash
            </button>
          </div>
          <div className="hidden md:block">
            <Divider color={`${theme == "night" ? "orange" : "blue"}`} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-5 gap-4 sm:gap-5 md:gap-8">
            {materialList.map((item, index) => {
              return (
                <Link
                  key={item.id}
                  className={`border ${
                    theme == "night"
                      ? "bg-gray-800 border-gray-500"
                      : "bg-slate-400 border-slate-500"
                  } group p-2 sm:p-4 rounded-md sm:rounded-2xl`}
                >
                  <div className="h-24 sm:h-44 mb-2">
                    <img
                      src={item.uqutuvchi?.image}
                      alt=""
                      className="rounded-t-lg h-full w-full object-cover sm:group-hover:scale-105 transition-all duration-300"
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
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center">
                        <div className="w-[65px] sm:w-[120px] md:w-[140px] flex items-center">
                          <div
                            className="
          rating rating-sm pointer-events-none
          origin-left
          scale-60 sm:scale-90 md:scale-100
        "
                          >
                            {[1, 2, 3, 4, 5].map((star) => (
                              <input
                                key={star}
                                type="radio"
                                className={`mask mask-star ${
                                  theme === "night"
                                    ? "bg-amber-500"
                                    : "bg-indigo-700"
                                }`}
                                checked={star <= Math.round(item?.avg_rate)}
                                readOnly
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <h4 className="flex items-center gap-2 justify-end font-semibold text-[12px] sm:text-[16px] p-0">
                        <span className="hidden sm:block">Yuklanishlar:</span>{" "}
                        <span className="bg-base-300 px-2 sm:px-3 py-0 sm:py-1 rounded">
                          <span className="font-bold text-amber-600 text-[12px] gap-1 sm:text-[16px] flex items-center">
                            <span className="sm:hidden block">
                              <FaDownload />
                            </span>{" "}
                            <span className="sm:hidden block">/</span>{" "}
                            {item.download_count}
                          </span>
                        </span>
                      </h4>
                    </div>
                    <h3 className="font-semibold flex items-start gap-2 md:gap-3 mb-2 text-[12px] sm:text-[16px] leading-snug">
                      <GiMaterialsScience className="shrink-0 text-md md:text-xl mt-[2px]" />
                      <span>{item?.fan?.name}</span>
                    </h3>

                    <h3 className="font-semibold flex items-center gap-2 md:gap-3 mb-2 leading-3 sm:leading-5 text-[12px] sm:text-[16px]">
                      <FaUser className="text-md md:text-xl" />{" "}
                      {item?.uqutuvchi?.last_name +
                        " " +
                        item?.uqutuvchi?.first_name}
                    </h3>
                    <h3 className="font-semibold flex items-center gap-2 md:gap-3 mb-2 leading-3 sm:leading-5 text-[12px] sm:text-[16px]">
                      <FaLocationDot className="text-md md:text-xl" />{" "}
                      {item?.uqutuvchi?.region?.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-primary text-sm sm:text-2xl font-bold text-center w-full opacity-90 absolute left-0 top-40 sm:top-52 flex justify-center">
          <div className="flex items-center gap-3">
            <MdReportGmailerrorred className="text-2xl sm:text-5xl" />{" "}
            <p>Hech narsa topilmadi</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default TeachersMaterial;
