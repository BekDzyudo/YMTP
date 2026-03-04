import React, { useState, useEffect, useRef } from 'react'
import { FaComments, FaGraduationCap, FaVideo, FaTrophy, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function InteractiveServices() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef(null);

  const services = [
    {
      id: 1,
      title: "Onlayn konsultatsiya",
      description: "Mutaxassislar bilan bevosita muloqot qiling va maslahat oling",
      icon: <FaComments className="text-4xl" />,
      gradient: "from-blue-500 to-cyan-500",
      link: "/consultation",
    },
    {
      id: 2,
      title: "Elektron ta'lim",
      description: "Zamonaviy onlayn kurslar va o'quv materiallari bilan tanishing",
      icon: <FaGraduationCap className="text-4xl" />,
      gradient: "from-purple-500 to-pink-500",
      link: "/e-learning",
    },
    {
      id: 3,
      title: "Virtual seminarlar",
      description: "Ekspertlar bilan jonli translyatsiya va vebinarlarda qatnashing",
      icon: <FaVideo className="text-4xl" />,
      gradient: "from-emerald-500 to-teal-500",
      link: "/webinars",
    },
    {
      id: 4,
      title: "Konkurslar",
      description: "Tanlovlar va olimpiadalarda ishtirok eting, g'olib bo'ling",
      icon: <FaTrophy className="text-4xl" />,
      gradient: "from-orange-500 to-red-500",
      link: "/competitions",
    },
      {
      id: 1,
      title: "Onlayn konsultatsiya",
      description: "Mutaxassislar bilan bevosita muloqot qiling va maslahat oling",
      icon: <FaComments className="text-4xl" />,
      gradient: "from-blue-500 to-cyan-500",
      link: "/consultation",
    },
    {
      id: 2,
      title: "Elektron ta'lim",
      description: "Zamonaviy onlayn kurslar va o'quv materiallari bilan tanishing",
      icon: <FaGraduationCap className="text-4xl" />,
      gradient: "from-purple-500 to-pink-500",
      link: "/e-learning",
    },
    {
      id: 3,
      title: "Virtual seminarlar",
      description: "Ekspertlar bilan jonli translyatsiya va vebinarlarda qatnashing",
      icon: <FaVideo className="text-4xl" />,
      gradient: "from-emerald-500 to-teal-500",
      link: "/webinars",
    },
    {
      id: 4,
      title: "Konkurslar",
      description: "Tanlovlar va olimpiadalarda ishtirok eting, g'olib bo'ling",
      icon: <FaTrophy className="text-4xl" />,
      gradient: "from-orange-500 to-red-500",
      link: "/competitions",
    }
  ];

  // Seamless infinite loop uchun: boshiga va oxiriga clone qo'shamiz
  const extendedServices = [
    services[services.length - 1], // Last item at start
    ...services,
    services[0], // First item at end
  ];

  // Auto-slide function
  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3500);
  };

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  // Handle seamless loop
  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(services.length);
    } else if (currentIndex === services.length + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  };

  // Start auto-slide on mount
  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);



  return (
    <section 
      className="relative w-full bg-gradient-to-b from-base-100 via-base-200 to-base-100 py-16 md:py-24 overflow-hidden"
    >
      <div className="px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-blue-600 bg-clip-text text-transparent font-serif mb-2">
                Interaktiv xizmatlar
              </h2>
            </div>
            <Link 
              to="/services" 
              className="btn rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 bg-blue-600 text-white border-none"
            >
              <span>Barchasi</span>
              <FaArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
              style={{ 
                transform: `translateX(-${currentIndex * (100/3)}%)`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedServices.map((service, index) => (
                <div
                  key={`${service.id}-${index}`}
                  className="w-1/3 shrink-0 px-2 sm:px-3"
                >
                  <div className="group relative h-full">
                    <Link to={service.link}>
                      <div className={`
                        relative h-full rounded-2xl overflow-hidden 
                        shadow-lg hover:shadow-xl border-0
                        transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02]
                        min-h-[180px] sm:min-h-[200px]
                        bg-gradient-to-br ${service.gradient}
                      `}>
                        {/* Top Gradient Bar - Removed */}
                        
                        {/* Horizontal Layout */}
                        <div className="relative flex items-center justify-center gap-4 p-4 sm:p-6 h-full">
                          {/* Left: Icon Circle */}
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-md z-10">
                            <div className="text-white text-2xl sm:text-3xl">
                              {service.icon}
                            </div>
                          </div>

                          {/* Right: Content */}
                          <div className="flex-1 z-10">
                            <h3 className="text-lg sm:text-xl font-bold mb-2 text-white drop-shadow-md transition-all duration-300">
                              {service.title}
                            </h3>
                            
                            <p className="text-white/90 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3 drop-shadow">
                              {service.description}
                            </p>

                            {/* CTA Button */}
                            <div className="flex items-center gap-2 text-white font-semibold group/btn">
                              <span className="text-xs sm:text-sm drop-shadow">Batafsil</span>
                              <FaArrowRight 
                                className="transition-transform duration-300 group-hover/btn:translate-x-2" 
                                size={12} 
                              />
                            </div>
                          </div>

                          {/* Background Transparent Icon - Right Side */}
                          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-8xl sm:text-9xl text-white/10 pointer-events-none transition-all duration-500 group-hover:text-white/20 group-hover:scale-110">
                            {React.cloneElement(service.icon, { className: "" })}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
    </section>
  )
}

export default InteractiveServices
