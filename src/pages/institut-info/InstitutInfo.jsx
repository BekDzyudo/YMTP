import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation, Link } from "react-router-dom";
import { institutLinks } from "../../constants/institutLinks";
import { useHero } from "../../context/HeroContext";

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
            <div className="bg-base-100 rounded-2xl border border-base-300 p-3 sm:p-4 sticky top-24">
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
          </aside>
        </div>
      </div>
     </div>
    </section>
  );
}

export default InstitutInfo;