import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { HeroContext } from "../context/HeroContext";
import Footer from "../components/Footer";
import TestModeBanner from "../components/TestModeBanner";

function MainLayout() {
  const [onHero, setOnHero] = useState(true);
  const location = useLocation();

  // Har safar sahifa o'zgarganda tepaga scroll qilish
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <HeroContext.Provider value={{ onHero, setOnHero }} className="flex flex-col min-h-screen">
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer/>
      </footer>
      <TestModeBanner />
    </HeroContext.Provider>
  );
}

export default MainLayout;
