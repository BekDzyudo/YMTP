import React, { useState, useMemo, useCallback } from "react";
import useGetFetch from "../../hooks/useGetFetch";
import { FaSearch } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import Divider from "../../components/Dvider";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { MdReportGmailerrorred } from "react-icons/md";
import TeacherCard from "./components/TeacherCard";


// Filter UI extracted for reusability and memoization
const FilterSelect = React.memo(function FilterSelect({ value, onChange, options, placeholder }) {
  return (
    <select value={value} className="select outline-0" onChange={onChange}>
      <option value="" disabled>{placeholder}</option>
      {options && options.map((item) => (
        <option key={item.id} value={item.id}>{item.name}</option>
      ))}
    </select>
  );
});

function TeachersMaterial() {
  const { theme } = useGlobalContext();
  const [bilim, setBilim] = useState("");
  const [talim, setTalim] = useState("");
  const [yunalish, setYunalish] = useState("");
  const [kasb, setKasb] = useState("");
  const [fan, setFan] = useState("");

  // Memoized fetches
  const { data: bilim_soha = [] } = useGetFetch(`${import.meta.env.VITE_BASE_URL}/edu-prof/bilim-soha/`);
  const { data: talim_soha = [] } = useGetFetch(`${import.meta.env.VITE_BASE_URL}/edu-prof/talim-soha/?bilim_soha=${bilim}`);
  const { data: talim_yunalish = [] } = useGetFetch(`${import.meta.env.VITE_BASE_URL}/edu-prof/talim-yunalish/?talim_soha=${talim}`);
  const { data: kasb_mutaxassislik = [] } = useGetFetch(`${import.meta.env.VITE_BASE_URL}/edu-prof/kasb-va-mutaxassislik/?talim_yunalish=${yunalish}`);
  const { data: fanlar = [] } = useGetFetch(`${import.meta.env.VITE_BASE_URL}/edu-prof/fan/?kasb_va_mutaxassislik=${kasb}`);

  // get teachers list
  const {
    data: materialListRaw,
    isPending,
    error,
  } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/teachers/?fan__kasb_va_mutaxassislik__talim_yunalish__talim_soha__bilim_soha__id=${bilim}&fan__kasb_va_mutaxassislik__talim_yunalish__talim_soha__id=${talim}&fan__kasb_va_mutaxassislik__talim_yunalish__id=${yunalish}&fan__kasb_va_mutaxassislik__id=${kasb}&fan__id=${fan}`,
  );
  const materialList = Array.isArray(materialListRaw) ? materialListRaw : [];

  // Memoize grid columns for responsiveness
  const gridCols = useMemo(() => {
    // Responsive grid columns
    return "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-5 gap-4 sm:gap-5 md:gap-8";
  }, []);

  // Memoize filter clear
  const clearFilters = useCallback(() => {
    setBilim("");
    setTalim("");
    setKasb("");
    setYunalish("");
    setFan("");
  }, []);

  // Memoize teacher cards rendering for performance
  const teacherCards = useMemo(() => (
    (Array.isArray(materialList) ? materialList : []).map((item) => (
      <TeacherCard key={item.id} item={item} theme={theme} />
    ))
  ), [materialList, theme]);
console.log(materialList);

  return (
    <section className="relative min-h-[60vh] mt-24 md:mt-35 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12">
      {isPending ? (
        <span className="loading loading-ring loading-xl absolute sm:w-24 w-10 sm:h-24 h-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></span>
      ) : error ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">{error}</div>
      ) : materialList.length ? (
        <>
          <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-8 md:mb-10">
            Fan o‘qituvchilari
          </h2>
          {/* Mobile Filter Drawer */}
          <div className="flex gap-5 md:hidden sm:mb-6">
            <div className="drawer">
              <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                <label htmlFor="my-drawer-1" className="btn btn-primary btn-sm drawer-button">
                  Filtr <FaSearch />
                </label>
              </div>
              <div className="drawer-side mt-20 sm:mt-25 lg:m-0">
                <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4 gap-2 text-sm">
                  <li><FilterSelect value={bilim} onChange={e => setBilim(e.target.value)} options={bilim_soha} placeholder="Bilim sohasi" /></li>
                  <li><FilterSelect value={talim} onChange={e => setTalim(e.target.value)} options={talim_soha} placeholder="Ta'lim sohasi" /></li>
                  <li><FilterSelect value={yunalish} onChange={e => setYunalish(e.target.value)} options={talim_yunalish} placeholder="Ta'lim yo'nalish" /></li>
                  <li><FilterSelect value={kasb} onChange={e => setKasb(e.target.value)} options={kasb_mutaxassislik} placeholder="Kasb va mutaxasisliklar" /></li>
                  <li><FilterSelect value={fan} onChange={e => setFan(e.target.value)} options={fanlar} placeholder="Fanlar" /></li>
                </ul>
              </div>
            </div>
            <button className="btn btn-success btn-sm" onClick={clearFilters}>
              Filtrni tozalash <GrClearOption />
            </button>
          </div>
          {/* Desktop Filter Bar */}
          <div className="hidden gap-4 mb-10 border px-2 py-3 rounded-lg md:flex">
            <FilterSelect value={bilim} onChange={e => setBilim(e.target.value)} options={bilim_soha} placeholder="Bilim sohasi" />
            <FilterSelect value={talim} onChange={e => setTalim(e.target.value)} options={talim_soha} placeholder="Ta'lim sohasi" />
            <FilterSelect value={yunalish} onChange={e => setYunalish(e.target.value)} options={talim_yunalish} placeholder="Ta'lim yo'nalish" />
            <FilterSelect value={kasb} onChange={e => setKasb(e.target.value)} options={kasb_mutaxassislik} placeholder="Kasb va mutaxasisliklar" />
            <FilterSelect value={fan} onChange={e => setFan(e.target.value)} options={fanlar} placeholder="Fanlar" />
            <button className="btn btn-primary" onClick={clearFilters}>
              Filterni tozalash
            </button>
          </div>
          <div className="hidden md:block">
            <Divider color={theme === "night" ? "orange" : "blue"} />
          </div>
          <div className={gridCols}>
            {teacherCards}
          </div>
        </>
      ) : (
        <div className="text-primary text-sm sm:text-2xl font-bold text-center w-full opacity-90 absolute left-0 top-40 sm:top-52 flex justify-center">
          <div className="flex items-center gap-3">
            <MdReportGmailerrorred className="text-2xl sm:text-5xl" />
            <p>Hech narsa topilmadi</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default React.memo(TeachersMaterial);
