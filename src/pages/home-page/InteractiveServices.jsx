import React from 'react'
import { FaFileAlt, FaPhone, FaEnvelope, FaUserGraduate, FaRedo, FaChartLine } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function InteractiveServices() {
  const services = [
    {
      id: 1,
      title: "Hujjat topshirish",
      description: "Qat'iy tartibdagi hujjatlarni topshirish",
      icon: <FaFileAlt className="text-4xl" />,
      tel: "+998 90 123 45 67",
      email: "kasbedu@gmail.com",
      link: "#",
    },
    {
      id: 2,
      title: "Doktorantura",
      description: "Doktoranturaga hujjat topshirish",
      icon: <FaUserGraduate className="text-4xl" />,
      tel: "+998 90 123 45 67",
      email: "kasbedu@gmail.com",
      link: "#",
    },
    {
      id: 3,
      title: "Qayta tayyorlash",
      description: "Qayta tayyorlash kurslari",
      icon: <FaRedo className="text-4xl" />,
      tel: "+998 90 123 45 67",
      email: "kasbedu@gmail.com",
      link: "#",
    },
    {
      id: 4,
      title: "Malaka oshirish",
      description: "Malaka oshirish kurslari",
      icon: <FaChartLine className="text-4xl" />,
      tel: "+998 90 123 45 67",
      email: "kasbedu@gmail.com",
      link: "#",
    },
  ];

  return (
    <section className="relative w-full bg-gradient-to-br from-[#194882] to-info py-12 md:py-16 overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="/bino+.png" 
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className=" px-3.5 sm:px-5 mx-auto w-full xl:w-full 2xl:w-11/12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-serif text-center">
            Interaktiv xizmatlar
          </h2>
        </div>

        {/* Main Content: Left Cards + Right Image */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          
          {/* Left Side: 4 Cards - Max Width 2/3 */}
          <div className="w-full lg:max-w-[66.666667%] mx-auto flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className="group relative"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] min-h-[140px] sm:min-h-[160px] bg-white/10 backdrop-blur-sm border border-white/20">
                    <div className="relative flex flex-col gap-3 p-5 h-full">
                      {/* Header with Icon */}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-md">
                          <div className="text-white text-xl">
                            {service.icon}
                          </div>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-md">
                          {service.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-white/90 text-xs leading-relaxed drop-shadow">
                        {service.description}
                      </p>

                      {/* Contact Info */}
                      <div className="space-y-2 mt-auto">
                        <a 
                          href={`tel:${service.tel.replace(/\s/g, '')}`}
                          className="flex items-center gap-2 text-white hover:text-white/80 transition-colors group/tel"
                        >
                          <FaPhone className="text-sm shrink-0" />
                          <span className="text-xs font-medium">{service.tel}</span>
                        </a>
                        <a 
                          href={`mailto:${service.email}`}
                          className="flex items-center gap-2 text-white hover:text-white/80 transition-colors group/email"
                        >
                          <FaEnvelope className="text-sm shrink-0" />
                          <span className="text-xs font-medium">{service.email}</span>
                        </a>
                      </div>

                      {/* Background Icon */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-7xl sm:text-8xl text-white/15 pointer-events-none transition-all duration-500 group-hover:text-white/25 group-hover:scale-110">
                        {React.cloneElement(service.icon, { className: "" })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default InteractiveServices
