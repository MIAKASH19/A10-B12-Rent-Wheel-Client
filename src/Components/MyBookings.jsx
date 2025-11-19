import { useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import emptyAnimation from "../../public/Empty State.json";
import successAnimation from "../../public/Done.json";

const MyBookings = () => {
  const [bookingCar, setBookingCar] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  // Fetch bookings
  useEffect(() => {
    if (!user?.email) return;
    axiosInstance
      .get(`/bookings?email=${user.email}`)
      .then((res) => setBookingCar(res.data));
  }, [user]);

  // Delete booking handler
  const handleBookingDelete = async (id) => {
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

          // Show success Lottie animation
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);

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
    <div className="min-h-screen px-10 mt-20">
      <h1 className="text-4xl border-b border-zinc-200 pb-4">
        My Bookings : {bookingCar.length}
      </h1>

      {bookingCar.length === 0 && !showSuccess ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <Lottie
            animationData={emptyAnimation}
            loop
            className="w-72"
          />
          <p className="text-xl text-zinc-600 mt-4">
            You have no bookings yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="table w-full">
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
                <tr key={booking._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3 font-bold">
                      {booking.car_name}
                    </div>
                  </td>
                  <td className="capitalize">{booking.status}</td>
                  <td>{booking.provider_email}</td>
                  <td>{booking.location}</td>
                  <td>{booking.rent_price} tk</td>
                  <td>
                    <button
                      onClick={() => handleBookingDelete(booking._id)}
                      className="text-white text-xs px-4 py-1 capitalize font-normal rounded-full bg-red-500 btn-xs cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <Lottie
            animationData={successAnimation}
            loop={false}
            className="w-52"
          />
        </div>
      )}
    </div>
  );
};

export default MyBookings;
