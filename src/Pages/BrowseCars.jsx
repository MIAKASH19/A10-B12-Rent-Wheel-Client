import React, { useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import CarCard from "../Components/CarCard";
import { AuthContext } from "../Context/AuthContext";
import Lottie from "lottie-react";
import emptyAnimation from "../../public/Empty State.json";

const BrowseCars = () => {
  const axiosInstance = useAxios();
  const { loading, setLoading } = useContext(AuthContext);

  const [cards, setCards] = useState([]);
  const [totalCards, setTotalCards] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState(""); 
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const limit = 8; 

  useEffect(() => {
    setLoading(true);

    axiosInstance
      .get(
        `/browse-cars?limit=${limit}&skip=${currentPage * limit
        }&search=${encodeURIComponent(searchText)}&category=${categoryFilter}&sort=${sortOrder}`
      )
      .then((res) => {
        setCards(res.data.result);
        setTotalCards(res.data.total);
        setTotalPages(Math.ceil(res.data.total / limit));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [currentPage, searchText, categoryFilter, sortOrder]);

  return (
    <div className="w-full relative mx-auto md:px-10 px-5 py-20 md:pt-30 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-center flex-col mb-15">
        <h1 className="md:text-7xl text-6xl font-medium tracking-tight text-center">
          Drive Your Dreams, Rent Your Ride
        </h1>
        <p className="text-sm mt-2 text-center max-w-3xl">
          Choose from our premium collection of cars and make every journey memorable.
          Fast booking, reliable service, and comfort at your fingertips.
        </p>
        <div className="w-full h-px mt-10 bg-zinc-300"></div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <input
          type="text"
          value={searchText}
          onChange={(e) => { setSearchText(e.target.value); setCurrentPage(0); }}
          placeholder="Search cars by name..."
          className="w-full md:w-1/2 rounded-xl border border-zinc-300 px-5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
        />

        <select
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(0); }}
          className="w-full md:w-1/4 rounded-xl border border-zinc-300 px-2 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
        >
          <option value="">All Categories</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Luxury">Luxury</option>
          <option value="Electric">Electric</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => { setSortOrder(e.target.value); setCurrentPage(0); }}
          className="w-full md:w-1/4 rounded-xl border border-zinc-300 px-2 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
        >
          <option value="">Sort By</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center h-[40vh] ">
          <span className="loading loading-spinner text-success"></span>
        </div>
      ) : cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center my-10">
          <Lottie animationData={emptyAnimation} loop className="w-72" />
          <p className="text-xl text-zinc-600 mt-4">No Car Found.</p>
        </div>
      ) : (
        <>
          {/* Car Grid */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center gap-5 my-10 mb-10">
            {cards.map((car) => <CarCard key={car._id} car={car} />)}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 mt-5">
            {currentPage > 0 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 rounded-lg border border-zinc-300 bg-white hover:bg-blue-600 hover:text-white transition"
              >
                Prev
              </button>
            )}

            {[...Array(totalPages).keys()].map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-4 py-2 rounded-lg border border-zinc-300 transition ${currentPage === pageNumber ? "bg-blue-600 text-white" : "bg-white text-black hover:bg-blue-600 hover:text-white"}`}
              >
                {pageNumber + 1}
              </button>
            ))}

            {currentPage < totalPages - 1 && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 rounded-lg border border-zinc-300 bg-white hover:bg-blue-600 hover:text-white transition"
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BrowseCars;
