import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { HeroContext } from "../context/HeroContext";
import Footer from "../components/Footer";
import TestModeBanner from "../components/TestModeBanner";
import { CalendarProvider } from "../context/CalendarContext";
import FloatingActionButton from "../components/FloatingActionButton";
import CalendarModal from "../components/CalendarModal";

function MainLayout() {
  const [onHero, setOnHero] = useState(true);
  const location = useLocation();

  // Har safar sahifa o'zgarganda tepaga scroll qilish
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <CalendarProvider>
      <HeroContext.Provider value={{ onHero, setOnHero }}>
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
