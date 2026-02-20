import { Swiper, SwiperSlide } from "swiper/react";
import Divider from "../../components/Dvider";
import { Navigation, Autoplay } from "swiper/modules";

function Partners() {
  const partners = [
    { name: "UNICEF", image: "/unicef.png", description: "BMT Bolalar jamg'armasi" },
    { name: "Askaniya", image: "/askaniya.png", description: "Askaniya ta'lim markazi" },
    { name: "Avestos", image: "/avestos.png", description: "Avestos hamkorlik tashkiloti" },
    { name: "BIBB", image: "/BIBB.png", description: "Federal kasb-hunar ta'limi instituti" },
    { name: "Darya", image: "/Darya.png", description: "Darya ta'lim markazi" },
    { name: "IRPO", image: "/irpo.png", description: "Rossiya kasb-hunar ta'limi instituti" },
    { name: "Krivet", image: "/krivet.png", description: "Krivet o'quv markazi" },
    { name: "RIPO", image: "/ripo.png", description: "Belarus kasb-hunar ta'limi instituti" },
    { name: "RUDN", image: "/Rudn.png", description: "Rossiya do'stlik universiteti" },
    { name: "Shvetsiya", image: "/shvesiya.png", description: "Shvetsiya ta'lim agentligi" },
    { name: "UNESCO", image: "/unesco.png", description: "BMT ta'lim, fan va madaniyat tashkiloti" },
    { name: "VET4UZ", image: "/vetuz.png", description: "Kasbiy ta'lim rivojlantirish loyihasi" },
  ];

  return (
    <section className="relative py-12 sm:py-20 overflow-hidden">
      {/* World Map Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1920&q=80')`,
          filter: 'grayscale(100%) brightness(0.3)'
        }}
      ></div>

      {/* Blue Transparent Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-700/85 via-blue-600/80 to-blue-500/85"></div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 text-white font-serif">
            Xalqaro hamkorlar
          </h2>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto">
            Biz jahonning yetakchi ta'lim tashkilotlari bilan hamkorlik qilamiz
          </p>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          speed={700}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
            1440: { slidesPerView: 5, spaceBetween: 24 },
          }}
          className="w-full partners-swiper"
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={index}>
              <div className="group relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-gray-200 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full">
                
                <div className="relative flex flex-col items-center justify-center h-full gap-4">
                  {/* Logo Container */}
                  <div className="w-full h-32 flex items-center justify-center p-4 bg-linear-to-br from-gray-50 to-blue-50 rounded-xl transition-all duration-300 group-hover:from-blue-50 group-hover:to-cyan-50">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-gray-900 font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {partner.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      </div>
    </section>
  );
}

export default Partners;
