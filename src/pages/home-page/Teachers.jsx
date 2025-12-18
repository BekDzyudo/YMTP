import Divider from "../../components/Dvider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
import "./teachers.css";

function Teachers() {
  const teachers = [
    {
      name: "Alijonov Valijon",
      hudud: "Buxoro viloyati, Olot tumani, Qurulish kasb hunar maktabi",
      fan: "Musiqa va san'at asoslari",
      reyting: 3750,
      badge: 18,
      img: "/teacher1.jpg",
    },
    {
      name: "Azizova Umida",
      hudud: "Samarqand, Urgut tumani, Texnika kasb-hunar maktabi",
      fan: "Matematika",
      reyting: 4200,
      badge: 20,
      img: "/teacher2.jpg",
    },
    {
      name: "Xudoyberdi Jumayev",
      hudud: "Samarqand, Urgut tumani, Texnika kasb-hunar maktabi",
      fan: "Kasbiy faoliyatda xorijiy til",
      reyting: 2500,
      badge: 25,
      img: "/teacher3.jpg",
    },
    {
      name: "G‘ayratova Malika",
      hudud: "Samarqand, Urgut tumani, Texnika kasb-hunar maktabi",
      fan: "Ingliz tili",
      reyting: 4501,
      badge: 31,
      img: "/teacher4.jpg",
    },
    {
      name: "Tursunova Gulnoza",
      hudud: "Samarqand, Urgut tumani, Texnika kasb-hunar maktabi",
      fan: "Pazandachilik asoslari",
      reyting: 1501,
      badge: 11,
      img: "/teacher5.jpg",
    },
    {
      name: "Shukurova Shahnoza",
      hudud: "Samarqand, Urgut tumani, Texnika kasb-hunar maktabi",
      fan: "Tikuvchilik asoslari",
      reyting: 501,
      badge: 17,
      img: "/teacher6.jpg",
    },
  ];
  const arrdouble = teachers.concat(teachers);
  return (
    <section className="relative px-4 sm:px-6 mx-auto w-full 2xl:w-11/12 bg-base-100 py-10">
      <Divider color="orange" />
      <h2 className="text-center text-2xl sm:text-4xl font-bold mb-10">
        Reytingi yuqori o‘qituvchilar
      </h2>

      {/* <Swiper
        modules={[Autoplay]}
        spaceBetween={32}
        slidesPerView={5}
        loop={true}
        speed={6000}
        centeredSlides={false}
        loopAdditionalSlides={teachers.length}
freeMode={true}
watchSlidesProgress={true}

        autoplay={{
          delay: 0, // MUHIM: to‘xtamasdan yuradi
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // hover’da to‘xtaydi
        }}
        allowTouchMove={false}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 5 },
        }}
        className="w-full leaders-swiper flex gap-6 px-4"
      >
        {teachers.map((t, i) => (
          <SwiperSlide
            key={i}
            className="flex-shrink-0 card w-80 bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300"
          >
            <figure className="h-48 overflow-hidden">
              <img
                src={t.img}
                alt={t.name}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="p-4 justify-start flex flex-col h-auto">
              <div className="flex items-start justify-between">
                <div>
                  <h6 className="text-md text-gray-500">F.I.SH</h6>
                  <p className="text-lg font-semibold leading-tight">
                    {t.name}
                  </p>
                </div>
                <span className="badge badge-primary badge-lg font-semibold">
                  {t.badge}
                </span>
              </div>

              <div className="mt-4">
                <h6 className="text-xs text-gray-500">HUDUD</h6>
                <p className="text-sm line-clamp-2">{t.hudud}</p>
              </div>

              <div className="mt-2">
                <h6 className="text-xs text-gray-500">FAN</h6>
                <p className="text-sm">{t.fan}</p>
              </div>

              <div className="mt-5 flex items-center justify-between pt-2 border-t">
                <div>
                  <h6 className="text-xs text-gray-500">REYTING</h6>
                  <p className="font-bold text-primary text-lg">{t.reyting}</p>
                </div>
                <button className="btn btn-sm btn-outline btn-primary">
                  Batafsil
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}

      {/* <div className="flex gap-6 px-4">
          {teachers.map((t, i) => (
            <div
              key={i}
              className="card w-80 bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300"
            >
              <figure className="h-48 overflow-hidden">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="p-4 justify-start flex flex-col h-auto">
                <div className="flex items-start justify-between">
                  <div>
                    <h6 className="text-md text-gray-500">F.I.SH</h6>
                    <p className="text-lg font-semibold leading-tight">
                      {t.name}
                    </p>
                  </div>
                  <span className="badge badge-primary badge-lg font-semibold">
                    {t.badge}
                  </span>
                </div>

                <div className="mt-4">
                  <h6 className="text-xs text-gray-500">HUDUD</h6>
                  <p className="text-sm line-clamp-2">{t.hudud}</p>
                </div>

                <div className="mt-2">
                  <h6 className="text-xs text-gray-500">FAN</h6>
                  <p className="text-sm">{t.fan}</p>
                </div>

                <div className="mt-5 flex items-center justify-between pt-2 border-t">
                  <div>
                    <h6 className="text-xs text-gray-500">REYTING</h6>
                    <p className="font-bold text-primary text-lg">
                      {t.reyting}
                    </p>
                  </div>
                  <button className="btn btn-sm btn-outline btn-primary">
                    Batafsil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      <div className="sliderContainer">
        <div className="slider">
          <div className="slide-track flex items-stretch gap-7">
            {arrdouble.map((t, i) => (
              <div
                key={i}
                className="slide pb-4 card w-80 bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300"
              >
                <figure className="h-48 overflow-hidden">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="px-3 pt-4 justify-between flex flex-col">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h6 className="text-md text-gray-500">F.I.SH</h6>
                        <p className="text-lg font-semibold leading-tight">
                          {t.name}
                        </p>
                      </div>
                      <span className="badge badge-primary badge-lg font-semibold">
                        {t.badge}
                      </span>
                    </div>

                    <div className="mt-4">
                      <h6 className="text-xs text-gray-500">HUDUD</h6>
                      <p className="text-sm line-clamp-2">{t.hudud}</p>
                    </div>

                    <div className="mt-2">
                      <h6 className="text-xs text-gray-500">FAN</h6>
                      <p className="text-sm">{t.fan}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between pt-2 border-t">
                    <div>
                      <h6 className="text-xs text-gray-500">REYTING</h6>
                      <p className="font-bold text-primary text-lg">
                        {t.reyting}
                      </p>
                    </div>
                    <button className="btn btn-sm btn-outline btn-primary">
                      Batafsil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Teachers;
