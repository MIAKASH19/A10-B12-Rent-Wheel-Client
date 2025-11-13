import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    alert("User Signed Out")
    signOutUser()
      .then(() => {})
      .catch();
  };

  return (
    <div className="navbar bg-base-100 px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a href="#">Item 2</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="text-xl">Rent-Wheels</a>
      </div>
      <div className="navbar-center gap-2 ">
        <Link
          to={"/"}
          className="rounded-full w-fit text-sm hover:bg-zinc-200 transiont-all duration-300 px-4 py-2"
        >
          Home
        </Link>
        <Link
          to={"/add-car"}
          className="rounded-full w-fit text-sm hover:bg-zinc-200 transiont-all duration-300 px-4 py-2"
        >
          Add Car
        </Link>
        <Link
          to={"/my-listings"}
          className="rounded-full w-fit text-sm hover:bg-zinc-200 transiont-all duration-300 px-4 py-2"
        >
          My Listings
        </Link>
        <Link
          to={"/my-bookings"}
          className="rounded-full w-fit text-sm hover:bg-zinc-200 transiont-all duration-300 px-4 py-2"
        >
          My Bookings
        </Link>
        <Link
          to={"/browse-cars"}
          className="rounded-full w-fit text-sm hover:bg-zinc-200 transiont-all duration-300 px-4 py-2"
        >
          Browse Cars
        </Link>
      </div>
      <div className="navbar-end gap-4 text-zinc-800 hidden lg:flex">
        {user ? (
          //
          <div className="dropdown dropdown-bottom dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className=" w-10 h-10 rounded-full overflow-hidden"
            >
              <img src={user.photoURL} className="w-full h-full object-cover" />
            </div>
            <div
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-3xl z-1 w-52 p-4 shadow-sm"
            >
              <h1 className="opacity-80 mb-2 ">{user.displayName}</h1>
              <p className="border-b border-zinc-200 pb-2 text-xs">
                {user.email}
              </p>
              <button
                onClick={handleSignOut}
                className="bg-[#A0BB70] text-white transition-all duration-300 hover:bg-black py-2 rounded-3xl mt-3"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <Link
            to={"/sign-up"}
            className="bg-[#A0BB70] rounded-full text-sm text-white hover:bg-black transiont-all duration-300 px-4 py-2"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
