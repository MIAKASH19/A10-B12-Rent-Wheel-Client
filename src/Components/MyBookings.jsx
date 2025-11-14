import React, { useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";

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

  return (
    <div className="min-h-screen px-10">
      <h1 className="text-4xl border-b border-zinc-200 pb-4">
        My Bookings : {bookingCar.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>
                Sl No.
              </th>
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
              <tr>
                <th>
                  {index+1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{booking.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                </td>
                <td>{booking.provider_email}</td>
                <td>{booking.location}</td>
                <td>{booking.rent} tk</td>
                <th >
                  <Link to={`/cars-details/${booking.car_id}`} className=" text-white text-xs px-4 py-1 capitalize font-normal rounded-full bg-black btn-xs mr-3 cursor-pointer">details</Link>
                  <button className=" text-white text-xs px-4 py-1 capitalize font-normal rounded-full bg-red-500 btn-xs cursor-pointer">Delete</button>
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
