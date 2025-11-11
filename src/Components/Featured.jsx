import React, { useEffect } from "react";
import useAxios from "../hooks/useAxios";



const Featured = () => {

    
  const axiosInstace = useAxios();
  useEffect(() => {
    axiosInstace.get("/cars").then((res) => console.log(res.data));
  }, []);

  const car =  {
image: "/images/car.jpg",
title: "C-Class - 2023",
subtitle: "2.0 255‑hp Turbo, Automatic 9‑G Tronic",
features: ["50 Miles", "Automatic", "2023"],
price: "$16,000",
badge: "For Sale",
}

  return (
    <div className="w-full min-h-screen px-10 py-20">
      <div className="h-20 w-full flex items-center justify-between  border-b-2 border-b-zinc-200">
        <h3 className="text-4xl font-momo opacity-60">02</h3>
        <h2 className="text-4xl">Featured Cars</h2>
        <span className="text-4xl"></span>
      </div>
      <div className="">
        <article className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={car.image}
              alt={car.title}
              className="w-full h-48 object-cover"
            />

            {/* top-right circular price/badge */}
            <div className="absolute top-3 right-3">
              <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold shadow">
                {car.badge}
              </div>
            </div>

            {/* bottom-left small overlay (optional) */}
            <div className="absolute bottom-3 left-3">
              <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-md">
                New Arrival
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {car.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{car.subtitle}</p>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-indigo-600">{car.price}</p>
                <p className="text-xs text-gray-400">/estimate</p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
              {car.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
                Contact
              </button>
              <button className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657 3.172 11.83a4 4 0 010-5.656z" />
                </svg>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Featured;
