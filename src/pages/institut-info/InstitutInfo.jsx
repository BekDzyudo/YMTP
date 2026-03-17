import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation, Link } from "react-router-dom";
import { institutLinks } from "../../constants/institutLinks";
import { useHero } from "../../context/HeroContext";
import { FaUsers, FaChalkboardTeacher, FaBuilding, FaChartLine } from "react-icons/fa";

function InstitutInfo() {
  const location = useLocation();
  const currentLink = institutLinks.find((link) =>
    location.pathname.startsWith(link.to)
  );
  const { setOnHero } = useHero();

  useEffect(() => {
    setOnHero(false);
    return () => setOnHero(false);
  }, [setOnHero]);

  // Har safar sahifa o'zgarganda tepaga scroll qilish
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <section className="bg-slate-100">
      {/* Main Content */}
     <div className="sm:pt-26 pt-10 pb-8 sm:pb-12">
       <div className="px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          <div className="col-span-1 lg:col-span-9 xl:col-span-9">
            <Outlet />
          </div>

          <aside className="hidden lg:block lg:col-span-3 xl:col-span-3">
            <div className="sticky top-24 space-y-5 mb-25 sm:mb-35">
              {/* Navigation Card */}
              <div className="bg-base-100 rounded-2xl border border-base-300 p-3 sm:p-4">
                <h3 className="text-xl font-bold mb-3">Institut</h3>
                <ul className="menu w-full p-0 gap-1">
                  {institutLinks.map((link) => (
                    <li key={link.to} className="border-t border-base-300 py-1">
                      <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                          `rounded-lg px-3 py-3 text-[16px] transition-all duration-200 ${
                            isActive
                              ? "bg-[#eaeef5] text-blue-600 font-semibold"
                              : "hover:bg-base-200"
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Institut Statistics Card */}
              <div className="bg-base-100 rounded-2xl border border-base-100 p-4 shadow-sm overflow-hidden">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FaChartLine className="text-blue-600" />
                  Institut statistikasi
                </h3>
                
                <div className="space-y-3">
                  {/* Xodimlar */}
                  <div className="relative group">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-white p-3 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                          <FaUsers className="text-blue-600 text-xl" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-600 font-medium">Xodimlar</p>
                          <p className="text-2xl font-bold text-blue-700">150+</p>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Ilmiy darajaga ega</span>
                          <span>42%</span>
                        </div>
                        <div className="h-1.5 bg-blue-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{width: '42%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* O'qituvchilar */}
                  <div className="relative group">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-white p-3 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                          <FaChalkboardTeacher className="text-green-600 text-xl" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-600 font-medium">O'qituvchilar</p>
                          <p className="text-2xl font-bold text-green-700">80+</p>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Professor-o'qituvchilar</span>
                          <span>85%</span>
                        </div>
                        <div className="h-1.5 bg-green-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-600 rounded-full" style={{width: '85%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bo'limlar */}
                  <div className="relative group">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-3 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                          <FaBuilding className="text-purple-600 text-xl" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-600 font-medium">Bo'limlar</p>
                          <p className="text-2xl font-bold text-purple-700">12</p>
                          <p className="text-xs text-purple-600 mt-1">
                            Strukturaviy bo'linmalar
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom decoration */}
                <div className="mt-4 pt-4 border-t border-base-300">
                  <p className="text-xs text-center text-gray-500 italic">
                    Ma'lumotlar 2026 yil mart holatiga
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
     </div>
    </section>
  );
}

export default InstitutInfo;