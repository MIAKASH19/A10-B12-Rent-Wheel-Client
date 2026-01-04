import React from "react";
import OurServices from "../Components/OurServices"
import Featured from "../Components/Featured"
import WhyRentWithUs from "../Components/WhyRentWithUs"
import Testimonials from "../Components/Testimonials"
import Hero from "../Components/Hero"
import FAQ from "../Components/FAQ";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <div className="px-4 h-[30vh] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white md:hidden flex flex-col items-center justify-center gap-4 py-10 md:py-0">
        <h1 className="text-4xl text-center">
          Best <span className="bg-[#A0BB70] px-3 rounded-full text-white">Car</span> for your <span className="text-[#A0BB70] font-medium">Ride</span>
        </h1>
        <p className="text- text-center">
          Premium sedans for meetings, events, and executive travel - arrive in
          style, every time.
        </p>
      </div>
      <OurServices></OurServices>
      <Featured></Featured>
      <WhyRentWithUs></WhyRentWithUs>
      <Testimonials></Testimonials>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
