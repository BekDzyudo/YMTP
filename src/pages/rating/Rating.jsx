import React, { useMemo, useState } from "react";
import useGetFetch from "../../hooks/useGetFetch";
import Divider from "../../components/Dvider";
import { FaSearch } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";

function Rating() {

  // get filter data
  const [bilim, setBilim] = useState("");
  const [talim, setTalim] = useState("");
  const [yunalish, setYunalish] = useState("");
  const [kasb, setKasb] = useState("");
  const [fan, setFan] = useState("");

  const { data: bilim_soha } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/edu-prof/bilim-soha/`
  );
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const talimUrl = useMemo(() => {
    return bilim ? `${baseUrl}/edu-prof/talim-soha/?bilim_soha=${bilim}` : null;
  }, [baseUrl, bilim]);

  const talimYunalishUrl = useMemo(() => {
    return talim ? `${baseUrl}/edu-prof/talim-yunalish/?talim_soha=${talim}` : null;
  }, [baseUrl, talim]);

  const kasbUrl = useMemo(() => {
    return yunalish
      ? `${baseUrl}/edu-prof/kasb-va-mutaxassislik/?talim_yunalish=${yunalish}`
      : null;
  }, [baseUrl, yunalish]);

  const fanUrl = useMemo(() => {
    return kasb ? `${baseUrl}/edu-prof/fan/?kasb_va_mutaxassislik=${kasb}` : null;
  }, [baseUrl, kasb]);

  const reytingUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (bilim) params.append("bilim_soha", bilim);
    if (talim) params.append("talim_soha", talim);
    if (yunalish) params.append("talim_yunalish", yunalish);
    // use consistent param name
    if (kasb) params.append("kasb_va_mutaxassislik", kasb);
    if (fan) params.append("fan", fan);
    const qs = params.toString();
    return qs ? `${baseUrl}/reyting_app/reyting/?${qs}` : `${baseUrl}/reyting_app/reyting/`;
  }, [baseUrl, bilim, talim, yunalish, kasb, fan]);

  const { data: talim_soha, isPending: isPendingTalim, error: errorTalim } = useGetFetch(talimUrl);
  const { data: talim_yunalish, isPending: isPendingYunalish, error: errorYunalish } = useGetFetch(talimYunalishUrl);
  const { data: kasb_mutaxassislik, isPending: isPendingKasb, error: errorKasb } = useGetFetch(kasbUrl);
  const { data: fanlar, isPending: isPendingFan, error: errorFan } = useGetFetch(fanUrl);

  // get teachers
  const {
    data: reyting,
    isPending: isPendingReyting,
    error: errorReyting,
  } = useGetFetch(reytingUrl);

  const isPending = isPendingReyting || isPendingTalim || isPendingYunalish || isPendingKasb || isPendingFan;
  const error = errorReyting || errorTalim || errorYunalish || errorKasb || errorFan;

  const clearFilters = () => {
    setBilim("");
    setTalim("");
    setYunalish("");
    setKasb("");
    setFan("");
  };

  // clear dependent filters when parent changes
  React.useEffect(() => {
    setTalim("");
    setYunalish("");
    setKasb("");
    setFan("");
  }, [bilim]);

  React.useEffect(() => {
    setYunalish("");
    setKasb("");
    setFan("");
  }, [talim]);

  React.useEffect(() => {
    setKasb("");
    setFan("");
  }, [yunalish]);

  React.useEffect(() => {
    setFan("");
  }, [kasb]);

  return (
    <section className="relative min-h-[60vh] mt-24 md:mt-35 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12">
      {isPending && (
        <span className="loading loading-ring loading-xl absolute sm:w-24 w-10 sm:h-24 h-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></span>
      )}
      {error && <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">{error}</div>}
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
                    <select 
            value={bilim}
            className="select outline-0"
            onChange={(e) => setBilim(e.target.value)}
            >
              <option value="" disabled={true}>
                Bilim sohasi
              </option>
              {bilim_soha &&
                    bilim_soha.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      );
                    })}
            </select>
                  </li>
                  <li>
                    <select 
            value={talim}
            className="select outline-0"
            onChange={(e) => setTalim(e.target.value)}
            >
              <option value="" disabled={true}>
                Ta'lim sohasi
              </option>
               {talim_soha &&
                    talim_soha.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      );
                    })}
            </select>
                  </li>
                  <li>
                    <select 
            value={yunalish}
            className="select outline-0"
            onChange={(e) => setYunalish(e.target.value)}>
              <option value="" disabled={true}>
                Ta'lim yo'nalish
              </option>
                  {talim_yunalish &&
                    talim_yunalish.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      );
                    })}
            </select>
                  </li>
                  <li>
                    <select 
            value={kasb}
            className="select outline-0"
            onChange={(e) => setKasb(e.target.value)}>
              <option value="" disabled={true}>
                Kasb va mutaxasisliklar
              </option>
              {kasb_mutaxassislik &&
                    kasb_mutaxassislik.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      );
                    })}
            </select>
                  </li>
                  <li>
                    <select 
            value={fan}
            className="select outline-0"
            onChange={(e) => setFan(e.target.value)}
            >
              <option value="" disabled={true}>
                Fanlar
              </option>
               {fanlar &&
                    fanlar.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      );
                    })}
            </select>
            </li>
                </ul>
              </div>
            </div>
            <button className="btn btn-success btn-sm" onClick={clearFilters}>
              Filtrni tozalash <GrClearOption />
            </button>
          </div>
          <div className="hidden gap-4 mb-10 border px-2 py-3 rounded-lg md:flex">
            <select 
            value={bilim}
            className="select outline-0"
            onChange={(e) => setBilim(e.target.value)}
            >
              <option value="" disabled={true}>
                Bilim sohasi
              </option>
              {bilim_soha &&
                    bilim_soha.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      );
                    })}
            </select>
            <select 
            value={talim}
            className="select outline-0"
            onChange={(e) => setTalim(e.target.value)}
            >
              <option value="" disabled={true}>
                Ta'lim sohasi
              </option>
               {talim_soha &&
                    talim_soha.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      );
                    })}
            </select>
            <select 
            value={yunalish}
            className="select outline-0"
            onChange={(e) => setYunalish(e.target.value)}>
              <option value="" disabled={true}>
                Ta'lim yo'nalish
              </option>
                  {talim_yunalish &&
                    talim_yunalish.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      );
                    })}
            </select>
            <select 
            value={kasb}
            className="select outline-0"
            onChange={(e) => setKasb(e.target.value)}>
              <option value="" disabled={true}>
                Kasb va mutaxasisliklar
              </option>
              {kasb_mutaxassislik &&
                    kasb_mutaxassislik.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      );
                    })}
            </select>
            <select 
            value={fan}
            className="select outline-0"
            onChange={(e) => setFan(e.target.value)}
            >
              <option value="" disabled={true}>
                Fanlar
              </option>
               {fanlar &&
                    fanlar.map((item) => {
                      return (
                        <option
                          key={item.id}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      );
                    })}
            </select>
            <button className="btn btn-primary" onClick={clearFilters}>Filterni tozalash</button>
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
                              <img loading="lazy" src={result.user?.image || ""} alt={result.user?.full_name || "Avatar"} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
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
