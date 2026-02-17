import React from 'react'
import { FaCalendar, FaArrowRight, FaNewspaper, FaTrophy, FaUsers, FaGraduationCap } from 'react-icons/fa'

function News() {
  const newsData = [
    {
      id: 1,
      title: "Kasbiy ta'lim sohasida yangi dasturlar taqdim etildi",
      excerpt: "Respublika miqyosida kasbiy ta'lim tizimini modernizatsiya qilish bo'yicha yangi ta'lim dasturlari ishga tushirildi...",
      date: "15 Fevral 2026",
      image: "/rtr_bg7.jpg",
      category: "Ta'lim",
      icon: <FaGraduationCap size={20} />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Xalqaro olimpiadada yuqori natijalar",
      excerpt: "O'quvchilarimiz xalqaro kasbiy ko'nikma olimpiadasida oltin va kumush medallar bilan qaytishdi...",
      date: "12 Fevral 2026",
      image: "/rtr_bg4.jpg",
      category: "Yutuqlar",
      icon: <FaTrophy size={20} />,
      gradient: "from-amber-500 to-orange-500"
    },
    {
      id: 3,
      title: "O'qituvchilar uchun malaka oshirish kurslari",
      excerpt: "Institut huzurida o'qituvchilar uchun zamonaviy ta'lim texnologiyalari bo'yicha malaka oshirish kurslari boshlandi...",
      date: "10 Fevral 2026",
      image: "/rtr_bg8.png",
      category: "Tadbirlar",
      icon: <FaUsers size={20} />,
      gradient: "from-violet-500 to-purple-500"
    },
    {
      id: 4,
      title: "Raqamli ta'lim platformasi yangilandi",
      excerpt: "Yangilangan platforma yanada ko'proq imkoniyatlar va interaktiv darslar bilan to'ldirildi...",
      date: "08 Fevral 2026",
      image: "/rtr_bg3.jpg",
      category: "Texnologiya",
      icon: <FaNewspaper size={20} />,
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      id: 5,
      title: "Duallashgan ta'lim tizimi kengaymoqda",
      excerpt: "Korxonalar bilan hamkorlikda amalga oshiriladigan dual ta'lim dasturlari yangi yo'nalishlar bilan boyitildi...",
      date: "05 Fevral 2026",
      image: "/rtr_bg5.jpg",
      category: "Hamkorlik",
      icon: <FaUsers size={20} />,
      gradient: "from-pink-500 to-rose-500"
    },
    {
      id: 6,
      title: "Talabalar uchun grant dasturi e'lon qilindi",
      excerpt: "Ijodkor va iqtidorli talabalar uchun maxsus grant dasturlari ishga tushirildi...",
      date: "01 Fevral 2026",
      image: "/rtr_bg7.jpg",
      category: "Grant",
      icon: <FaTrophy size={20} />,
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section className='relative h-screen w-full bg-gradient-to-b from-base-100 via-base-200 to-base-100 py-12 overflow-hidden'>
      <div className='h-full px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12 flex flex-col'>
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col items-start gap-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent font-serif">
                So'nggi yangiliklar
              </h2>
              <p className="text-base-content/70 text-sm sm:text-base max-w-2xl">
            Kasbiy ta'lim sohasidagi eng so'nggi yangiliklar va voqealar
          </p>
            </div>
            <button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-blue-200 hover:bg-blue-600 hover:text-white cursor-pointer rounded-full text-primary font-semibold group/btn transition-all duration-300 border border-primary/20 hover:border-primary/40">
              <span>Barcha yangiliklar</span>
              <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-2" size={14} />
            </button>
          </div>
          
        </div>

        {/* News Layout - Different for each breakpoint */}
        <div className="flex-1 overflow-hidden">
          
          {/* 2XL+ Layout: 1 Featured + 4 Side Cards */}
          <div className="hidden 2xl:grid 2xl:grid-cols-5 gap-6 h-full">
            {/* Featured News - Large Card */}
            <div className="2xl:col-span-3 group relative">
              
              <div className="relative h-full bg-base-100 rounded-3xl overflow-hidden shadow-lg border border-base-300">
                <div className="relative h-full overflow-hidden">
                  <img 
                    src={newsData[0].image} 
                    alt={newsData[0].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  
                  <div className={`absolute top-6 left-6 px-4 py-2 rounded-full bg-gradient-to-r ${newsData[0].gradient} flex items-center gap-2 shadow-xl`}>
                    <span className="text-white">{newsData[0].icon}</span>
                    <span className="text-white font-semibold">{newsData[0].category}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-2 text-white/90 mb-3">
                      <FaCalendar size={14} />
                      <span className="text-sm font-medium">{newsData[0].date}</span>
                    </div>
                    
                    <h3 className="text-3xl lg:text-4xl font-black text-white mb-3 leading-tight">
                      {newsData[0].title}
                    </h3>
                    
                    <p className="text-white/80 text-base line-clamp-2 max-w-3xl">
                      {newsData[0].excerpt}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Cards - 4 items in 2x2 grid */}
            <div className="2xl:col-span-2 grid grid-cols-2 gap-4">
              {newsData.slice(1, 5).map((news, idx) => (
                <div key={news.id} className="group relative">
                  
                  <div className="relative h-full bg-base-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl border border-base-300 flex flex-col transition-all duration-300 hover:-translate-y-1">
                    
                    <div className="relative w-full aspect-[5/3] overflow-hidden flex-shrink-0">
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      <div className={`absolute top-2 left-2 px-2 py-1 rounded-full bg-gradient-to-r ${news.gradient} flex items-center gap-1 shadow-lg`}>
                        <span className="text-white text-xs">{news.icon}</span>
                        <span className="text-white text-xs font-semibold">{news.category}</span>
                      </div>
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-2">
                          {news.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1 text-base-content/60">
                          <FaCalendar size={10} />
                          <span className="text-xs">{news.date}</span>
                        </div>
                        <button className="flex items-center gap-1 text-primary font-semibold text-xs group/btn">
                          <span>Batafsil</span>
                          <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LG to XL Layout: 2 columns equal cards */}
          <div className="hidden lg:grid 2xl:hidden lg:grid-cols-2 gap-6 h-full">
            {newsData.slice(0, 4).map((news, idx) => (
              <div key={news.id} className="group relative">
                
                <div className="relative h-full bg-base-100 rounded-3xl overflow-hidden shadow-lg border border-base-300 flex flex-col">
                  
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-full bg-gradient-to-r ${news.gradient} flex items-center gap-2 shadow-lg`}>
                      <span className="text-white">{news.icon}</span>
                      <span className="text-white text-sm font-semibold">{news.category}</span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-1.5 text-base-content/60 mb-2">
                      <FaCalendar size={12} />
                      <span className="text-xs font-medium">{news.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300 flex-1">
                      {news.title}
                    </h3>
                    
                    <button className="flex items-center gap-2 text-primary font-semibold text-sm group/btn transition-all duration-300 mt-auto">
                      <span>Batafsil</span>
                      <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-2" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SM to MD Layout: 2 columns */}
          <div className="hidden sm:grid lg:hidden sm:grid-cols-2 gap-4 overflow-y-auto h-full">
            {newsData.slice(0, 4).map((news, idx) => (
              <div key={news.id} className="group relative">
                
                <div className="relative bg-base-100 rounded-2xl overflow-hidden shadow-lg border border-base-300 flex flex-col">
                  
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    <div className={`absolute top-2 left-2 px-2 py-1 rounded-full bg-gradient-to-r ${news.gradient} flex items-center gap-1.5 shadow-lg`}>
                      <span className="text-white text-xs">{news.icon}</span>
                      <span className="text-white text-xs font-semibold">{news.category}</span>
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="flex items-center gap-1 text-base-content/60 mb-2">
                      <FaCalendar size={10} />
                      <span className="text-xs">{news.date}</span>
                    </div>
                    
                    <h3 className="text-sm font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {news.title}
                    </h3>
                    
                    <button className="flex items-center gap-1 text-primary font-semibold text-xs group/btn">
                      <span>Batafsil</span>
                      <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Layout: 1 column */}
          <div className="grid sm:hidden grid-cols-1 gap-4 overflow-y-auto h-full">
            {newsData.slice(0, 4).map((news, idx) => (
              <div key={news.id} className="group relative">
                
                <div className="relative bg-base-100 rounded-2xl overflow-hidden shadow-lg border border-base-300 flex">
                  
                  <div className="relative w-1/3 flex-shrink-0 overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r ${news.gradient} mb-1.5`}>
                        <span className="text-white text-xs">{news.icon}</span>
                      </div>
                      
                      <h3 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-1">
                        {news.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-1 text-base-content/60">
                      <FaCalendar size={10} />
                      <span className="text-xs">{news.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default News