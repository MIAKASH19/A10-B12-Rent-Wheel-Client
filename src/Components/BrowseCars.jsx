import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router";
import { PiArrowUpRightBold } from "react-icons/pi";

const BrowseCars = () => {
  const [cards, setCards] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/browse-cars").then((res) => {
      setCards(res.data);
    });
  }, []);
  return (
    <div>
      <div className="flex items-center justify-center flex-col my-10 ">
        <h1 className="text-7xl font-medium tracking-tight">Drive Your Dreams, Rent Your Ride</h1>
        <div></div>
        <p className="text-sm mt-2">
          Choose from our premium collection of cars and make every journey
          memorable. Fast booking, reliable service, and comfort at your
          fingertips.
        </p>
        <div className="w-full h-px mt-4 bg-zinc-300"></div>
      </div>
      <div className="grid grid-cols-3 place-items-center gap-5 my-10 mb-20">
        {cards.map((card) => (
          <div
            key={card._id}
            className="border border-zinc-200 w-90 h-fit rounded-4xl shadow-2xl p-4"
          >
            <div className="bg-zinc-800 relative w-full h-50 rounded-3xl">
              <span
                className={`rounded-full px-3 py-1 text-xs absolute top-3 capitalize right-3 ${
                  card?.status?.toLowerCase() === "available" ? "bg-white" : "bg-yellow-400"
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
              <p className="text-sm text-zinc-700 mb-2">{card.provider?.name}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{card.rent_price}tk</p>
                <Link
                  to={`/cars-details/${card._id}`}
                  className=" hover:text-[#97b95a] border border-zinc-400 text-sm flex items-center gap-2 py-2 px-8 opacity-75 rounded-full"
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

export default BrowseCars;
