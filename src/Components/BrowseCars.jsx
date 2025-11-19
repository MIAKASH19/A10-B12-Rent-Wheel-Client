import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import CarCard from "./CarCard";

const BrowseCars = () => {
  const [cards, setCards] = useState([]);

  const [allCards, setAllCards] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/browse-cars").then((res) => {
      setCards(res.data);
      setAllCards(res.data)
    });
  }, []);

  const SearchOperation = (e) => {
    const value = e.target.value.toLowerCase();

    if (value) {
      const result = allCards.filter((card) =>
        card.car_name.toLowerCase().includes(value)
      );
      return setCards(result);
    }
    setCards(allCards);
  };

  return (
    <div>
      <div className="flex items-center justify-center flex-col my-30 mb-15 ">
        <h1 className="text-7xl font-medium tracking-tight">
          Drive Your Dreams, Rent Your Ride
        </h1>
        <div></div>
        <p className="text-sm mt-2">
          Choose from our premium collection of cars and make every journey
          memorable. Fast booking, reliable service, and comfort at your
          fingertips.
        </p>
        <div className="w-full h-px mt-4 bg-zinc-300"></div>
      </div>
      <div className="flex items-center justify-center">
        <label className="input rounded-full w-96">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={SearchOperation}
            type="search"
            required
            placeholder="Search"
          />
        </label>
      </div>
      <div className="grid grid-cols-3 place-items-center gap-5 my-10 mb-20">
        {cards.length === 0 ? (
          <p className="text-4xl opacity-80 col-span-3 text-center">
            Sorry , No cars found
          </p>
        ) : (
          cards.map((car) => <CarCard key={car._id} car={car} />)
        )}
      </div>
    </div>
  );
};

export default BrowseCars;
