import React, { useContext, useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleRight, FaExternalLinkAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useHero } from "../context/HeroContext";
import { FiLogIn } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import useGetFetchProfile from "../hooks/useGetFetchProfile";
import { navMenu, linkIcons } from "../constants/navMenu";
import { useTranslation } from "../i18n/LanguageContext";

const isLinkActive = (link, pathname) =>
  !link.external && (pathname === link.to || pathname.startsWith(`${link.to}/`));

// Platformadagi asosiy gradient — barcha bloklarda bir xil
const GRADIENT = "bg-linear-to-br from-[#194882] to-info";

// Bitta bo'limning ochiladigan bloki (hamma bo'limda bir xil ko'rinish)
function NavDropdownPanel({ item, open, align, pathname, onNavigate, t }) {
  const SectionIcon = item.icon;
  return (
    // Tashqi qatlam (pt-3) tugmaga yopishib turadi — sichqoncha o'tishida bo'shliq qolmaydi
    <div
      className={`absolute z-40 top-full pt-3 ${align === "right" ? "right-0" : "left-0"} w-[min(92vw,330px)] transition-[opacity,visibility] duration-200 ${
        open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
      }`}
      onClick={(e) => e.target.closest("a") && onNavigate()}
    >
      <div className={`relative transition-transform duration-300 ease-out ${open ? "translate-y-0" : "translate-y-3"}`}>
        <span
          className={`absolute -top-1.5 ${align === "right" ? "right-8" : "left-8"} w-3 h-3 rotate-45 bg-[#194882]`}
        />
        <div className="relative overflow-hidden rounded-2xl bg-base-100 text-base-content border border-base-content/10 shadow-[0_24px_60px_-12px_rgba(0,30,80,0.45)]">
          {/* Sarlavha — platforma gradienti */}
          <div className={`${GRADIENT} flex items-center gap-2.5 px-4 py-3 text-white`}>
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-white/15 shrink-0">
              <SectionIcon size={14} />
            </span>
            <span className="flex-1 text-sm font-bold leading-snug">{t(item.labelKey)}</span>
            <span className="text-[11px] font-semibold bg-white/20 rounded-full px-2 py-0.5">{item.links.length}</span>
          </div>
          <div className="p-2 grid gap-0.5">
            {item.links.map((link) => {
              const Icon = linkIcons[link.slug] || FaAngleRight;
              const active = isLinkActive(link, pathname);
              const itemClass = `group/item flex items-center gap-3 rounded-xl px-2.5 py-2 text-[13px] xl:text-sm leading-snug transition-colors duration-200 ${
                active ? "bg-[#194882]/8 text-[#194882] font-semibold" : "font-medium hover:bg-[#194882]/6 hover:text-[#194882]"
              }`;
              const content = (
                <>
                  <span
                    className={`grid place-items-center shrink-0 w-8 h-8 rounded-lg transition-colors duration-200 ${
                      active
                        ? `${GRADIENT} text-white shadow-sm`
                        : "bg-[#194882]/10 text-[#194882] group-hover/item:bg-linear-to-br group-hover/item:from-[#194882] group-hover/item:to-info group-hover/item:text-white"
                    }`}
                  >
                    <Icon size={14} />
                  </span>
                  <span className="flex-1 min-w-0">{t(link.labelKey)}</span>
                  {link.external ? (
                    <FaExternalLinkAlt size={10} className="shrink-0 text-base-content/40" />
                  ) : (
                    <FaAngleRight
                      size={12}
                      className={`shrink-0 transition-all duration-200 ${
                        active
                          ? "opacity-100 text-base-content/60"
                          : "opacity-0 -translate-x-1 text-base-content/40 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                      }`}
                    />
                  )}
                </>
              );
              return link.external ? (
                <a key={link.to} href={link.to} target="_blank" rel="noopener noreferrer" className={itemClass}>
                  {content}
                </a>
              ) : (
                <Link key={link.to} to={link.to} className={itemClass}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const { t, lang, setLang, languages } = useTranslation();
  const currentLanguage = languages.find((l) => l.code === lang);

  // Tilni tanlagach dropdownni yopish
  const handleLanguageChange = (code) => {
    setLang(code);
    document.activeElement?.blur();
  };
  const { onHero } = useHero();
  const { pathname } = useLocation();

  // Qaysi bo'lim bloki ochiq. Sichqoncha chiqib ketganda darhol emas, biroz kechikib yopiladi —
  // shunda nomdan blokka o'tishda menyu yopilib qolmaydi.
  const [openMenu, setOpenMenu] = useState(null);
  const closeTimer = useRef(null);
  const openMenuNow = (key) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const closeMenuSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 200);
  };
  const closeMenuNow = () => {
    clearTimeout(closeTimer.current);
    setOpenMenu(null);
  };
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const { userData, auth, logout } = useContext(AuthContext);
  const { theme } = useGlobalContext();

  const { data: user } = useGetFetchProfile(
    `${import.meta.env.VITE_BASE_URL}/user-data/`
  );

  // Hero stilini qo'llash kerakligini aniqlash (tungi rejim yoki hero ustida)
  const useHeroStyle = theme === "night" || (theme === "light" && onHero);

  // Barcha komponentlar uchun yagona stil o'zgaruvchilari
  const logoSrc = "/new_logo_white_2026.png"; // Doim oq logo
  const textColor = "text-white"; // Doim oq matn
  // Menyu sig'masa, nomlar so'zlar bo'yicha ikki qatorga o'tadi (barcha tillarda).
  // Ruscha/inglizcha nomlar uzunroq, shuning uchun ularda shrift biroz ixchamroq.
  const compactNav = lang !== "uz";
  const navLinkClass = `${textColor} text-center leading-tight whitespace-normal`;
  const navSizeClass = compactNav
    ? "lg:[&>li>*]:px-1.5 xl:[&>li>*]:px-2.5 lg:text-[11px] xl:text-[14px] 2xl:text-[15px] 2xl:gap-1"
    : "lg:[&>li>*]:px-2 xl:[&>li>*]:px-3 lg:text-[12px] xl:text-[15px] 2xl:text-[16px] 2xl:gap-2";
  const borderColor = useHeroStyle ? "border-white/30" : "border-white/20";

  // Background style - hero ustida transparent, boshqa sahifalarda gradient
  const bgStyle = onHero
    ? { background: 'transparent' }
    : { background: 'linear-gradient(to right, rgba(0, 45, 109, 0.95), rgba(0, 61, 125, 0.95), rgba(0, 45, 109, 0.95))' };

  return (
    <div
      className="shadow-xl py-1 sm:py-2 fixed top-0 left-0 w-full z-30 backdrop-blur-md border-b border-white/10"
      style={bgStyle}
    >
      <div className="navbar gap-2 px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12 items-center">
        <div className="navbar-start lg:w-auto lg:shrink-0">
          <Link to="/" className="flex gap-2 sm:gap-3 items-center">
           <img
                src={logoSrc}
                alt="logo"
                className="w-12 xl:w-20 sm:w-16"
              />

            <h4
              className={`font-semibold xl:text-[16px] lg:text-[14px] sm:text-[12px] text-[10px] ${textColor}`}
            >
              {t("site.nameLine1")} <br />
              {t("site.nameLine2")} <br />
              {t("site.nameLine3")}
            </h4>
          </Link>
        </div>
        {/* Menyu qolgan joyni egallaydi; uzun nomlar (ru/en) ikki qatorga bo'linadi */}
        <div className="navbar-center hidden lg:flex flex-1 min-w-0 justify-center">
          <ul
            className={`menu lg:menu-horizontal flex-nowrap items-center max-w-full [&>li]:shrink border rounded-xl ${navSizeClass} ${borderColor}`}
          >
            {navMenu.map((item, index) => {
              if (item.to) {
                const active = pathname === item.to;
                return (
                  <li key={item.key}>
                    <Link to={item.to} className={`${navLinkClass} ${active ? "bg-white/15" : ""}`}>
                      {t(item.labelKey)}
                    </Link>
                  </li>
                );
              }
              const open = openMenu === item.key;
              const sectionActive = item.links.some((l) => isLinkActive(l, pathname));
              return (
                <li key={item.key} className="relative">
                  {/* Ichida ul/li ishlatilmaydi: daisyUI .menu ichma-ich ro'yxatlarga o'z padding/chiziqlarini qo'shadi */}
                  <div
                    className="relative"
                    onMouseEnter={() => openMenuNow(item.key)}
                    onMouseLeave={closeMenuSoon}
                    onFocus={() => openMenuNow(item.key)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget)) closeMenuSoon();
                    }}
                    onKeyDown={(e) => e.key === "Escape" && closeMenuNow()}
                  >
                    <div
                      tabIndex={0}
                      role="button"
                      aria-haspopup="true"
                      aria-expanded={open}
                      className={`${navLinkClass} gap-1 items-center flex w-auto rounded-lg ${
                        open || sectionActive ? "bg-white/15" : ""
                      }`}
                    >
                      {t(item.labelKey)}
                      <FaAngleDown
                        size={11}
                        className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                      />
                    </div>
                    <NavDropdownPanel
                      item={item}
                      open={open}
                      align={index >= navMenu.length - 3 ? "right" : "left"}
                      pathname={pathname}
                      onNavigate={closeMenuNow}
                      t={t}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="navbar-end lg:w-auto lg:shrink-0 2xl:gap-4 xl:gap-2 gap-2">
          {auth.refreshToken ? (
            <></>
          ) : (
            <Link
              to="/login"
              title={t("nav.login")}
              className={`hidden sm:flex px-2 py-2.5 xl:py-3 sm:border rounded-lg gap-1 items-center text-sm xl:text-[16px] ${textColor} ${borderColor}`}
            >
              {" "}
              <span className={compactNav ? "lg:hidden 2xl:inline" : "lg:hidden xl:inline"}>{t("nav.login")}</span> <FiLogIn className="text-sm xl:text-lg" />
            </Link>
          )}
{/* sun and moon */}
          {/* <label
            className={`hidden sm:inline-grid swap swap-rotate sm:p-2 sm:border rounded-lg ${textColor} ${borderColor}`}
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
              
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
            <svg
              className="swap-on h-6 w-6 xl:w-8 xl:h-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
          </label> */}

          {/* notification */}
          {/* <button
            className={`px-2 sm:py-2.5 sm:border rounded-lg flex items-center ${textColor} ${borderColor}`}
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
          </button> */}

          {/* Language Selector */}
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              aria-label={t("nav.language")}
              title={t("nav.language")}
              className={`px-3 py-2 xl:py-2.5 border rounded-lg flex items-center gap-2 ${textColor} ${borderColor} hover:bg-white/10 transition-colors`}
            >
              <img
                src={`/flags/${currentLanguage.flag}.svg`}
                alt={currentLanguage.name}
                className="w-5 h-3 sm:w-6 sm:h-4 object-cover rounded-sm"
              />
              <span className="hidden sm:inline text-sm xl:text-base font-medium">{currentLanguage.label}</span>
            </button>
            <ul tabIndex={0} className="dropdown-content menu bg-base-300 rounded-lg z-40 w-min p-2 shadow-lg border border-gray-700 mt-2">
              {languages.map((language) => (
                <li key={language.code}>
                  <button
                    type="button"
                    onClick={() => handleLanguageChange(language.code)}
                    className={`flex items-center gap-3 hover:bg-base-100 rounded-lg py-2 pr-8 ${language.code === lang ? "bg-base-100 font-semibold" : ""}`}
                    aria-current={language.code === lang ? "true" : undefined}
                  >
                    <img
                      src={`/flags/${language.flag}.svg`}
                      alt={language.name}
                      className="w-6 h-4 object-cover rounded-sm"
                    />
                    <span className="font-medium">{language.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

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
                className={`text-4xl outline-0 cursor-pointer ${textColor}`}
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
                    {t("nav.login")}
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
                    {t("nav.profile")}
                  </Link>
                )}
                { userData?.user_roles == "teacher" && (
                  <Link
                    className="justify-between text-[12px] sm:text-sm"
                    to="/profile"
                  >
                    {t("nav.profile")}
                  </Link>
                )}
              </li>
                )
              }
              {auth.refreshToken ? (
                <li>
                  <Link
                    to="/"
                    onClick={logout}
                    className=" text-[12px] sm:text-sm"
                  >
                    {t("nav.logout")}
                  </Link>
                </li>
              ) : (
                <></>
              )}

              <div className="relative my-2">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
                <div className="absolute inset-0 h-[1px] blur-md bg-gradient-to-r from-transparent via-blue-700/20 to-transparent"></div>
              </div>
              <div className="lg:hidden max-h-[70vh] overflow-y-auto">
                <li>
                  <Link to="/">{t("nav.home")}</Link>
                </li>
                {navMenu.map((item) =>
                  item.to ? (
                    <li key={item.key} className="pt-2">
                      <Link to={item.to}>{t(item.labelKey)}</Link>
                    </li>
                  ) : (
                    <React.Fragment key={item.key}>
                      <li className="menu-title pt-2">
                        <span>{t(item.labelKey)}</span>
                      </li>
                      {item.links.map((link) => (
                        <li key={link.to}>
                          {link.external ? (
                            <a href={link.to} target="_blank" rel="noopener noreferrer">
                              {t(link.labelKey)}
                            </a>
                          ) : (
                            <Link to={link.to}>{t(link.labelKey)}</Link>
                          )}
                        </li>
                      ))}
                    </React.Fragment>
                  )
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
