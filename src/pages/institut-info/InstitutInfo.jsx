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
    <section className="pt-26 pb-8 sm:pb-12">
      {/* Main Content */}
      <div className="px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          <div className="lg:col-span-8 xl:col-span-9">
            <Outlet />
          </div>

          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="bg-base-100 rounded-2xl border border-base-300 p-3 sm:p-4 sticky top-24">
              <h3 className="text-lg font-bold mb-3">Institut bo'limlari</h3>
              <ul className="menu w-full p-0 gap-1">
                {institutLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `rounded-xl px-3 py-2.5 transition-all duration-200 ${
                          isActive
                            ? "bg-primary/15 text-primary font-semibold"
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
    </section>
  );
}

export default InstitutInfo;