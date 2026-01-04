import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxios from "../hooks/useAxios";
import { IoLocationOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const CarsDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosInstance = useAxios();

  const [car, setCar] = useState({});
  const [recommended, setRecommended] = useState([]);

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

  // Fetch car details
  useEffect(() => {
    axiosInstance.get(`/cars/${id}`).then((res) => setCar(res.data));
  }, [id]);

  // Fetch recommended cars (same category, excluding current car)
  useEffect(() => {
    if (category) {
      axiosInstance
        .get(`/cars?category=${category}`)
        .then((res) =>
          setRecommended(res.data.filter((c) => c._id !== id).slice(0, 4))
        );
    }
  }, [category, id]);

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBookings),
    }).then((res) => res.json());
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
            if (res.data.modifiedCount > 0) {
              setCar((prev) => ({ ...prev, status: "unavailable" }));
              AddBooking(car);
              Swal.fire("Booked!", "You Booked this Car", "success");
            } else {
              Swal.fire("Oops...", "Something went wrong!", "error");
            }
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
          const userBooking = bookingRes.data.find((b) => b.car_id === id);
          if (!userBooking)
            return Swal.fire("No Booking", "No booking found", "info");

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
    <div className="w-full min-h-screen flex flex-col items-start gap-8 md:px-10 px-4 py-10 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300 md:mt-16">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-3 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 px-4 py-2 rounded-full"
      >
        <FaArrowLeft />
        Back
      </button>

      {/* Main Car Details */}
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Image */}
        <div className="lg:w-3/5 w-full h-80 lg:h-112 rounded-3xl relative overflow-hidden shadow-xl">
          <img
            src={image}
            alt={car_name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <span
            className={`absolute top-4 right-4 px-4 py-1 rounded-full font-medium text-sm ${
              status?.toLowerCase() === "available"
                ? "bg-green-100 text-green-700"
                : "bg-red-200 text-red-800"
            }`}
          >
            {status?.toLowerCase() === "available" ? "Available" : "Booked"}
          </span>
        </div>

        {/* Details */}
        <div className="lg:w-2/5 w-full flex flex-col gap-4">
          <p className="px-3 py-1 w-fit rounded-full bg-zinc-200 dark:bg-zinc-800 text-sm font-medium">
            {category}
          </p>
          <h1 className="text-3xl font-bold">{car_name}</h1>
          <p className="flex items-center gap-2 text-zinc-500">
            <IoLocationOutline /> {location}
          </p>
          <p className="text-2xl font-semibold text-zinc-900 dark:text-white">
            {rent_price}tk{" "}
            <span className="text-sm font-normal text-zinc-500">/ per day</span>
          </p>
          <div>
            <h5 className="font-semibold text-sm">Provider:</h5>
            <p className="text-sm opacity-70">{provider?.name}</p>
            <p className="text-sm opacity-70">{provider?.email}</p>
          </div>
          <div>
            <h5 className="font-semibold text-sm">Description:</h5>
            <p className="text-sm opacity-70">{description}</p>
          </div>

          <button
            onClick={
              status?.toLowerCase() === "available"
                ? handleBookNow
                : () => handleCancleBook(id)
            }
            className={`w-full py-3 rounded-2xl font-medium transition-colors duration-300 ${
              status?.toLowerCase() === "available"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {status?.toLowerCase() === "available" ? "Book Now" : "Cancel Booking"}
          </button>
        </div>
      </div>

      {/* Recommended Cars */}
      {recommended.length > 0 && (
        <div className="w-full mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">
            Recommended Cars
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recommended.map((c) => (
              <div
                key={c._id}
                className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => navigate(`/cars/${c._id}`)}
              >
                <img
                  src={c.image}
                  alt={c.car_name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3 flex flex-col gap-1">
                  <p className="text-sm font-medium">{c.category}</p>
                  <h3 className="font-semibold text-lg">{c.car_name}</h3>
                  <p className="text-sm text-zinc-500">
                    {c.rent_price}tk / per day
                  </p>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      c.status === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarsDetails;
