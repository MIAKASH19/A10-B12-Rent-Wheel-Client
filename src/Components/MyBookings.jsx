import { useContext, useEffect, useRef, useState } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const MyBookings = () => {
  const [bookingCar, setBookingCar] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const updateModalRef = useRef(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (!user.email) return;
    axiosInstance
      .get(`/bookings?email=${user.email}`)
      .then((res) => setBookingCar(res.data));
  }, [user]);

  const handleUpdateButton = (booking) => {
    setSelectedBooking(booking);
    updateModalRef.current.showModal();
  };

  const handleCancelModalButton = () => {
    updateModalRef.current.close();
  };

  const handleBookingDelete = async (id) => {
    const deleteRes = await axiosInstance.delete(`/bookings/${id}`);

    if (deleteRes.data.deletedCount > 0) {
      setBookingCar(bookingCar.filter((b) => b._id !== id));
    }

    const deletedBooking = bookingCar.find((b) => b._id === id);
    const carId = deletedBooking?.car_id;

    if (carId) {
      await axiosInstance.patch(`/cars/cancel/${carId}`);
    }
  };

  const handleUpdateFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      car_name: form.car_name.value,
      category: form.category.value,
      image: form.photo_url.value,
      status: form.status.value,
      rent_price: form.rent_price.value,
      location: form.location.value,
      description: form.description.value,
    };

    axiosInstance
      .patch(`/bookings/${selectedBooking._id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          axiosInstance
            .get(`/bookings?email=${user.email}`)
            .then((res) => setBookingCar(res.data));

          updateModalRef.current.close();
          setSelectedBooking(null);

          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Your booking has been updated successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong. Try again!",
          });
        }
      });
  };

  return (
    <div className="min-h-screen px-10">
      <h1 className="text-4xl border-b border-zinc-200 pb-4">
        My Bookings : {bookingCar.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Car name</th>
              <th>Status</th>
              <th>Provider Email</th>
              <th>Location</th>
              <th>Rent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookingCar.map((booking, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="font-bold">{booking.car_name}</div>
                  </div>
                </td>
                <td className="capitalize">{booking.status}</td>
                <td>{booking.provider_email}</td>
                <td>{booking.location}</td>
                <td>{booking.rent_price} tk</td>
                <th>
                  <button
                    onClick={() => handleUpdateButton(booking)}
                    className=" text-white text-xs px-4 py-1 capitalize font-normal rounded-full bg-black btn-xs mr-3 cursor-pointer"
                  >
                    update
                  </button>
                  <button
                    onClick={() => handleBookingDelete(booking._id)}
                    className=" text-white text-xs px-4 py-1 capitalize font-normal rounded-full bg-red-500 btn-xs cursor-pointer"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>

        <dialog
          ref={updateModalRef}
          className="modal modal-bottom h-screen sm:modal-middle"
        >
          <div className="modal-box h-full">
            <form onSubmit={handleUpdateFormSubmit} className="">
              <h1 className="text-4xl font-semibold text-center mb-2">
                Update desired fields
              </h1>
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
                    defaultValue={selectedBooking?.car_name}
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
                    defaultValue={selectedBooking?.category}
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
              <div className="flex gap-5 w-full mt-2">
                <div className="w-1/2">
                  <label className="mt-2 font-semibold text-zinc-700 text-sm">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    className="input w-full rounded-full"
                    name="photo_url"
                    placeholder="Paste URL"
                    defaultValue={selectedBooking?.image}
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
                    defaultValue={selectedBooking?.status}
                  >
                    <option disabled value="">
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
                    name="provider_name"
                    placeholder="Name"
                    disabled
                    defaultValue={selectedBooking?.provider_name}
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="mt-2 text-sm">Provider Email</label>
                  <input
                    type="email"
                    className="input w-full rounded-full"
                    name="provider_email"
                    placeholder="Provider Email"
                    disabled
                    defaultValue={selectedBooking?.provider_email}
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
                    defaultValue={selectedBooking?.rent_price}
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
                    defaultValue={selectedBooking?.location}
                  />
                </div>
              </div>
              <textarea
                name="description"
                className="border w-full rounded-2xl border-zinc-300 p-3 mt-5"
                id=""
                placeholder="Write description..."
                cols="40"
                rows="3"
                defaultValue={selectedBooking?.description}
              ></textarea>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="bg-black text-white w-full transition-all duration-300  py-2 rounded-3xl mt-3 cursor-pointer"
                >
                  Update
                </button>
                <button
                  onClick={handleCancelModalButton}
                  className="bg-red-600 text-white w-full transition-all duration-300  py-2 rounded-3xl mt-3 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyBookings;
