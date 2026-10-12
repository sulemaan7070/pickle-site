import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Review from "./Review";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
function FeedBack() {
  return (
    <div className="mt-10 shadow-lg">
      <h4 id="location" className="text-center text-blue-600">
        {" "}
        My client reviews
      </h4>
      <section className="text-gray-600 body-font ">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Review
              name={"Nasir Hussain"}
              comment={
                "Very good service at Bharath Lab, Proddatur. Prices are reasonable, reports are accurate, and the diagnostic services are handled by qualified professionals.”"
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <Review
              name={"Razak Srk"}
              comment={
                "They didn't charge for sample collection, results are fast ,staff is friendliness i"
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            <Review
              name={"N.jeelan N.jeelan"}
              comment={
                "I suggest for pdtr people to lab ,rates are very reasonable,and results are fast"
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <Review
              name={"Ashfaq 1234"}
              comment={
                "One of the best lab in proddatur fast process results also very fast ,thank you"
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <Review
              name={"Zakir Hussain"}
              comment={
                "Excellent service with great response. Staff is kind. Quick response and hospitality keeps them standout"
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <Review
              name={"Irfan Md"}
              comment={
                "Very punctual and professional. The service is the one of the best available in our town. And they are friendly"
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <Review
              name={"anjali honey"}
              comment={"Very friendly staff and test results on time"}
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <Review
              name={"Munaf"}
              comment={
                "Very nice lab ,rate are reasonable,thank you One of the best lab in proddatur"
              }
            />
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
}

export default FeedBack;
