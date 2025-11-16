import { useContext, useEffect, useRef, useState } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const [carList, setCarList] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);

  const updateModalRef = useRef(null);

  // 🔹 Provider যে গাড়িগুলো যোগ করেছে সেগুলো লোড করা
  useEffect(() => {
    if (!user?.email) return;

    axiosInstance
      .get(`/cars?email=${user.email}`)
      .then((res) => setCarList(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  // 🔹 Update Modal খোলা
  const handleUpdateButton = (listing) => {
    setSelectedListing(listing);
    updateModalRef.current.showModal();
  };

  const handleCancelModalButton = () => {
    updateModalRef.current.close();
  };

  // 🔹 গাড়ি ডিলিট করা
  const handleListingDelete = async (id) => {
    const res = await axiosInstance.delete(`/cars/${id}`);

    if (res.data.deletedCount > 0) {
      setCarList(carList.filter((c) => c._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "গাড়িটি সফলভাবে মুছে ফেলা হয়েছে।",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // 🔹 Update Submit
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
      .patch(`/cars/${selectedListing._id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          axiosInstance
            .get(`/cars?email=${user.email}`)
            .then((res) => setCarList(res.data));

          updateModalRef.current.close();

          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "গাড়ির তথ্য সফলভাবে আপডেট হয়েছে।",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      });
  };

  return (
    <div className="min-h-screen px-10">
      <h1 className="text-4xl border-b border-zinc-200 pb-4">
        My Car Listings : {carList.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Car name</th>
              <th>Category</th>
              <th>Rent</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {carList.map((listing, index) => (
              <tr key={listing._id}>
                <th>{index + 1}</th>
                <td>{listing.car_name}</td>
                <td>{listing.category}</td>
                <td>{listing.rent_price} tk</td>
                <td className="capitalize">{listing.status}</td>

                <td>
                  <button
                    onClick={() => handleUpdateButton(listing)}
                    className="text-white text-xs px-4 py-1 rounded-full bg-black mr-3"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-white text-xs px-4 py-1 rounded-full bg-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Update Modal */}
        <dialog
          ref={updateModalRef}
          className="modal modal-bottom h-screen sm:modal-middle"
        >
          <div className="modal-box h-full">
            <form onSubmit={handleUpdateFormSubmit} className="">
              <h1 className="text-4xl font-semibold text-center mb-2">
                Update desired fields
              </h1>

              {/* Car Name + Category */}
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
                    defaultValue={selectedListing?.car_name}
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
                    defaultValue={selectedListing?.category}
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

              {/* Photo & Status */}
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
                    defaultValue={selectedListing?.image}
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
                    defaultValue={selectedListing?.status}
                  >
                    <option disabled value="">
                      Status
                    </option>
                    <option value="available">Available</option>
                    <option value="booked">Booked</option>
                  </select>
                </div>
              </div>

              {/* Provider Name + Email */}
              <div className="flex items-center gap-5 w-full justify-between">
                <div className="flex flex-col w-1/2">
                  <label className="mt-2 text-sm">Provider Name</label>
                  <input
                    type="text"
                    className="input w-full rounded-full"
                    name="provider_name"
                    placeholder="Name"
                    disabled
                    defaultValue={selectedListing?.provider_name}
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
                    defaultValue={selectedListing?.provider_email}
                  />
                </div>
              </div>

              {/* Rent + Location */}
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
                    defaultValue={selectedListing?.rent_price}
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
                    defaultValue={selectedListing?.location}
                  />
                </div>
              </div>

              {/* Description */}
              <textarea
                name="description"
                className="border w-full rounded-2xl border-zinc-300 p-3 mt-5"
                placeholder="Write description..."
                cols="40"
                rows="3"
                defaultValue={selectedListing?.description}
              ></textarea>

              {/* Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="bg-black text-white w-full transition-all duration-300 py-2 rounded-3xl mt-3 cursor-pointer"
                >
                  Update
                </button>

                <button
                  type="button"
                  onClick={handleCancelModalButton}
                  className="bg-red-600 text-white w-full transition-all duration-300 py-2 rounded-3xl mt-3 cursor-pointer"
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

export default MyListings;
