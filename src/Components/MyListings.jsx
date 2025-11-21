import { useContext, useEffect, useRef, useState } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import emptyAnimation from "../../public/Empty State.json";
import successAnimation from "../../public/Done.json";

const MyListings = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [showSuccess, setShowSuccess] = useState(false);
  const [carList, setCarList] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const updateModalRef = useRef(null);

  useEffect(() => {
    if (loading) return;
    if (!user?.email) return;

    axiosInstance
      .get(`/cars?email=${user.email}`)
      .then((res) => setCarList(res.data))
      .catch((err) => console.error(err));
  }, [user, loading]);

  const handleUpdateButton = (listing) => {
    setSelectedListing(listing);
    updateModalRef.current.showModal();
  };

  const handleCancelModalButton = () => {
    updateModalRef.current.close();
  };

  const handleListingDelete = async (id) => {
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
        const res = await axiosInstance.delete(`/cars/${id}`);

        if (res.data.deletedCount > 0) {
          setCarList(carList.filter((c) => c._id !== id));

          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
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
            text: "Your Car Info is updated, Successfully",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      });
  };

  return (
    <div className="min-h-screen md:px-10 px-4 mt-20">
      <h1 className="text-4xl border-b border-zinc-200 pb-4">
        My Car Listings : {carList.length}
      </h1>

      {carList.length === 0 && !showSuccess ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <Lottie animationData={emptyAnimation} loop className="w-72" />
          <p className="text-xl text-zinc-600 mt-4">
            You have no car listings yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th className="hidden sm:table-cell">Sl No.</th>
                <th className="table-cell">Car name</th>
                <th className="hidden sm:table-cell">Category</th>
                <th className="hidden sm:table-cell">Status</th>
                <th className="table-cell">Rent</th>
                <th className="table-cell">Action</th>
              </tr>
            </thead>
            <tbody>
              {carList.map((listing, index) => (
                <tr key={listing._id}>
                  <th className="hidden sm:table-cell">{index + 1}</th>
                  <td className="table-cell">{listing.car_name}</td>
                  <td className="hidden sm:table-cell">{listing.category}</td>
                  <td className="hidden sm:table-cell capitalize">
                    {listing.status}
                  </td>
                  <td className="table-cell">{listing.rent_price} tk</td>

                  <td className="flex">
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

                <textarea
                  name="description"
                  className="border w-full rounded-2xl border-zinc-300 p-3 mt-5"
                  placeholder="Write description..."
                  cols="40"
                  rows="3"
                  defaultValue={selectedListing?.description}
                ></textarea>

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
                    className="bg-zinc-100 text-white w-full transition-all duration-300 py-2 rounded-3xl mt-3 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </dialog>
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

export default MyListings;
