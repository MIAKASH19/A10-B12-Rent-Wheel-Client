import React from "react";
import heroImg from "../../public/cars2.jpg";

const Hero = () => {
  return (
    <div className="px-8 pt-1">
      <div className="relative w-full h-screen bg-red-500 rounded-2xl overflow-hidden">
        {/* <img src="https://www.topgear.com/sites/default/files/2021/12/15%20Cadillac%20Escalade.jpg?w=892&h=502" className="w-full h-full object-cover" /> */}
        <img src="https://www.topgear.com/sites/default/files/2021/12/1%20Cadillac%20Escalade.jpg?w=892&h=502" className="w-full h-full object-cover" />
        <div className="absolute bg-rd-500 top-1/4 left-0 w-1/2 h-1/2 flex flex-col items-start gap-5 justify-center text-white pl-10">
          <h1 className="text-7xl ">Drive Luxury. Feel Freedom.</h1>
          <p>
            Find the perfect car for every journey - affordable rates, easy
            booking, and reliable service wherever you go.
          </p>
          <button className="bg-[#A0BB70] px-6 py-3 rounded-full text-white transition-all duration-300 hover:bg-black">Browse Cars</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

// https://www.topgear.com/sites/default/files/2021/12/1%20Cadillac%20Escalade.jpg?w=892&h=502