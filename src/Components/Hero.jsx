import React from "react";
import heroImg from "../../public/cars2.jpg";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const sliderData = [
  {
    title: "Drive Luxury. Feel Freedom.",
    description:
      "Find the perfect car for every journey — affordable rates, easy booking, and reliable service wherever you go.",
    url : "https://www.topgear.com/sites/default/files/2021/12/1%20Cadillac%20Escalade.jpg?w=892&h=502",
  },
  {
    title: "Adventure Starts Here.",
    description:
      "Choose from rugged SUVs and off-road beasts built for mountains, long trips, and ultimate adventure.",
    url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Business Class Comfort.",
    description:
      "Premium sedans for meetings, events, and executive travel — arrive in style, every time.",
    url: "https://images.unsplash.com/photo-1650803960583-d846f36a7127?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Perfect Ride for Every Journey.",
    description:
      "From compact cars to family SUVs, our fleet is ready for daily commutes, weekend trips, and everything in between.",
    url: "https://images.unsplash.com/photo-1652890278181-5ed224586f5f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Hero = () => {
  return (
    <div className=" w-full min-h-screen px-8 pt-20 ">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 8500,
          disableOnInteraction: false,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-screen overflow-hidden mb-20 "
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide>
            <div key={index} className="relative w-full h-screen  rounded-2xl overflow-hidden">
            <img
              src={slide.url}
              className="w-full h-full object-cover"
            />
            <div className="absolute bg-rd-500 top-1/4 left-0 w-1/2 h-1/2 flex flex-col items-start gap-5 justify-center text-white pl-10">
              <h1 className="text-7xl ">{slide.title}</h1>
              <p>
                {slide.description}
              </p>
              <Link
                to="/browse-cars"
                className="bg-[#A0BB70] px-6 py-3 rounded-full text-white transition-all duration-300 hover:bg-black"
              >
                Browse Cars
              </Link>
            </div>
          </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;

// https://www.topgear.com/sites/default/files/2021/12/1%20Cadillac%20Escalade.jpg?w=892&h=502
