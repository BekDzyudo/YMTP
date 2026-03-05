import React, { useState, useEffect, useRef } from 'react'
import { FaFolderOpen, FaBook, FaCertificate, FaLightbulb, FaFileAlt, FaRocket, FaCheckCircle, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom';

function EduProfHome() {
  const [isVisible, setIsVisible] = useState(false);
  const cardsRef = useRef(null);
  const prevScrollY = useRef(0);
  const hasShownOnce = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > prevScrollY.current;
        
        if (entry.isIntersecting) {
          if (isScrollingDown) {
            // Tepadan pastga scroll qilganda
            if (!hasShownOnce.current) {
              // Birinchi safar - animatsiya
              setIsVisible(true);
              hasShownOnce.current = true;
            } else {
              // Keyingi holatlar - animatsiyasiz ochiq
              setIsVisible(true);
            }
          } else if (hasShownOnce.current) {
            // Pastdan tepaga scroll qilganda (keyingi holatlar) - animatsiya
            setIsVisible(false);
            setTimeout(() => setIsVisible(true), 10);
          }
        } else if (isScrollingDown) {
          // Pastga scroll qilganda va ko'rinishdan chiqsa reset
          setIsVisible(false);
        }
        
        prevScrollY.current = currentScrollY;
      },
      { threshold: 0.2 }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => {
      if (cardsRef.current) {
        observer.unobserve(cardsRef.current);
      }
    };
  }, []);
  
  const features = [
    {
      icon: <FaFileAlt size={28} />,
      title: "O'quv Me'yoriy Hujjatlari",
      description: "O'quv reja, dastur va me'yoriy-huquqiy hujjatlar to'plami"
    },
    {
      icon: <FaBook size={28} />,
      title: "O'quv Adabiyotlari",
      description: "Kasbiy fanlar bo'yicha o'quv qo'llanmalari va darsliklar"
    },
    {
      icon: <FaCertificate size={28} />,
      title: "Malaka Oshirish Sertifikatlari",
      description: "Davlat namunasidagi malaka oshirish sertifikatlari"
    },
    {
      icon: <FaFolderOpen size={28} />,
      title: "O'qitish Materiallari To'plami",
      description: "Darslik, qo'llanma va o'quv materiallarining keng to'plami"
    },
  ];

  const benefits = [
    "Malaka oshirish sertifikatlari",
    "O‘quv adabiyotlari",
    "O‘qitish materiallari to‘plami",
    "O‘quv reja va dasturlari",
    "Qisqa muddatli kurslar",
    "Metodik tavsiyalar"
  ];

  return (
    <section className='relative w-full bg-linear-to-br from-blue-50 via-white to-cyan-50 dark:from-base-300 dark:via-base-100 dark:to-base-300 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden'>
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className='relative h-full px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12 flex flex-col'>
        
        {/* Main Content Grid */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <FaRocket className="text-blue-600 dark:text-blue-400" size={16} />
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm">Kasbiy Ta'lim Hujjatlar</span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 leading-tight">
                <span className="bg-linear-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent font-serif">
                  Metodik ta'minlash
                </span>
                <br />
                <span className="text-base-content font-serif">
                  axborot tizimi
                </span>
              </h1>
              <p className="text-base-content/70 text-base sm:text-lg md:text-xl max-w-xl">
                Kasbiy ta'lim sohasidagi barcha metodik hujjatlar jamlanmasi. 
                Bilimingizni oshiring, ko'nikmalaringizni rivojlantiring!
              </p>
            </div>

            {/* Benefits List */}
            <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 shrink-0" size={14} />
                  <span className="text-base-content/80 text-xs sm:text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link 
                to="/methodological-support" 
                className="group flex items-center gap-2 px-4 py-2 sm:px-8 sm:py-4 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-full text-white font-bold shadow-lg sm:hover:shadow-xl transition-all duration-300 sm:hover:scale-105"
              >
                <span className="text-xs sm:text-base">Batafsil ma'lumot</span>
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2" size={16} />
              </Link>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className={`group relative bg-white dark:bg-base-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl border border-base-300 transition-all duration-700 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
                
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-r from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-xl sm:text-2xl md:text-[28px]">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-base-content font-bold text-sm sm:text-base mb-1.5 sm:mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-base-content/60 text-xs sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EduProfHome