import React from "react";
import "swiper/css/navigation";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import img1 from "../images/IMG-20260104-WA0001.jpg";
import img2 from "../images/IMG-20260104-WA0013.jpg";
import hero1 from "../images/hero1.png";
import hero2 from "../images/banner/hero2.jpg";
import hero3 from "../images/banner/hero3.jpg";
import hero4 from "../images/banner/hero4.jpg";
import offerImg from "../images/banner/offer.jpg";
import offerImg2 from "../images/banner/offer2.jpg";
export default function Home() {
  return (
    <div className="">
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        className="mySwiper"
        spaceBetween={10}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <img
            className="rounded h-[30rem] md:h-[120%] w-[100%] object-cover"
            src={hero1}
            alt=""
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            className="rounded h-[30rem] md:h-[120%] w-[100%]  object-cover"
            src={hero1}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded h-[30rem] md:h-[120%] w-[100%] object-cover "
            src={hero1}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded h-[30rem] md:h-[120%] w-[100%] object-cover "
            src={hero1}
            alt=""
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            className="rounded h-[30rem] md:h-[120%] w-[100%] object-cover  "
            src={hero1}
            alt=""
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            className="rounded h-[30rem] md:h-[120%] w-[100%] object-cover "
            src={hero1}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded h-[30rem] md:h-[120%] w-[100%] object-cover "
            src={hero1}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded h-[30rem] md:h-[120%] w-[100%] object-cover "
            src={hero1}
            alt=""
          />
        </SwiperSlide>
        <div class="swiper-pagination"></div>
      </Swiper>
    </div>
  );
}
