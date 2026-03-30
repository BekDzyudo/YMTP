import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { HeroContext } from "../context/HeroContext";
import Footer from "../components/Footer";
import TestModeBanner from "../components/TestModeBanner";
import { CalendarProvider } from "../context/CalendarContext";
import FloatingActionButton from "../components/FloatingActionButton";
import CalendarModal from "../components/CalendarModal";
import SEO from "../components/SEO";

function MainLayout() {
  const location = useLocation();
  
  // onHero faqat Home sahifasida (/) true bo'ladi, boshqa sahifalarda false
  const [onHero, setOnHero] = useState(location.pathname === '/');

  // pathname o'zgarganda onHero ni yangilash
  useEffect(() => {
    setOnHero(location.pathname === '/');
  }, [location.pathname]);

  // Har safar sahifa o'zgarganda tepaga scroll qilish
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <CalendarProvider>
      <HeroContext.Provider value={{ onHero, setOnHero }}>
        {/* Default SEO - agar sahifa o'zi ko'rsatmasa */}
        <SEO 
          title="Kasbiy ta'limni rivojlantirish instituti"
          description="O'zbekiston Respublikasi Kasbiy ta'limni rivojlantirish instituti - kasbiy ta'lim, treninglar, sertifikatlashtirish"
          keywords="kasb-hunar, kasbiy ta'lim, treninglar, sertifikat, o'zbekiston"
        />
        
        <div className="flex flex-col min-h-screen">
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
          
          {/* Floating Action Button */}
          <FloatingActionButton />
          
          {/* Calendar Modal */}
          <CalendarModal />
        </div>
      </HeroContext.Provider>
    </CalendarProvider>
  );
}

export default MainLayout;
