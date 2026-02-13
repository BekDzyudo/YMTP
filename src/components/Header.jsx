import React, { useContext, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useHero } from "../context/HeroContext";
import { FiLogIn } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import useGetFetchProfile from "../hooks/useGetFetchProfile";

function Header() {
  const { onHero } = useHero();
  const { pathname } = useLocation();
  const { userData, auth, logout } = useContext(AuthContext);
  const { theme, changeTheme } = useGlobalContext();

  const { data: user } = useGetFetchProfile(
    `${import.meta.env.VITE_BASE_URL}/user-data/`
  );


const isHome = pathname === "/" || pathname === "/digital-educational-resources" || pathname === "/methodological-support";
const isWhiteLogo = theme === "night" || (theme === "light" && onHero && isHome);
// const isLightHero = theme === "light" && onHero && isHome;

const logoSrc = isWhiteLogo
  ? "/new_logo_white.png"
  : "/new_logo_blue.png";
  
  const navTextColor = theme === "night"
    ? "text-white/80"
    : theme === "light" && onHero && isHome
    ? "text-white"
    : "text-base-content";

  return (
    <div
      className={`shadow-xl py-1 sm:py-2 fixed top-0 left-0 w-full z-30 backdrop-blur-3xl bg-transparent
  border-b border-white/10`}
    >
      <div className="navbar gap-2 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12 items-center">
        <div className="navbar-start">
          <Link to="/" className="flex gap-2 sm:gap-3 items-center">
           <img
                src={logoSrc}
                alt="logo"
                className="w-12 xl:w-20 sm:w-16"
              />

            <h4
              className={`font-semibold xl:text-[16px] lg:text-[14px] sm:text-[12px] text-[10px] ${navTextColor}`}
            >
              Kasbiy ta'limni <br />
              rivojlantirish <br />
              instituti
            </h4>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul
            className={`menu lg:menu-horizontal 2xl:gap-3 lg:text-[12px] border rounded-xl xl:text-[16px] 
              ${theme === "light" && onHero ? "border-gray-400" : "border-gray-700" }
            `}
          >
            <li>
              <Link
                to="/"
                className={navTextColor}
              >
                Bosh sahifa
              </Link>
            </li>
            <li>
              <Link
                to="/digital-educational-resources"
                className={navTextColor}
              >
                Raqamli ta'lim resurslari
              </Link>
            </li>
            <li>
              <Link
                // to="/methodological-support"
                className={navTextColor}
              >
                Metodik ta'minot
              </Link>
            </li>
            <li className="relative">
              <div className="dropdown dropdown-center group">
                <div
                  tabIndex={0}
                  role="button"
                  className={`${navTextColor} gap-2 items-center flex w-auto`}
                >
                  Bizning platformalar <FaAngleDown />
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu-horizontal border border-gray-700 bg-base-300 w-max rounded-md z-1 mt-5 pointer-events-none
    group-focus-within:pointer-events-auto"
                >
                  <li>
                    <Link
                      to="https://ipitvet.uz/uz/"
                      target="blank"
                      className="flex flex-col items-center gap-1 max-w-48"
                    >
                      <img
                        src="/rasmiy-website.png"
                        alt="rasmiy-vebsayt"
                        className="w-44"
                      />
                      <p className="text-sm font-semibold">Rasmiy veb-sayt</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://edu.profedu.uz/"
                      target="blank"
                      className="flex flex-col items-center gap-1 max-w-48"
                    >
                      <img
                        src="/eduprof.png"
                        alt="Metodik taminlash"
                        className="w-44"
                      />
                      <p className="text-sm font-semibold">Metodik taminlash</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://rtr.profedu.uz/"
                      target="blank"
                      className="flex flex-col items-center gap-1 max-w-48"
                    >
                      <img
                        src="/rtr.png"
                        alt="Raqamli ta'lim resurslari"
                        className="w-44"
                      />
                      <p className="text-sm font-semibold">
                        Raqamli ta'lim resurslari
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://my.moqt.uz/"
                      target="blank"
                      className="flex flex-col items-center gap-1 max-w-48"
                    >
                      <img
                        src="/mymoqt.png"
                        alt="Raqamli ta'lim resurslari"
                        className="w-44"
                      />
                      <p className="text-sm font-semibold text-center">
                        {" "}
                        Malaka oshirish jarayonini tashkil etish
                      </p>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
             {/* <li>
              <Link
                to="/region"
                className={`${
                  theme === "light" && onHero && pathname == "/"
                    ? "text-white"
                    : "text-base-content"
                }`}
              >
                Kasbiy ta'lim tashkilotlari
              </Link>
            </li>
            <li className="relative">
              <div className="dropdown dropdown-center group">
                <div
                  tabIndex={0}
                  role="button"
                  className={`${
                    theme === "light" && onHero && pathname == "/"
                      ? "text-white"
                      : "text-base-content"
                  } gap-2 items-center flex w-auto`}
                >
                  Bizning platformalar <FaAngleDown />
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu-horizontal border border-gray-700 bg-base-300 w-max rounded-md z-1 mt-5 pointer-events-none
    group-focus-within:pointer-events-auto"
                >
                  <li>
                    <Link
                      to="https://ipitvet.uz/uz/"
                      target="blank"
                      className="flex flex-col items-center gap-1 max-w-48"
                    >
                      <img
                        src="/rasmiy-website.png"
                        alt="rasmiy-vebsayt"
                        className="w-44"
                      />
                      <p className="text-sm font-semibold">Rasmiy veb-sayt</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://edu.profedu.uz/"
                      target="blank"
                      className="flex flex-col items-center gap-1 max-w-48"
                    >
                      <img
                        src="/eduprof.png"
                        alt="Metodik taminlash"
                        className="w-44"
                      />
                      <p className="text-sm font-semibold">Metodik taminlash</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://rtr.profedu.uz/"
                      target="blank"
                      className="flex flex-col items-center gap-1 max-w-48"
                    >
                      <img
                        src="/rtr.png"
                        alt="Raqamli ta'lim resurslari"
                        className="w-44"
                      />
                      <p className="text-sm font-semibold">
                        Raqamli ta'lim resurslari
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://my.moqt.uz/"
                      target="blank"
                      className="flex flex-col items-center gap-1 max-w-48"
                    >
                      <img
                        src="/mymoqt.png"
                        alt="Raqamli ta'lim resurslari"
                        className="w-44"
                      />
                      <p className="text-sm font-semibold text-center">
                        {" "}
                        Malaka oshirish jarayonini tashkil etish
                      </p>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link
                to="rating"
                className={`${
                  theme === "light" && onHero && pathname == "/"
                    ? "text-white"
                    : "text-base-content"
                }`}
              >
                Reyting
              </Link>
            </li>
            <li>
              <Link
              to="teachers"
                className={`${
                  theme === "light" && onHero && pathname == "/"
                    ? "text-white"
                    : "text-base-content"
                }`}
              >
                Materiallar
              </Link>
            </li> */}
          </ul>
        </div>
        <div className="navbar-end 2xl:gap-4 xl:gap-2 gap-2">
          {auth.refreshToken ? (
            <></>
          ) : (
            <Link
              to="/login"
              className={`hidden sm:flex px-2 py-2.5 xl:py-3 sm:border rounded-lg gap-1 items-center text-sm xl:text-[16px] ${
                theme === "light" && onHero && (pathname == "/" || pathname == "/digital-educational-resources" || pathname === "/methodological-support")
                  ? "text-white border-gray-400"
                  : "text-base-content border-gray-700"
              }`}
            >
              {" "}
              Kirish <FiLogIn className="text-sm xl:text-lg" />
            </Link>
          )}

          <label
            className={`hidden sm:inline-grid swap swap-rotate sm:p-2 sm:border rounded-lg ${
              theme === "light" && onHero && pathname == "/" || pathname == "/digital-educational-resources" || pathname === "/methodological-support"
                ? "text-white border-gray-400"
                : "text-base-content border-gray-700"
            }`}
          >
            <input
              type="checkbox"
              className="theme-controller"
              onClick={changeTheme}
            />
            <svg
              className="swap-off h-6 w-6 xl:w-8 xl:h-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {/* moon */}
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
            <svg
              className="swap-on h-6 w-6 xl:w-8 xl:h-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {/* sun */}
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
          </label>
          <button
            className={`px-2 sm:py-2.5 sm:border rounded-lg flex items-center ${
              theme === "light" && onHero && pathname == "/" || pathname == "/digital-educational-resources" || pathname === "/methodological-support"
                ? "text-white border-gray-400"
                : "text-base-content border-gray-700"
            }`}
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="xl:w-7 xl:h-7 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />{" "}
              </svg>
              <span className="badge badge-xs sm:text-[11px] badge-primary indicator-item">
                7
              </span>
            </div>
          </button>
          <select
            defaultValue="Large"
            className="select outline-0 select-sm lg:select-md xl:select-lg w-16 sm:w-20 border border-gray-700"
          >
            <option className="bg-base-300">O‘z</option>
            <option>Ру</option>
            <option>En</option>
          </select>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hidden lg:flex"
            >
              <div className="w-10 sm:w-12 shrink-0 rounded-full border border-gray-700">
                <img
                  alt="Avatar"
                  src={user?.image ? user?.image : "/person.png"}
                />
              </div>
            </div>
            <div className="dropdown lg:hidden flex items-center">
              <IoMenu
                tabIndex={0}
                role="button"
                className={`text-4xl outline-0 cursor-pointer ${
                  theme === "light" && onHero && (pathname == "/" || pathname == "/digital-educational-resources" || pathname === "/methodological-support")
                    ? "text-white"
                    : "text-base-content"
                }`}
              />
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-300 rounded-lg z-40 mt-3 w-48 sm:w-52 p-2 shadow border border-gray-700"
            >
              {auth.refreshToken ? (
                <></>
              ) : (
                <li>
                  <Link to="/login" className={`text-[12px] sm:text-sm`}>
                    {" "}
                    Kirish
                  </Link>
                </li>
              )}
              {
                userData?.user_roles && (
                  <li>
                {userData?.user_roles == "metodist" && (
                  <Link
                    className="justify-between text-[12px] sm:text-sm"
                    to="/expert-profile"
                  >
                    Profil
                  </Link>
                )}
                { userData?.user_roles == "teacher" && (
                  <Link
                    className="justify-between text-[12px] sm:text-sm"
                    to="/profile"
                  >
                    Profil
                  </Link>
                )}
              </li>
                )
              }
              
              <li className="flex sm:hidden">
                <label className="flex cursor-pointer gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                  </svg>
                  <input
                    onClick={changeTheme}
                    type="checkbox"
                    // value="synthwave"
                    className="toggle toggle-sm theme-controller"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                </label>
              </li>
              {auth.refreshToken ? (
                <li>
                  <Link
                    to="/"
                    onClick={logout}
                    className=" text-[12px] sm:text-sm"
                  >
                    Chiqish
                  </Link>
                </li>
              ) : (
                <></>
              )}

              <div className="relative my-2">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
                <div className="absolute inset-0 h-[1px] blur-md bg-gradient-to-r from-transparent via-blue-700/20 to-transparent"></div>
              </div>
              <div className="lg:hidden">
                <li>
                  <Link>Bosh sahifa</Link>
                </li>
                <li>
                  <Link>Kasbiy ta'lim tashkilotlari</Link>
                </li>
                <li>
                  <Link>Adabiyotlar</Link>
                </li>
                <li>
                  <Link>Reyting</Link>
                </li>
                <li>
                  <Link>Materiallar</Link>
                </li>
                <li>
                  <Link>Rasmiy veb-sayt</Link>
                </li>
                <li>
                  <Link>Metodik taminlash</Link>
                </li>
                <li>
                  <Link>Raqamli ta'lim resurslari</Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
