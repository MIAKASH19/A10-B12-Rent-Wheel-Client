import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../hooks/useAxios";
import { IoLocationOutline } from "react-icons/io5";
import Swal from "sweetalert2";

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

  const handleBookNow = () => {
    Swal.fire({
      title: "Are you sure to Book this car?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Book now!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .patch(`/cars/book/${id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              setCar((prev) => ({
                ...prev,
                status: "unavailable",
              }));
              Swal.fire({
                title: "Booked!",
                text: "You Booked this Car",
                icon: "success",
              });
            } else
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>',
              });
          })
          .catch((error) => console.log(error));
      }
    });
  };

  const handleCancleBook = () => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "This car will become available again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel Booking!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .patch(`/cars/cancel/${id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              setCar((prev) => ({
                ...prev,
                status: "available",
              }));

              Swal.fire(
                "Cancelled!",
                "The booking has been cancelled.",
                "success"
              );
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <div className="w-full min-h-screen flex gap-5 px-10 mt-10 ">
      <div className="w-3/5 relative bg-zinc-100 h-120 rounded-2xl">
        <span className={`px-3 py-1 absolute rounded-full ${status?.toLowerCase() === "available"? "bg-white": "bg-yellow-400"} top-4 right-4 capitalize`}>
          {status}
        </span>
      </div>
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
        <p className="font-bold text-3xl my-2">
          {rent_price}tk{" "}
          <span className="text-lg text-zinc-600 font-normal">/ per day</span>
        </p>
        <div className="my-3">
          <p className="font-medium text-sm">Provider Name :</p>
          <p className="opacity-70 text-sm">{provider?.name}</p>
        </div>
        <div className="my-3">
          <p className="font-medium text-sm">Provider Email :</p>
          <p className="opacity-70 text-sm">{provider?.email}</p>
        </div>
        <div>
          <h5 className="font-semibold text-sm">Description :</h5>
          <p className="text-sm opacity-70">{description}</p>
        </div>
        <div className="flex gap-2 my-4">
          {status?.toLowerCase() === "available" ? (
            <button
              onClick={handleBookNow}
              className="bg-black rounded-full text-sm text-white py-2 w-full"
            >
              Book Now
            </button>
          ) : (
            <button
              onClick={handleCancleBook}
              className="bg-red-500 rounded-full text-sm text-white py-2 w-full"
            >
              Cancle Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarsDetails;
