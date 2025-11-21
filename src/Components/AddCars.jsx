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
      status: "available",
      rent_price: form.rent_price.value,
      location: form.location.value,
      description: form.description.value,
      added_time: new Date().toLocaleString("sv-SE").replace("T", " "),
    };

    try {
      const res = await fetch("https://rent-wheel-server-api.onrender.com/add-car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      });

      const data = await res.json();
      // console.log("server response", data);

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
    <div className="w-full min-h-screen flex items-center justify-center bg-zinc-100 px-4 md:px-0 py-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-150 px-5 py-10 rounded-3xl shadow-2xl bg-white border border-zinc-200"
      >
        <h1 className="text-5xl font-medium">Add all fields</h1>
        <div className="flex items-center gap-5 w-full justify-between">
          <div className="flex flex-col gap-2 w-1/2">
            <label className="mt-2 font-semibold text-zinc-700 text-sm">
              Car Name
            </label>
            <input
              type="text"
              className="input w-full rounded-full"
              name="car_name"
              placeholder="Car name"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label className="mt-2 font-semibold text-zinc-700 text-sm">
              Category
            </label>
            <select
              name="category"
              className="w-full border border-gray-300 rounded-full px-2 py-2 text-sm"
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
        <div className="flex gap-5 w-full">
          <div className="w-1/2">
            <label className="mt-2 font-semibold text-zinc-700 text-sm">
              Photo URL
            </label>
            <input
              type="text"
              className="input w-full rounded-full"
              name="photo_url"
              placeholder="Paste URL"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="mt-2 font-semibold text-zinc-700 text-sm">
              Status
            </label>
            <select
              name="status"
              className="w-full border border-gray-300 rounded-full px-2 py-2 text-sm"
              required
            >
              <option disabled selected value="">
                Status
              </option>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-5 w-full justify-between">
          <div className="flex flex-col w-1/2">
            <label className="mt-2 text-sm">Provider Name</label>
            <input
              type="text"
              className="input w-full rounded-full"
              name="name"
              placeholder="Name"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="mt-2 text-sm">Provider Email</label>
            <input
              type="email"
              className="input w-full rounded-full"
              name="provider_email"
              placeholder="Provider Email"
            />
          </div>
        </div>
        <div className="flex items-center gap-5 w-full justify-between">
          <div className="flex flex-col gap-2 w-1/2">
            <label className="mt-2 font-semibold text-zinc-700 text-sm">
              Rent Price
            </label>
            <input
              type="number"
              className="input w-full rounded-full"
              name="rent_price"
              placeholder="Rent Price"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label className="mt-2 font-semibold text-zinc-700 text-sm">
              Location
            </label>
            <input
              type="text"
              className="input w-full rounded-full"
              name="location"
              placeholder="location"
            />
          </div>
        </div>
        <textarea
          name="description"
          className="border w-full rounded-2xl border-zinc-300 p-3"
          placeholder="Write description..."
          cols="40"
          rows="5"
        ></textarea>
        <button className="bg-black text-white w-full transition-all duration-300  py-2 rounded-3xl mt-3 cursor-pointer">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCars;
