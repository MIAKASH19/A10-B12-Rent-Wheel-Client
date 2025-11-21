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
      "Premium sedans for meetings, events, and executive travel - arrive in style, every time.",
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
    <div className=" w-full sm:min-h-screen h-fit sm:px-8 px-4 pt-20 ">
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
        className="mySwiper sm:h-screen h-[25vh] overflow-hidden sm:mb-20 mb-10"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide>
            <div key={index} className="relative w-full sm:h-screen h-full  rounded-2xl overflow-hidden">
            <img
              src={slide.url}
              className="w-full h-full object-cover"
            />
            <div className="absolute  top-1/4 left-0 sm:w-1/2 w-full h-1/2 flex flex-col items-start sm:gap-5 gap-3 justify-center overflow-hidden text-white sm:pl-10 px-4">
              <h1 className="sm:text-7xl text-3xl w-full font-semibold sm:font-normal sm:full z-2">{slide.title}</h1>
              <div className="bg-black w-full h-full fixed top-0 left-0 rounded-2xl opacity-20 z-1"></div>
              <p className="hidden sm:block">
                {slide.description}
              </p>
              <Link
                to="/browse-cars"
                className="bg-[#A0BB70] px-6 py-3 rounded-full text-sm sm:text-md font-bold sm:font-normal text-white transition-all duration-300 hover:bg-black z-1"
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

