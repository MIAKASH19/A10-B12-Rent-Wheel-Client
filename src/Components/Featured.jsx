import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import CarCard from "./CarCard";

const Featured = () => {
  const [cards, setCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/featured-cars").then((res) => {
      setCards(res.data);
      setAllCards(res.data);
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
    <div className="w-full min-h-screen px-10 py-20">
      <div className="sm:h-20 h-50 w-full relative flex sm:flex-row flex-col gap-4 items-center justify-between  border-b-2 border-b-zinc-200 pb-5 sm:pb-0">
        <h3 className="text-4xl font-momo opacity-60">02</h3>
        <h2 className="text-4xl text-center mx-auto absolute left-1/2 top-1/3 sm:top-0 w-full -translate-x-1/2">
          Featured Cars
        </h2>
        <label className="input rounded-full w-70">
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
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center gap-5 mt-10">
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

export default Featured;
