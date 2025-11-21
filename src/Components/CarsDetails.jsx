import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxios from "../hooks/useAxios";
import { IoLocationOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import { FaArrowLeft } from "react-icons/fa6";

const CarsDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [car, setCar] = useState({});
  const { id } = useParams();
  const axiosInstance = useAxios();

  const {
    car_name,
    rent_price,
    location,
    status,
    provider,
    category,
    description,
    image,
  } = car;

  useEffect(() => {
    axiosInstance.get(`/cars/${id}`).then((res) => setCar(res.data));
  }, []);

  const AddBooking = (car) => {
    const newBookings = {
      car_name: car.car_name,
      category: car.category,
      image: car.image,
      provider_name: car?.provider?.name,
      provider_email: car?.provider?.email,
      user_email: user.email,
      rent_price: car.rent_price,
      location: car.location,
      status: car.status,
      description: car.description || "",
      car_id: id,
    };

    fetch("https://rent-wheel-server-api.onrender.com/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBookings),
    })
      .then((res) => res.json())
      .then((data) => {});
  };

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
            // console.log(res.data);
            if (res.data.modifiedCount > 0) {
              setCar((prev) => ({
                ...prev,
                status: "unavailable",
              }));
              AddBooking(car);
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

  const handleCancleBook = async (id) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "This car will become available again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel Booking!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const bookingRes = await axiosInstance.get(
            `/bookings?email=${user.email}`
          );
          // console.log(bookingRes);
          const userBooking = bookingRes.data.find((b) => b.car_id === id);
          // console.log(userBooking);

          if (!userBooking) {
            return Swal.fire(
              "No Booking",
              "No booking found for this car.",
              "info"
            );
          }

          const bookingId = userBooking._id;

          const carCancelRes = await axiosInstance.patch(`/cars/cancel/${id}`);

          if (carCancelRes.data.modifiedCount > 0) {
            setCar((prev) => ({ ...prev, status: "available" }));

            await axiosInstance.delete(`/bookings/${bookingId}`);

            Swal.fire(
              "Cancelled!",
              "The booking has been cancelled and removed.",
              "success"
            );
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Something went wrong!", "error");
        }
      }
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-start gap-5 md:px-10 px-4 md:mt-10 mt-20 ">
      <div className="flex items-center gap-1 border-b border-zinc-100 w-full pb-3">
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-zinc-100 flex items-center gap-3 transition-all duration-300 px-4 py-2 rounded-full"
        >
          <FaArrowLeft />
          Back
        </button>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
        <div className="lg:w-3/5 md:w-full w-full relative bg-zinc-100 lg:h-120  h-60 rounded-2xl overflow-hidden">
          <img src={image} className="w-full h-full object-cover" />
          <span
            className={`px-3 py-1 absolute rounded-full ${
              status?.toLowerCase() === "available"
                ? "bg-white"
                : "bg-yellow-400"
            } top-4 right-4 capitalize`}
          >
            {status?.toLowerCase() === "available" ? "Available" : "Booked"}
          </span>
        </div>
        <div className="h-120 lg:w-2/5 w-full rounded-2xl pl-2">
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
                onClick={() => handleCancleBook(id)}
                className="bg-zinc-100 rounded-full text-sm text-white py-2 w-full"
              >
                Cancle Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsDetails;


