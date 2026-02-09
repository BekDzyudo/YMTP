import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import useGetFetch from "../../hooks/useGetFetch";
import { useGlobalContext } from "../../hooks/useGlobalContext";
// react-icons
import { MdReportGmailerrorred } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";
import { MdOutlineMenuBook } from "react-icons/md";
import { MdOutlineAssignment } from "react-icons/md";
import { LuBookOpenText } from "react-icons/lu";
import { MdOutlineSchema } from "react-icons/md";
import { MdOutlineSlideshow } from "react-icons/md";
import { MdOutlineCalculate } from "react-icons/md";
import { LuBookMarked } from "react-icons/lu";
import { MdOutlineQuiz } from "react-icons/md";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { FaReply } from "react-icons/fa";

function AllMaterials() {
  const { theme } = useGlobalContext();
  const { teacherMaterialId } = useParams("teacherMaterialId");
  const navigate = useNavigate();
  const [materialTypestate, setMaterialTypestate] = useState("");

  // get material type
  const { data: materialType } = useGetFetch(
    `${import.meta.env.VITE_BASE_URL}/birlashma/kategoriya-material/`,
  );

  const [teacherMaterialList, setTeacherMaterialList] = useState("");
  console.log(teacherMaterialList);

  //   get material list
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BASE_URL}/teachers/${
        teacherMaterialId
      }/?kategoriya_material=${materialTypestate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => setTeacherMaterialList(data))
      .catch((err) => console.error(err));
  }, [materialTypestate]);
  console.log(teacherMaterialList);

  return (
    <section className="flex flex-col min-h-[60vh] mt-24 sm:mt-35 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-10/12">
      {!teacherMaterialList?.materiallar ? (
        <div className="w-full flex items-center justify-center md:mt-20">
          <div className="flex flex-col items-center gap-3 text-primary text-sm sm:text-2xl font-bold text-center opacity-90">
          <h1>Siz ro‘yxatdan o‘tmagansiz</h1>
          <Link to="/login" className="btn btn-primary mt-4 max-w-min">
            <FaReply /> Kirish
          </Link>
        </div>
        </div>
      ) : (
        <div>
          {!teacherMaterialList?.materiallar?.length == 0 ? (
            <div className="flex flex-col gap-5">
              <div className="breadcrumbs text-sm md:text-[16px] hidden md:block">
                <ul>
                  <li>
                    <Link to="/teachers">O‘qituvchilar</Link>
                  </li>
                  <li>
                    <Link to={`/teachers/${teacherMaterialId}`}>
                      Materiallar
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="drawer lg:drawer-open">
                <input
                  id="my-drawer-4"
                  type="checkbox"
                  className="drawer-toggle"
                  defaultChecked
                />
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
                      {teacherMaterialList?.materiallar[0]?.fan?.name} FANI
                    </div>
                  </nav>
                  {/* Page content here */}
                  <div className="p-0 pt-4 md:p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {teacherMaterialList?.materiallar?.map((material) => (
                        <div
                          key={material.id}
                          className={`border ${theme === "night" ? "bg-gray-800 border-gray-500" : "bg-slate-100 border-gray-300"} p-1 rounded-lg transition-colors duration-150 cursor-pointer hover:shadow-md`}
                        >
                          <div className="card-body">
                            <div className="flex items-start gap-2 mb-3">
                              <MdOutlineMenuBook className="text-xl text-primary flex-shrink-0 mt-0.5" />
                              <h2 className="text-lg font-bold flex-1">
                                {material.kategoriya_material?.name}
                              </h2>
                            </div>
                            <div className="flex flex-col gap-2 text-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">
                                  Ko'rilgan:
                                </span>
                                <span className="font-semibold">
                                  {material.view_count}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">
                                  Yuklab olingan:
                                </span>
                                <span className="font-semibold">
                                  {material.dowloand_count}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Reyting:</span>
                                <span className="font-semibold text-yellow-500 flex items-center gap-1">
                                  {"⭐ " + material.rate_material?.toFixed(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
                    <ul className="menu w-full grow gap-3 text-xs">
                      {/* List item */}
                      <li>
                        <button
                          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                          data-tip="Barchasi"
                          onClick={() => setMaterialTypestate("")}
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
                          <span className="is-drawer-close:hidden md:text-[14px]">
                            Barchasi
                          </span>
                        </button>
                      </li>

                      {/* List item */}
                      {materialType &&
                        materialType.map((type) => (
                          <li key={type.id}>
                            <button
                              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                              data-tip={type.name}
                              onClick={() => setMaterialTypestate(type.id)}
                            >
                              {/* Settings icon */}
                              {/* <RiProfileLine className="size-5" /> */}
                              <span className="is-drawer-close:hidden md:text-[14px]">
                                {type.name}
                              </span>
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-primary text-sm sm:text-2xl font-bold text-center w-full opacity-90 absolute left-0 top-40 sm:top-52 flex justify-center">
              <div className="flex items-center gap-3">
                <MdReportGmailerrorred className="text-2xl sm:text-5xl" />
                <p>Hech narsa topilmadi</p>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default AllMaterials;
