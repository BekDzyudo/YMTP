import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { HeroContext } from "../context/HeroContext";
import Footer from "../components/Footer";

function MainLayout() {
  const [onHero, setOnHero] = useState(true);
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
    </HeroContext.Provider>
  );
}

export default MainLayout;
