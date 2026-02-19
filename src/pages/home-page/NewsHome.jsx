import React from 'react'
import { FaCalendar, FaArrowRight, FaNewspaper, FaTrophy, FaUsers, FaGraduationCap, FaHandshake, FaChalkboardTeacher, FaLightbulb } from 'react-icons/fa'
import useGetFetch from '../../hooks/useGetFetch';

function News() {

  const {data, isPending, error} = useGetFetch(`${import.meta.env.VITE_BASE_URL}/shared_app/yangiliklar/latest/`)
  
  // Kategoriyaga mos icon va gradient
  const getCategoryStyle = (kategoriya) => {
    const styles = {
      "Uchrashuv": {
        icon: <FaHandshake size={20} />,
        gradient: "from-blue-500 to-cyan-500"
      },
      "Talim": {
        icon: <FaGraduationCap size={20} />,
        gradient: "from-emerald-500 to-teal-500"
      },
      "Yutuqlar": {
        icon: <FaTrophy size={20} />,
        gradient: "from-amber-500 to-orange-500"
      },
      "Tadbir": {
        icon: <FaUsers size={20} />,
        gradient: "from-violet-500 to-purple-500"
      },
      "Texnologiya": {
        icon: <FaLightbulb size={20} />,
        gradient: "from-emerald-500 to-teal-500"
      },
      "Hamkorlik": {
        icon: <FaHandshake size={20} />,
        gradient: "from-pink-500 to-rose-500"
      },
      "Elon": {
        icon: <FaNewspaper size={20} />,
        gradient: "from-indigo-500 to-blue-500"
      }
    };
    
    return styles[kategoriya] || {
      icon: <FaNewspaper size={20} />,
      gradient: "from-blue-500 to-cyan-500"
    };
  };

  // Sanani formatlash
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
      "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // HTML taglarini olib tashlash
  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Title ni kesish (70 belgi, so'z chegarasida)
  const truncateTitle = (text, maxLength = 70) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substr(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return truncated.substr(0, lastSpace) + '...';
  };

  // Excerpt ni kesish (90 belgi, so'z chegarasida)
  const truncateExcerpt = (text, maxLength = 90) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substr(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return truncated.substr(0, lastSpace) + '...';
  };

  const newsData = data?.map(item => ({
    id: item.id,
    title: item.title,
    excerpt: stripHtml(item.text || ""), // HTML taglarni olib tashlangan text
    date: formatDate(item.sana),
    image: item.rasm,
    category: item.kategoriya,
    icon: getCategoryStyle(item.kategoriya).icon,
    gradient: getCategoryStyle(item.kategoriya).gradient
  })) || [];

  if (isPending) {
    return (
      <section className='relative h-screen w-full bg-gradient-to-b from-base-100 via-base-200 to-base-100 py-12 overflow-hidden flex items-center justify-center'>
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content/70">Yangiliklar yuklanmoqda...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='relative h-screen w-full bg-gradient-to-b from-base-100 via-base-200 to-base-100 py-12 overflow-hidden flex items-center justify-center'>
        <div className="text-center">
          <p className="text-error">Xatolik yuz berdi: {error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className='relative min-h-screen w-full bg-gradient-to-b from-base-100 via-base-200 to-base-100 py-12'>
      <div className='px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12 flex flex-col'>
        
        {/* Section Header */}
        <div className="mb-5 md:mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col items-center sm:items-start gap-1 sm:gap-2 md:gap-4">
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent font-serif">
                So'nggi yangiliklar
              </h2>
              <p className="text-base-content/70 text-sm sm:text-base max-w-2xl text-center sm:text-start">
            Kasbiy ta'lim sohasidagi eng so'nggi yangiliklar va voqealar
          </p>
            </div>
            <button className="hidden text-sm md:text-[16px] sm:flex items-center gap-2 px-6 py-3 bg-blue-200 hover:bg-blue-600 hover:text-white cursor-pointer rounded-full text-primary font-semibold group/btn transition-all duration-300 border border-primary/20 hover:border-primary/40">
              <span>Barcha yangiliklar</span>
              <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-2" size={14} />
            </button>
          </div>
          
        </div>

        {/* News Layout - Different for each breakpoint */}
        <div className="pb-6">
          
          {newsData && newsData.length > 0 ? (
            <>
          {/* 2XL+ Layout: 1 Featured + 4 Side Cards */}
          <div className="hidden 2xl:grid 2xl:grid-cols-5 gap-6 h-[600px]">
            {/* Featured News - Large Card */}
            <div className="2xl:col-span-3 group relative min-h-0">
              <div className="relative h-full bg-base-100 rounded-3xl overflow-hidden shadow-lg border border-base-300">
                <div className="relative h-full overflow-hidden">
                  <img 
                    src={newsData[0].image} 
                    alt={newsData[0].title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  <div className={`absolute top-6 left-6 px-4 py-2 rounded-full bg-gradient-to-r ${newsData[0].gradient} flex items-center gap-2 shadow-xl`}>
                    <span className="text-white">{newsData[0].icon}</span>
                    <span className="text-white font-semibold">{newsData[0].category}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-2 text-white/90 mb-3">
                      <FaCalendar size={14} />
                      <span className="text-sm font-medium">{newsData[0].date}</span>
                    </div>
                    
                    <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                      {newsData[0].title}
                    </h3>
                    
                    <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold group/btn transition-all duration-300 border border-white/20 hover:border-white/40 cursor-pointer">
                      <span>Batafsil</span>
                      <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-2" size={14} />
                    </button>
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
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                      
                      <div className={`absolute top-2 left-2 px-2 py-1 rounded-full bg-gradient-to-r ${news.gradient} flex items-center gap-1 shadow-lg`}>
                        <span className="text-white text-xs">{news.icon}</span>
                        <span className="text-white text-xs font-semibold">{news.category}</span>
                      </div>
                    </div>

                    <div className="p-3 flex-1 flex flex-col">
                      <div className="flex items-center gap-1 text-base-content/60 mb-2">
                        <FaCalendar size={10} />
                        <span className="text-xs">{news.date}</span>
                      </div>
                      
                      <h3 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-2">
                        {truncateTitle(news.title)}
                      </h3>
                      
                      <p className="text-xs text-base-content/60 line-clamp-2 mb-2 flex-1">
                        {truncateExcerpt(news.excerpt)}
                      </p>
                      
                      <div className="flex justify-end">
                        <button className="flex items-center gap-1 text-primary font-semibold text-xs group/btn flex-shrink-0 cursor-pointer">
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
          <div className="hidden md:grid 2xl:hidden grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 h-min">
            {newsData.slice(0, 4).map((news, idx) => (
              <div key={news.id} className="group relative">
                
                <div className="relative h-full bg-base-100 rounded-3xl overflow-hidden shadow-lg border border-base-300 flex flex-col">
                  
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
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
                    
                    <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-2">
                      {truncateTitle(news.title)}
                    </h3>
                    
                    <p className="text-sm text-base-content/60 line-clamp-2 mb-3 flex-1">
                      {truncateExcerpt(news.excerpt)}
                    </p>
                    
                    <div className="flex justify-end">
                      <button className="flex items-center gap-2 text-primary font-semibold text-sm group/btn transition-all duration-300 flex-shrink-0 cursor-pointer">
                        <span>Batafsil</span>
                        <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-2" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SM to MD Layout: 2 columns */}
          <div className="hidden sm:grid lg:hidden sm:grid-cols-2 gap-4">
            {newsData.slice(0, 4).map((news, idx) => (
              <div key={news.id} className="group relative">
                
                <div className="relative bg-base-100 rounded-2xl overflow-hidden shadow-lg border border-base-300 flex flex-col">
                  
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    <div className={`absolute top-2 left-2 px-2 py-1 rounded-full bg-gradient-to-r ${news.gradient} flex items-center gap-1.5 shadow-lg`}>
                      <span className="text-white text-xs">{news.icon}</span>
                      <span className="text-white text-xs font-semibold">{news.category}</span>
                    </div>
                  </div>

                  <div className="p-3 flex-1 flex flex-col">
                    <div className="flex items-center gap-1 text-base-content/60 mb-2">
                      <FaCalendar size={10} />
                      <span className="text-xs">{news.date}</span>
                    </div>
                    
                    <h3 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-2">
                      {truncateTitle(news.title)}
                    </h3>
                    
                    <p className="text-xs text-base-content/60 line-clamp-2 mb-2 flex-1">
                      {truncateExcerpt(news.excerpt)}
                    </p>
                    
                    <div className="flex justify-end">
                      <button className="flex items-center gap-1 text-primary font-semibold text-xs group/btn flex-shrink-0 cursor-pointer">
                        <span>Batafsil</span>
                        <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Layout: 1 column */}
          <div className="grid sm:hidden grid-cols-1 gap-4">
            {newsData.slice(0, 4).map((news, idx) => (
              <div key={news.id} className="group relative">
                
                <div className="relative bg-base-100 rounded-2xl overflow-hidden shadow-lg border border-base-300 flex flex-col">
                  
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    <div className={`absolute top-2 left-2 px-2 py-1 rounded-full bg-gradient-to-r ${news.gradient} flex items-center gap-1.5 shadow-lg`}>
                      <span className="text-white text-xs">{news.icon}</span>
                      <span className="text-white text-xs font-semibold">{news.category}</span>
                    </div>
                  </div>

                  <div className="p-3 flex-1 flex flex-col">
                    <div className="flex items-center gap-1 text-base-content/60 mb-2">
                      <FaCalendar size={10} />
                      <span className="text-xs">{news.date}</span>
                    </div>
                    
                    <h3 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-2">
                      {truncateTitle(news.title)}
                    </h3>
                    
                    <p className="text-xs text-base-content/60 line-clamp-2 mb-2 flex-1">
                      {truncateExcerpt(news.excerpt)}
                    </p>
                    
                    <div className="flex justify-end">
                      <button className="flex items-center gap-1 text-primary font-semibold text-xs group/btn flex-shrink-0 cursor-pointer">
                        <span>Batafsil</span>
                        <FaArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-base-content/70 text-lg">Hozircha yangiliklar yo'q</p>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}

export default News