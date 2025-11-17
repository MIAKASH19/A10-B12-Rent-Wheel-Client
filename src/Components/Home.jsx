import React from "react";
import Featured from "./Featured";
import Hero from "./Hero";
import Services from "./Services";
import WhyRentWithUs from "./WhyRentWithUs";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <Services></Services>
      <Featured></Featured>
      <WhyRentWithUs></WhyRentWithUs>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
