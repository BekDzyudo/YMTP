import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Divider from "../../components/Dvider";

const leaders = [
  {
    name: "Otayorov Javohir Odiljon o‘g‘li",
    position: "Bosh mutaxassis",
    image: "xodim1.jpg",
  },
  {
    name: "Ubaydullaev Mirjalol Baxodir o‘g‘li",
    position: "Bosh mutaxassis",
    image: "xodim2.jpg",
  },
  {
    name: "Botirov Ravshan Maxkam o‘g‘li",
    position: "Bosh mutaxassis",
    image: "xodim5.jpg",
  },
  {
    name: "Rahmatov Baxtiyor",
    position: "Bosh mutaxassis",
    image: "xodim3.jpg",
  },
  {
    name: "Shukurova Shayxzoda Kamaritdinovna",
    position: "Bosh mutaxassis",
    image: "xodim4.jpg",
  },
  {
    name: "Yakubova Nargiz Mirzaxamedovna",
    position: "Bosh mutaxassis",
    image: "xodim6.jpg",
  },
  {
    name: "Otayorov Javohir Odiljon o‘g‘li",
    position: "Bosh mutaxassis",
    image: "xodim1.jpg",
  },
  {
    name: "Ubaydullaev Mirjalol Baxodir o‘g‘li",
    position: "Bosh mutaxassis",
    image: "xodim2.jpg",
  },
  {
    name: "Botirov Ravshan Maxkam o‘g‘li",
    position: "Bosh mutaxassis",
    image: "xodim5.jpg",
  },
  {
    name: "Rahmatov Baxtiyor",
    position: "Bosh mutaxassis",
    image: "xodim3.jpg",
  },
  {
    name: "Shukurova Shayxzoda Kamaritdinovna",
    position: "Bosh mutaxassis",
    image: "xodim4.jpg",
  },
  {
    name: "Yakubova Nargiz Mirzaxamedovna",
    position: "Bosh mutaxassis",
    image: "xodim6.jpg",
  },
];

function LidersExpert() {
  return (
    <section className="relative px-3.5 sm:px-5 mx-auto w-full 2xl:w-11/12 bg-base-100">
      <Divider color="blue" />
      <h2 className="text-center text-2xl sm:text-4xl font-bold mb-10">
        Bizning mutaxassislar
      </h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={32}
        slidesPerView={5}
        centeredSlides={true}
        loop={true}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // navigation
        speed={500}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 5 },
        }}
        className="w-full leaders-swiper"
      >
        {leaders.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <div
                className={`transition-all duration-500 ${
                  isActive ? "scale-100 opacity-100" : "scale-90 opacity-70"
                }`}
              >
                <div className="group relative rounded-2xl overflow-hidden">
                  {/* IMAGE */}
                  <img
                    src={`/${item.image}`}
                    alt={item.name}
                    className="h-[380px] sm:h-[420px] w-full object-cover"
                  />

                  {/* GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* TEXT */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-xl font-semibold">
                      {item.name}
                    </h3>
                    <p className="text-white/70 text-sm">{item.position}</p>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default LidersExpert;
