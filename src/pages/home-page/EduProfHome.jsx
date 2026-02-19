import React from 'react'
import { FaFolderOpen, FaBook, FaCertificate, FaLightbulb, FaFileAlt, FaRocket, FaCheckCircle, FaArrowRight } from 'react-icons/fa'

function EduProfHome() {
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
    <section className='relative w-full bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-base-300 dark:via-base-100 dark:to-base-300 py-24 overflow-hidden'>
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className='relative h-full px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12 flex flex-col'>
        
        {/* Main Content Grid */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <FaRocket className="text-blue-600 dark:text-blue-400" size={18} />
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">Kasbiy Ta'lim Hujjatlar</span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent font-serif">
                  Metodik ta'minlash
                </span>
                <br />
                <span className="text-base-content font-serif">
                  axborot tizimi
                </span>
              </h1>
              <p className="text-base-content/70 text-lg sm:text-xl max-w-xl">
                Kasbiy ta'lim sohasidagi barcha metodik hujjatlar jamlanmasi. 
                Bilimingizni oshiring, ko'nikmalaringizni rivojlantiring!
              </p>
            </div>

            {/* Benefits List */}
            <div className="grid sm:grid-cols-2 gap-3">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" size={16} />
                  <span className="text-base-content/80 text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://edu.profedu.uz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-full text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span>Batafsil ma'lumot</span>
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2" size={18} />
              </a>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="group relative bg-white dark:bg-base-200 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-base-300 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
                
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-base-content font-bold text-base mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-base-content/60 text-sm">
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