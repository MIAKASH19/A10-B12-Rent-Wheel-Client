import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import CarCard from "./CarCard";


const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [carList, setCarLists] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/cars?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setCarLists(data));
  }, [user]);

  return (
    <div className="min-h-screen px-10">
      <h1 className="text-4xl border-b border-zinc-200 pb-4">
        My car lists : {carList.length}
      </h1>
      <div className="grid grid-cols-3 place-items-center gap-5 mt-10">
        {carList.map((car) => (
          <CarCard car={car}></CarCard>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
