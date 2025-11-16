import { useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const MyBookings = () => {
  const [bookingCar, setBookingCar] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  useEffect(() => {
    if (!user.email) return;
    axiosInstance
      .get(`/bookings?email=${user.email}`)
      .then((res) => setBookingCar(res.data));
  }, [user]);

  const handleBookingDelete = async (id) => {
    // SweetAlert confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const deleteRes = await axiosInstance.delete(`/bookings/${id}`);

        if (deleteRes.data.deletedCount > 0) {
          const deletedBooking = bookingCar.find((b) => b._id === id);
          const carId = deletedBooking?.car_id;

          if (carId) {
            await axiosInstance.patch(`/cars/cancel/${carId}`);
          }

          setBookingCar(bookingCar.filter((b) => b._id !== id));

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Booking has been deleted successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Failed to delete booking. Try again!",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong. Please try again.",
        });
      }
    }
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
                    onClick={() => handleBookingDelete(booking._id)}
                    className="text-white text-xs px-4 py-1 capitalize font-normal rounded-full bg-red-500 btn-xs cursor-pointer"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
