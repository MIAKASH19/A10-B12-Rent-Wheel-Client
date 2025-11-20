import React, { useEffect, useState } from "react";
import AOS from "aos";
import useAxios from "../hooks/useAxios";
import "aos/dist/aos.css";
AOS.init();

const Testimonial = () => {
  const [testimoni, setTestimoni] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/testimonials").then((res) => setTestimoni(res.data));
  }, []);

  return (
    <div className="w-full sm:h-fit min-h-screen px-10 py-20 pt-10 sm:pt-20">
      <div className="h-20 w-full flex sm:flex-row flex-col gap-3 sm:gap-0 items-center justify-center sm:justify-between  border-b-2 border-b-zinc-200">
        <h3 className="sm:text-4xl text-3xl font-momo opacity-60 text-center">
          04
        </h3>
        <h2 className="sm:text-4xl text-2xl">What Our Custormers Say</h2>
        <span></span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-10 md:gap-4 mt-10">
        {testimoni.map((item) => (
          <div
            key={item._id}
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            className="flex gap-2 w-full h-[50vh] md:h-[30vh] flex-col sm:flex-row"
          >
            <div className="bg-zinc-100 sm:w-[35%] w-full flex flex-col items-center justify-center h-[30vh] rounded-lg p-5">
              <div className="w-15 h-20  rounded-full overflow-hidden">
                <img
                  src={item.image}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <p className="font-medium my-2">{item.name}</p>
              <p className="font-semibold text-xs">{item.role}</p>
            </div>
            <div className="bg-zinc-100 sm:w-[65%] w-full h-[20vh] sm:h-[30vh] flex items-center justify-center p-5 rounded-lg">
              <p className="sm:text-2xl text-sm font-medium opacity-80 tracking-tight">
                "{item.review}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
