import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { PiArrowUpRightBold } from "react-icons/pi";
import { Link } from "react-router";

const Featured = () => {
  const [cards, setCards] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/featured-cars").then((res) => {
      setCards(res.data);
      console.log(res.data);
    });
  }, []);

  const car = {
    image: "/images/car.jpg",
    title: "C-Class - 2023",
    subtitle: "2.0 255‑hp Turbo, Automatic 9‑G Tronic",
    features: ["50 Miles", "Automatic", "2023"],
    price: "$16,000",
    badge: "For Sale",
  };

  return (
    <div className="w-full min-h-screen px-10 py-20">
      <div className="h-20 w-full flex items-center justify-between  border-b-2 border-b-zinc-200">
        <h3 className="text-4xl font-momo opacity-60">02</h3>
        <h2 className="text-4xl">Featured Cars</h2>
        <span className="text-4xl"></span>
      </div>
      <div className="grid grid-cols-3 place-items-center gap-5 mt-10">
        {cards.map((card) => (
          <div key={card._id} className="border border-zinc-200 w-90 h-fit rounded-4xl shadow-2xl p-4">
            <div className="bg-zinc-800 relative w-full h-50 rounded-3xl">
              <span
                className={`rounded-full px-3 py-1 bg-green-500 text-xs absolute top-3 capitalize right-3 ${
                  card.status === "available" ? "bg-white" : "bg-yellow-400"
                }`}
              >
                {card.status}
              </span>
            </div>
            <div className="mt-3 px-2">
              <div className="flex items-center justify-between">
                <h1 className="text-lg uppercase text-zinc-700 font-momo font-semibold">
                  {card.car_name}
                </h1>
                <p className="text-sm opacity-55">{card.car_type}</p>
              </div>
              <p className="text-sm text-zinc-700 mb-2">{card.provider.name}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">$400</p>
                <Link
                  to={`/cars-details/${card._id}`}
                  className="hover:text-yellow-400 text-sm flex items-center gap-2 py-2 px-8 opacity-75 rounded-full"
                >
                  View Details
                  <PiArrowUpRightBold className="text-xl" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
