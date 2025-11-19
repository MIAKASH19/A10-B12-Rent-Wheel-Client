import React from "react";
import { PiArrowUpRightBold } from "react-icons/pi";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const Services = () => {
  return (
    <div className=" w-full min-h-screen sm:px-10 px-5 py-20 pt-0 sm:pt-20 text-zinc-750">
      <div className="h-20 w-full flex items-center justify-between  border-b-2 border-b-zinc-200">
        <h3 className="text-4xl font-momo opacity-60">01</h3>
        <h2 className="text-4xl">Our Services</h2>
        <span className="text-4xl"></span>
      </div>
      <div
        className="w-full flex sm:flex-row flex-col gap-5 items-center justify-between mt-10 mx-auto "
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
      >
        <div className='relative group sm:w-100 w-90 h-70 overflow-hidden shadow-2xl rounded-3xl px-5 py-7 bg-[url("https://img.freepik.com/free-photo/happy-couple-car-showroom-dealership_23-2149117139.jpg?semt=ais_hybrid&w=740&q=80")] bg-cover'>
          <span className="bg-white group-hover:bg-black group-hover:text-white transition-all duration-300 rounded-full py-3 px-5 text-sm">
            Long Term Rentals
          </span>
          <span className="bg-white group-hover:bg-black group-hover:text-white transition-all duration-300 absolute right-5 bottom-3 rounded-full p-3 text-2xl">
            <PiArrowUpRightBold />
          </span>
        </div>
        <div className='relative group sm:w-100 w-90 h-70 overflow-hidden shadow-2xl rounded-3xl px-5 py-7 bg-[url("https://img.freepik.com/free-photo/young-couple-choosing-car-car-showroom_1303-22834.jpg?semt=ais_hybrid&w=740&q=80")] bg-cover'>
          <span className="bg-white absolute left-5 bottom-5 rounded-full py-3 px-5 text-sm group-hover:bg-black group-hover:text-white transition-all duration-300">
            Luxury Car Rent
          </span>
          <span className="bg-white group-hover:bg-black group-hover:text-white transition-all duration-300 absolute right-5 top-5 rounded-full p-3 text-2xl">
            <PiArrowUpRightBold />
          </span>
        </div>
        <div className='relative group sm:w-100 w-90 h-70 overflow-hidden shadow-2xl rounded-3xl px-5 py-7 bg-[url("https://img.freepik.com/free-photo/young-woman-testing-car-from-car-showroom_1303-17398.jpg?semt=ais_hybrid&w=740&q=80")] bg-cover'>
          <span className="bg-white group-hover:bg-black group-hover:text-white transition-all duration-300 rounded-full py-3 px-5 text-sm">
            Self Drive Options
          </span>
          <span className="bg-white group-hover:bg-black group-hover:text-white transition-all duration-300 absolute right-5 bottom-5 rounded-full p-3 text-2xl">
            <PiArrowUpRightBold />
          </span>
        </div>
      </div>

      <div className="w-full flex items-center justify-center flex-col gap-10 mt-16">
        <p className="sm:text-2xl text-m sm:w-2/3 w-full text-center">
          Whether you're traveling for business, leisure, or a special occasion,
          our chauffeur-driven vehicles guarantee a stylish, comfortable, and
          punctual arrival every time.
        </p>
        <Link
          to="/browse-cars"
          className="bg-[#A0BB70] px-6 py-3 rounded-full text-white transition-all duration-300 hover:bg-black hover:text-white"
        >
          Browse Cars
        </Link>
      </div>
    </div>
  );
};

export default Services;
