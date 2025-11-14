import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import CarCard from "./CarCard";

const Featured = () => {
  const [cards, setCards] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/featured-cars").then((res) => {
      setCards(res.data);
    });
  }, []);

  return (
    <div className="w-full min-h-screen px-10 py-20">
      <div className="h-20 w-full flex items-center justify-between  border-b-2 border-b-zinc-200">
        <h3 className="text-4xl font-momo opacity-60">02</h3>
        <h2 className="text-4xl">Featured Cars</h2>
        <span className="text-4xl"></span>
      </div>
      <div className="grid grid-cols-3 place-items-center gap-5 mt-10">
        {cards.map((car) => (
          <CarCard car={car}></CarCard>
        ))}
      </div>
    </div>
  );
};

export default Featured;
