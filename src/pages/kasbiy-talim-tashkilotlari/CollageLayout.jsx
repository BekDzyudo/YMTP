import React from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import useGetFetch from "../../hooks/useGetFetch";
import { RiProfileLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { MdOutlinePlayLesson, MdReportGmailerrorred } from "react-icons/md";
import { BsCommand } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";

function CollageLayout() {
  const navigate = useNavigate();
  let { collageId, districtId, Id } = useParams();

  const {
    data: collage,
    isPending,
    error,
  } = useGetFetch(`${import.meta.env.VITE_BASE_URL}/college-detail/${Id}`);

  return (
    <section className="flex flex-col mt-24 sm:mt-35 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-8/12">
      {isPending && (
        <span className="loading loading-ring loading-xl sm:w-24 w-10 sm:h-24 h-10 absolute sm:left-1/2 left-1/2 sm:top-1/3 top-1/4"></span>
      )}
      {error && <div>{error}</div>}
      {collage ? (
        <div className="flex flex-col gap-5">
          <div className="breadcrumbs text-sm md:text-[16px] hidden md:block">
            <ul>
              <li>
                <Link to="/region">Viloyatlar</Link>
              </li>
              <li>
                <Link to={`/region/districts/${districtId}`}>Tumanlar</Link>
              </li>
              <li>
                <Link to={`/region/districts/${districtId}/collages/${collageId}`}>Texnikumlar</Link>
              </li>
              <li>{collage.name}</li>
            </ul>
          </div>
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Navbar */}
              <nav className="navbar w-full bg-base-300">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  {/* Sidebar toggle icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-6 md:size-8"
                  >
                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                    <path d="M9 4v16"></path>
                    <path d="M14 10l2 2l-2 2"></path>
                  </svg>
                </label>
                <div className="px-4 text-sm lg:text-xl font-bold uppercase">
                  {collage.name}
                </div>
              </nav>
              {/* Page content here */}
              <div className="p-0 pt-4 md:p-4">
                <Outlet />
              </div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible mt-20 sm:mt-25 lg:m-0">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div className="flex min-h-full flex-col items-start bg-base-300 is-drawer-close:w-14 is-drawer-open:w-64">
                {/* Sidebar content here */}
                <ul className="menu w-full grow gap-3">
                  {/* List item */}
                  <li>
                    <Link
                      to={`/region/districts/${districtId}/collages/${collageId}/collage/${Id}`}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Umumiy ma'lumotlar"
                    >
                      {/* Home icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        fill="none"
                        stroke="currentColor"
                        className="my-1.5 inline-block size-5"
                      >
                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      </svg>
                      <span className="is-drawer-close:hidden md:text-[16px]">
                        Umumiy ma'lumotlar
                      </span>
                    </Link>
                  </li>

                  {/* List item */}
                  <li>
                    <Link
                      to="professions"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Tayyorlanadigan kasb va mutaxassisliklar"
                    >
                      {/* Settings icon */}
                      <RiProfileLine className="size-5" />
                      <span className="is-drawer-close:hidden md:text-[16px]">
                        Tayyorlanadigan kasb va mutaxassisliklar
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="teachers"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Pedagoglar tarkibi"
                    >
                      {/* Settings icon */}
                      <LuUsers className="size-5" />
                      <span className="is-drawer-close:hidden md:text-[16px]">
                        Pedagoglar tarkibi
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="strategy"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Rivojlanish strategiyasi"
                    >
                      {/* Settings icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        fill="none"
                        stroke="currentColor"
                        className="my-1.5 inline-block size-5"
                      >
                        <path d="M20 7h-9"></path>
                        <path d="M14 17H5"></path>
                        <circle cx="17" cy="17" r="3"></circle>
                        <circle cx="7" cy="7" r="3"></circle>
                      </svg>
                      <span className="is-drawer-close:hidden md:text-[16px]">
                        Rivojlanish strategiyasi
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="short-term-courses"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Qisqa muddatli kurslar"
                    >
                      {/* Settings icon */}
                      <MdOutlinePlayLesson className="size-5" />
                      <span className="is-drawer-close:hidden md:text-[16px]">
                        Qisqa muddatli kurslar
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="dual-education"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Dual ta'lim"
                    >
                      {/* Settings icon */}
                      <BsCommand className="size-5" />
                      <span className="is-drawer-close:hidden md:text-[16px]">
                        Dual ta'lim
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-primary text-sm sm:text-2xl font-bold text-center w-full opacity-90 absolute top-40 left-0 sm:top-52 flex justify-center">
          <div className="flex items-center gap-3">
            <MdReportGmailerrorred className="text-2xl sm:text-5xl" />{" "}
            <p>Malumotlar kiritilmagan</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default CollageLayout;
