import React from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AddCars = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const carData = {
      car_name: form.car_name.value,
      car_type: form.category.value,
      category: form.category.value,
      image: form.photo_url.value,
      provider: {
        name: form.name.value,
        email: form.provider_email.value,
      },
      status: form.status.value || "available",
      rent_price: form.rent_price.value,
      location: form.location.value,
      description: form.description.value,
      added_time: new Date().toLocaleString("sv-SE").replace("T", " "),
    };

    try {
      const res = await fetch(
        "https://rent-wheel-server-api.onrender.com/add-car",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(carData),
        }
      );

      const data = await res.json();

      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Car Added!",
          text: "The Car Added Successfully",
          timer: 2000,
          showConfirmButton: false,
        });
        form.reset();
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something Went Wrong!",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Car is not Added. Please try again.",
      });
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 backdrop-blur-2xl  px-4 md:px-0 py-20 transition-colors duration-300 overflow-hidden">
      {/* Glowing background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#9fcc51] dark:bg-[#9fcc51]/30 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-[#9fcc51] dark:bg-[#9fcc51]/30 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#9fcc51] dark:bg-[#9fcc51]/30 rounded-full blur-[160px]" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-full max-w-5xl px-5 py-10 rounded-3xl shadow-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 z-10 transition-colors duration-300"
      >
        <h1 className="text-5xl font-medium text-zinc-900 dark:text-zinc-100">
          Add all fields
        </h1>

        {/* Car Name & Category */}
        <div className="flex flex-col md:flex-row items-center gap-5 w-full justify-between">
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <label className="mt-2 font-semibold text-sm text-zinc-700 dark:text-zinc-200">
              Car Name
            </label>
            <input
              type="text"
              className="input w-full rounded-full dark:bg-zinc-700 dark:text-white border border-gray-300 dark:border-zinc-600 px-3 py-2"
              name="car_name"
              placeholder="Car name"
            />
          </div>
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <label className="mt-2 font-semibold text-sm text-zinc-700 dark:text-zinc-200">
              Category
            </label>
            <select
              name="category"
              className="w-full border border-gray-300 dark:border-zinc-600 rounded-full px-3 py-2 text-sm dark:bg-zinc-700 dark:text-white"
              required
            >
              <option disabled value="">
                Select Category
              </option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
        </div>

        {/* Photo URL & Status */}
        <div className="flex flex-col md:flex-row gap-5 w-full mt-3">
          <div className="w-full md:w-1/2">
            <label className="mt-2 font-semibold text-sm text-zinc-700 dark:text-zinc-200">
              Photo URL
            </label>
            <input
              type="text"
              className="input w-full rounded-full dark:bg-zinc-700 dark:text-white border border-gray-300 dark:border-zinc-600 px-3 py-2"
              name="photo_url"
              placeholder="Paste URL"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="mt-2 font-semibold text-sm text-zinc-700 dark:text-zinc-200">
              Status
            </label>
            <select
              name="status"
              className="w-full border border-gray-300 dark:border-zinc-600 rounded-full px-3 py-2 text-sm dark:bg-zinc-700 dark:text-white"
            >
              <option disabled selected value="">
                Status
              </option>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
            </select>
          </div>
        </div>

        {/* Provider Info */}
        <div className="flex flex-col md:flex-row gap-5 w-full mt-3">
          <div className="w-full md:w-1/2">
            <label className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
              Provider Name
            </label>
            <input
              type="text"
              className="input w-full rounded-full dark:bg-zinc-700 dark:text-white border border-gray-300 dark:border-zinc-600 px-3 py-2"
              name="name"
              placeholder="Name"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
              Provider Email
            </label>
            <input
              type="email"
              className="input w-full rounded-full dark:bg-zinc-700 dark:text-white border border-gray-300 dark:border-zinc-600 px-3 py-2"
              name="provider_email"
              placeholder="Provider Email"
            />
          </div>
        </div>

        {/* Rent & Location */}
        <div className="flex flex-col md:flex-row gap-5 w-full mt-3">
          <div className="w-full md:w-1/2">
            <label className="mt-2 font-semibold text-sm text-zinc-700 dark:text-zinc-200">
              Rent Price
            </label>
            <input
              type="number"
              className="input w-full rounded-full dark:bg-zinc-700 dark:text-white border border-gray-300 dark:border-zinc-600 px-3 py-2"
              name="rent_price"
              placeholder="Rent Price"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="mt-2 font-semibold text-sm text-zinc-700 dark:text-zinc-200">
              Location
            </label>
            <input
              type="text"
              className="input w-full rounded-full dark:bg-zinc-700 dark:text-white border border-gray-300 dark:border-zinc-600 px-3 py-2"
              name="location"
              placeholder="Location"
            />
          </div>
        </div>

        {/* Description */}
        <textarea
          name="description"
          className="border w-full rounded-2xl border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white p-3 mt-3"
          placeholder="Write description..."
          cols="40"
          rows="5"
        ></textarea>

        {/* Submit Button */}
        <button className="bg-[#9fcc51] text-white w-full transition-all duration-300 py-2 rounded-3xl mt-3 hover:bg-[#86b03c]">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCars;
