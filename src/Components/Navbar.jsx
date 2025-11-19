import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    alert("User Signed Out");
    signOutUser()
      .then(() => {})
      .catch();
  };

  return (
    <div className="navbar fixed top-0 left-0 bg-base-100 sm:px-8 px-0 z-99 border-b border-zinc-300 ">
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
            <Link className="my-3 mx-2" to='/'>Home</Link>
            <Link className="my-3 mx-2" to='/browse-cars'>Browse Car</Link>
            <Link className="my-3 mx-2" to='/add-car'>Add Car</Link>
            <Link className="my-3 mx-2" to='/my-listings'>My Listings</Link>
            <Link className="my-3 mx-2" to='/my-bookings'>My Bookings</Link>
          </ul>
        </div>
        <Link to="/" className="sm:text-xl text-sm">
          Rent-Wheels
        </Link>
      </div>
      <div className="navbar-center hidden md:block gap-2 ">
        <NavLink
          to={"/"}
          className=" relative rounded-full w-fit text-sm transition-all duration-300 px-4 py-2"
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="w-2 h-2 rounded-full bg-green-400 absolute top-1/2 left-2 -translate-x-full -translate-y-1/2"></span>
              )}
              Home
            </>
          )}
        </NavLink>
        <NavLink
          to={"/browse-cars"}
          className="relative rounded-full w-fit text-sm transition-all duration-300 px-4 py-2"
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="w-2 h-2 rounded-full bg-green-400 absolute top-1/2 left-2 -translate-x-full -translate-y-1/2"></span>
              )}
              Browse Car
            </>
          )}
        </NavLink>
        <NavLink
          to={"/add-car"}
          className="relative rounded-full w-fit text-sm transition-all duration-300 px-4 py-2"
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="w-2 h-2 rounded-full bg-green-400 absolute top-1/2 left-2 -translate-x-full -translate-y-1/2"></span>
              )}
              Add Car
            </>
          )}
        </NavLink>
        <NavLink
          to={`/my-listings?email=${user?.email}`}
          className="relative rounded-full w-fit text-sm transition-all duration-300 px-4 py-2"
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="w-2 h-2 rounded-full bg-green-400 absolute top-1/2 left-2 -translate-x-full -translate-y-1/2"></span>
              )}
              My Listings
            </>
          )}
        </NavLink>
        <NavLink
          to={`/my-bookings?email=${user?.email}`}
          className="relative rounded-full w-fit text-sm transition-all duration-300 px-4 py-2"
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="w-2 h-2 rounded-full bg-green-400 absolute top-1/2 left-2 -translate-x-full -translate-y-1/2"></span>
              )}
              My Bookings
            </>
          )}
        </NavLink>
      </div>
      <div className="navbar-end gap-4 text-zinc-800 hidden lg:flex">
        {user ? (
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
                className="bg-[#A0BB70] text-white transition-all duration-300-2 rounded-3xl mt-3"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <Link
            to={"/sign-up"}
            className="bg-[#A0BB70] rounded-full text-sm text-white hover:bg-black transition-all duration-300 px-4 py-2"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
