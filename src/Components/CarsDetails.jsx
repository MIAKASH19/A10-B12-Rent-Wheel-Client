import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Context/AuthContext";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";

const CarsDetails = () => {
  const [car, setCar] = useState({});
  const { id } = useParams();
  const axiosInstance = useAxios();

  const {
    car_name,
    car_type,
    rent_price,
    location,
    status,
    provider,
    category,
    description,
    image,
  } = car;

  useEffect(() => {
    axiosInstance
      .get(`/cars/${id}`)
      .then((res) => (setCar(res.data), console.log(res.data)));
  }, []);

  //   {
  // "_id": "6561a0011a01dc0000000001",
  // "car_name": "Toyota Corolla 2022",
  // "car_type": "Sedan",
  // "description": "Reliable and fuel-efficient sedan, perfect for city trips.",
  // "image": "https://example.com/images/toyota_corolla.jpg",
  // "category": "Sedan",
  // "rent_price": 4000,
  // "location": "Dhaka",
  // "status": "available",
  // "provider": {
  // "name": "Rahim Motors",
  // "email": "rahim@example.com"
  // }
  // },

  return (
    <div className="w-full min-h-screen flex gap-5 px-10 mt-10 ">
      <div className="w-3/5 bg-zinc-100 h-120 rounded-2xl"></div>
      <div className=" h-120 w-2/5 rounded-2xl pl-2">
        <p className="px-4 py-1 w-fit rounded-full border border-zinc-400 font-medium text-xs mb-2">
          {category}
        </p>
        <div className="flex justify-start gap-4 items-center">
          <h1 className="font-medium text-2xl">{car_name}</h1>
          <p className="flex gap-2 text-sm opacity-50">
            <IoLocationOutline className="text-xl" />
            {location}
          </p>
        </div>
        <p className="font-bold text-3xl my-2">${rent_price}</p>
        <div className="my-3">
          <p className="font-medium text-sm">Provider Name :</p>
          <p className="opacity-70 text-sm">{provider?.name}</p>
        </div>
        <div className="my-3">
          <p className="font-medium text-sm">Provider Email :</p>
          <p className="opacity-70 text-sm">{provider?.email}</p>
        </div>
        <div >
          <h5 className="font-semibold text-sm">Description :</h5>
          <p className="text-sm opacity-70">{description}</p>
        </div>
        <div className="flex gap-2 my-4">
          <button className="bg-black rounded-full text-sm text-white py-2 w-full">
            Rent Car
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default CarsDetails;
