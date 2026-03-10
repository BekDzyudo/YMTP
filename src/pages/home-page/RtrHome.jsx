import React from 'react'
import { FaFileAlt, FaFilePowerpoint, FaVideo, FaImage, FaCogs, FaDownload, FaSearch, FaArrowRight, FaBookOpen } from 'react-icons/fa'
import { Link } from 'react-router-dom';

function RtrHome() {

  const resources = [
    {
      icon: <FaFileAlt size={28} />,
      title: "Ma'ruza Matnlari",
      description: "Kasbiy fanlar bo'yicha ma'ruza konspektlari va dars ishlanmalari",
      color: "from-blue-500 to-blue-600",
      bgImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop"
    },
    {
      icon: <FaFilePowerpoint size={28} />,
      title: "Taqdimotlar",
      description: "Interaktiv PowerPoint taqdimotlari va slaydlar to'plami",
      color: "from-green-500 to-green-600",
      bgImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop"
    },
    {
      icon: <FaVideo size={28} />,
      title: "Media materiallar",
      description: "Video darsliklar, audio va multimedia kontentlar",
      color: "from-red-500 to-red-600",
      bgImage: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=1200&auto=format&fit=crop"
    },
    {
      icon: <FaImage size={28} />,
      title: "Ko'rgazmali materiallar",
      description: "Plakatlar, chizmalar va vizual infografikalar",
      color: "from-purple-500 to-purple-600",
      bgImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop"
    },
    {
      icon: <FaCogs size={28} />,
      title: "Ta'lim texnologiyalari",
      description: "Zamonaviy o'qitish metodikasi va raqamli texnologiyalar",
      color: "from-orange-500 to-orange-600",
      bgImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"
    },
    {
      icon: <FaBookOpen size={28} />,
      title: "Nazariy-amaliy topshiriqlar",
      description: "Test savollari, mashqlar va amaliy topshiriqlar banki",
      color: "from-cyan-500 to-cyan-600",
      bgImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  const stats = [
    { value: "1,500+", label: "Ta'lim resurslari" },
    { value: "50+", label: "Fanlar" },
    { value: "10K+", label: "Yuklab olishlar" },
    { value: "24/7", label: "Onlayn kirish" }
  ];

  return (
    <section className='relative w-full bg-linear-to-br from-gray-50 via-white to-blue-50 py-12 sm:py-16 md:py-20 pb-20 sm:pb-24 md:pb-30 overflow-hidden'>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-200 rounded-full blur-3xl"></div>
      </div>

      <div className='relative px-3.5 sm:px-5 mx-auto w-full 2xl:w-9/12'>
        
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col items-center sm:items-start lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8">
            {/* Left - Text */}
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl text-center sm:text-start md:text-5xl lg:text-5xl xl:text-6xl font-serif font-black mb-4 sm:mb-6 leading-tight">
                <span className="text-[#0d4ea3] bg-clip-text">
                  Raqamli ta'lim resurslari
                </span>
              </h1>
              
              <p className="text-gray-600 text-xs text-center sm:text-start sm:text-lg md:text-xl max-w-2xl leading-relaxed">
                Kasbiy fanlar bo'yicha ma'ruza matnlari, taqdimotlar, video darslar, plakatlar 
                va zamonaviy o'qitish texnologiyalari to'plami
              </p>
            </div>

            {/* Right - Button */}
            <div className="lg:shrink-0">
              <Link 
                to="/digital-educational-resources" 
                rel="noopener noreferrer"
                className="rounded-full group inline-flex px-4 py-2 sm:px-8 sm:py-4 bg-gradient-to-br from-[#194882] to-info text-white font-bold shadow-xl sm:hover:shadow-2xl transition-all duration-300 sm:hover:scale-105"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xs sm:text-lg">Batafsil ma'lumot</span>
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300 text-sm sm:text-base" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
          {resources.map((resource, index) => (
            <div 
              key={index}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-2 min-h-70 sm:min-h-75 md:min-h-80"
            >
              {/* Background Image - Full */}
              <div 
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${resource.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>

              {/* Dark Gradient Overlay - Bottom to Top (stronger at bottom) */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent"></div>

              {/* Color Gradient Overlay */}
              <div className={`absolute inset-0 bg-linear-to-t ${resource.color} opacity-15`}></div>

              {/* Content - Positioned at bottom */}
              <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-6 md:p-8">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-linear-to-br ${resource.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                  <div className="text-xl sm:text-2xl md:text-[28px]">
                    {resource.icon}
                  </div>
                </div>
                
                <h3 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">
                  {resource.title}
                </h3>
                
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  {resource.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default RtrHome