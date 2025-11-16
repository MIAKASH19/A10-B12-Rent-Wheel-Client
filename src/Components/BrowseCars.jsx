import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import CarCard from "./CarCard";

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
        {cards.map((car) => (
          <CarCard key={car._id}car={car}></CarCard>
        ))}
      </div>
    </div>
  );
};

export default BrowseCars;
