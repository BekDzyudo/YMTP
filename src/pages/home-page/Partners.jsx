import { Swiper, SwiperSlide } from "swiper/react";
import Divider from "../../components/Dvider";
import { Navigation, Autoplay } from "swiper/modules";

function Partners() {
  return (
    <section className="mb-10 sm:mb-16">
       <Divider color="blue" />
      <h2 className="text-center text-2xl sm:text-4xl font-bold mb-5 sm:mb-10">
        Xorijiy hamkorlar
      </h2>
      <Swiper
      modules={[Navigation, Autoplay]}
        spaceBetween={32}
        slidesPerView={5}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
  320: { slidesPerView: 1 },
  640: { slidesPerView: 2 },
  1024: { slidesPerView: 4 },
}}
        className="w-full leaders-swiper"
      >
        <SwiperSlide>
          <div className="card card-side bg-base-300 h-full shadow-sm p-3">
            <figure className="w-1/2">
              <img
                src="/unicef.png"
                alt="unicef"
                className="w-full object-contain"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Federal kasb-hunar ta'limi instituti (BIBB)
              </h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card card-side bg-base-300 h-full shadow-sm p-3">
            <figure className="w-1/2">
              <img
                src="/askaniya.png"
                alt="Askaniya"
                className="w-full object-contain"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Federal kasb-hunar ta'limi instituti (BIBB)
              </h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card card-side bg-base-300 h-full shadow-sm p-3">
            <figure className="w-1/2">
              <img
                src="/avestos.png"
                alt="Avestos"
                className="w-full object-contain"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Federal kasb-hunar ta'limi instituti (BIBB)
              </h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card card-side bg-base-300 h-full shadow-sm p-3">
            <figure className="w-1/2">
              <img
                src="/BIBB.png"
                alt="BIBB"
                className="w-full object-contain"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Federal kasb-hunar ta'limi instituti (BIBB)
              </h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card card-side bg-base-300 h-full shadow-sm p-3">
            <figure className="w-1/2">
              <img
                src="/Darya.png"
                alt="Darya"
                className="w-full object-contain"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Federal kasb-hunar ta'limi instituti (BIBB)
              </h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card card-side bg-base-300 h-auto shadow-sm p-3">
            <div className="w-1/2 h-24">
              <img
                src="/irpo.png"
                alt="Irpo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="card-body">
              <h2 className="card-title">
                Federal kasb-hunar ta'limi instituti (BIBB)
              </h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card card-side bg-base-300 h-full shadow-sm p-3">
            <figure className="w-1/2">
              <img
                src="/krivet.png"
                alt="Krivet"
                className="w-full object-contain"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Federal kasb-hunar ta'limi instituti (BIBB)
              </h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card card-side bg-base-300 h-full shadow-sm p-3">
            <figure className="w-1/2">
              <img
                src="/ripo.png"
                alt="Ripo"
                className="w-full object-contain"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Federal kasb-hunar ta'limi instituti (BIBB)
              </h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card card-side bg-base-300 h-full shadow-sm p-3">
            <figure className="w-1/2">
              <img
                src="/Rudn.png"
                alt="Rudn"
                className="w-full object-contain"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Federal kasb-hunar ta'limi instituti (BIBB)
              </h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card card-side bg-base-300 h-full shadow-sm p-3">
            <figure className="w-1/2">
              <img
                src="/shvesiya.png"
                alt="Shvesiya"
                className="w-full object-contain"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Federal kasb-hunar ta'limi instituti (BIBB)
              </h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card card-side bg-base-300 h-full shadow-sm p-3">
            <figure className="w-1/2">
              <img
                src="/unesco.png"
                alt="Unesco"
                className="w-full object-contain"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Federal kasb-hunar ta'limi instituti (BIBB)
              </h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card card-side bg-base-300 h-full shadow-sm p-3">
            <figure className="w-1/2">
              <img
                src="/vetuz.png"
                alt="Vet4uz"
                className="w-full object-contain"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Federal kasb-hunar ta'limi instituti (BIBB)
              </h2>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default Partners;
