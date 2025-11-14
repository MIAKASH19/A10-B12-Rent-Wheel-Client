import React from 'react'
import { Link } from "react-router";
import { PiArrowUpRightBold } from "react-icons/pi";

const CarCard = ({car}) => {
  return (
    <div
            key={car._id}
            className="border border-zinc-200 w-90 h-fit rounded-4xl shadow-2xl p-4"
          >
            <div className="bg-zinc-800 relative w-full h-50 rounded-3xl overflow-hidden">
                <img src={car.image} className="w-full h-full object-cover" />
              <span
                className={`rounded-full px-3 py-1 bg-green-500 text-xs absolute top-3 capitalize right-3 ${
                  car.status === "available" ? "bg-white" : "bg-yellow-400"
                }`}
              >
                {car.status}
              </span>
            </div>
            <div className="mt-3 px-2">
              <div className="flex items-center justify-between">
                <h1 className="text-lg uppercase text-zinc-700 font-momo font-semibold">
                  {car.car_name}
                </h1>
                <p className="text-sm opacity-55">{car.car_type}</p>
              </div>
              <p className="text-sm text-zinc-700 mb-2">{car?.provider?.name}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">$400</p>
                <Link
                  to={`/cars-details/${car._id}`}
                  className="hover:text-yellow-400 text-sm flex items-center gap-2 py-2 px-8 opacity-75 rounded-full"
                >
                  View Details
                  <PiArrowUpRightBold className="text-xl" />
                </Link>
              </div>
            </div>
          </div>
  )
}

export default CarCard