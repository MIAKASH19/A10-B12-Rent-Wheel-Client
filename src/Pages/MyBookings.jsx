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
  const { user , loading} = useContext(AuthContext);
  const axiosInstance = useAxios();

  useEffect(() => {
    if (loading) return;        
    if (!user?.email) return;   

    axiosInstance
      .get(`/bookings?email=${user.email}`)
      .then((res) => setBookingCar(res.data))
      .catch(() => {});
  }, [loading, user]);

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
    <div className="min-h-screen ms:px-10 px-4 mt-10">
      <h1 className="text-4xl border-b border-zinc-200 pb-4">
        My Bookings : {bookingCar.length}
      </h1>

      {bookingCar.length === 0 && !showSuccess ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <Lottie animationData={emptyAnimation} loop className="w-72" />
          <p className="text-xl text-zinc-600 mt-4">
            You have no bookings yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="hidden md:table-cell text-xs md:text-base">
                  Sl No.
                </th>
                <th className="table-cell text-xs md:text-base">Car name</th>
                <th className="table-cell text-xs md:text-base">Status</th>
                <th className="hidden md:table-cell text-xs md:text-base">
                  Provider Email
                </th>
                <th className="hidden md:table-cell text-xs md:text-base">
                  Location
                </th>
                <th className="table-cell text-xs md:text-base">Rent</th>
                <th className="table-cell text-xs md:text-base">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookingCar.map((booking, index) => (
                <tr key={booking._id} className="border-b border-zinc-200">
                  <th className="hidden md:table-cell">{index + 1}</th>

                  <td className="table-cell">
                    <div className="flex items-center md:text-md text-xs gap-3 font-bold">
                      {booking.car_name}
                    </div>
                  </td>

                  <td className="table-cell capitalize md:text-md text-xs">
                    {booking.status}
                  </td>

                  <td className="hidden md:table-cell text-sm md:text-md">
                    {booking.provider_email}
                  </td>

                  <td className="hidden md:table-cell text-sm">
                    {booking.location}
                  </td>

                  <td className="table-cell md:text-md text-xs">
                    {booking.rent_price} tk
                  </td>

                  <td className="table-cell md:text-md text-xs">
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
