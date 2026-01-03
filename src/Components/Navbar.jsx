import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { ThemeContext } from "../Context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { LuLayoutDashboard } from "react-icons/lu";


const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const { dark } = useContext(ThemeContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          title: "Signed Out!",
          text: "You have been successfully signed out.",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while signing out.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const links = <>
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
      to={"/services"}
      className="relative rounded-full w-fit text-sm transition-all duration-300 px-4 py-2"
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="w-2 h-2 rounded-full bg-green-400 absolute top-1/2 left-2 -translate-x-full -translate-y-1/2"></span>
          )}
          Services
        </>
      )}
    </NavLink>
    <NavLink
      to={"/about-us"}
      className="relative rounded-full w-fit text-sm transition-all duration-300 px-4 py-2"
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="w-2 h-2 rounded-full bg-green-400 absolute top-1/2 left-2 -translate-x-full -translate-y-1/2"></span>
          )}
          About Us
        </>
      )}
    </NavLink>
    <NavLink
      to={"/contact-us"}
      className="relative rounded-full w-fit text-sm transition-all duration-300 px-4 py-2"
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="w-2 h-2 rounded-full bg-green-400 absolute top-1/2 left-2 -translate-x-full -translate-y-1/2"></span>
          )}
          Contact Us
        </>
      )}
    </NavLink>
    <NavLink
      to={"/privacy"}
      className="relative rounded-full w-fit text-sm transition-all duration-300 px-4 py-2"
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="w-2 h-2 rounded-full bg-green-400 absolute top-1/2 left-2 -translate-x-full -translate-y-1/2"></span>
          )}
          Privacy Policy
        </>
      )}
    </NavLink>
  </>

  return (
    <div className="navbar fixed top-0 left-0 bg-white dark:bg-zinc-900 dark:text-white sm:px-8 px-0 z-99 border-b border-zinc-300 ">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-xl border border-zinc-200"
          >
            <Link className="py-3 mx-5 border-b border-zinc-200" to='/'>Home</Link>
            <Link className="py-3 mx-5 border-b border-zinc-200" to='/browse-cars'>Browse Car</Link>
            <Link className="py-3 mx-5 border-b border-zinc-200" to='/add-car'>Add Car</Link>
            <Link className="py-3 mx-5 border-b border-zinc-200" to='/services'>Services</Link>
            <Link className="py-3 mx-5 border-b border-zinc-200" to='/about-us'>About us</Link>
            <Link className="py-3 mx-5 border-b border-zinc-200" to='/contact-us'>Contact us</Link>
            <Link className="py-3 mx-5 border-b border-zinc-200" to='/privacy'>Priacy Policy</Link>
          </ul>
        </div>
        <Link to="/" className="sm:text-xl text-sm flex items-center gap-2 font-semibold">
          {dark ? (
            <img src="/dark-theme-logo.png" alt="Logo" className="w-fit h-10 object-contain" />
          ) : (
            <img src="/rent-wheels-logo.png" alt="Logo" className="w-fit h-10 object-contain" />
          )}
          Rent-Wheels
        </Link>
      </div>
      <div className="navbar-center hidden md:block gap-2 ">
        {links}
      </div>
      <div className="navbar-end gap-4 text-zinc-800 lg:flex md:pr-0 pr-5">
        <ThemeToggle></ThemeToggle>
        {user ? (
          <div className="dropdown dropdown-bottom  dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className=" w-10 h-10 rounded-full overflow-hidden"
            >
              <img src={user.photoURL} className="w-full h-full object-cover" />
            </div>
            <div
              tabIndex="-1"
              className="dropdown-content menu bg-white dark:bg-zinc-900 dark:text-white text-zinc-900 rounded-3xl z-1 w-52 p-4 shadow-xl border border-zinc-200"
            >
              <h1 className="opacity-80 mb-2 ">{user.displayName}</h1>
              <p className="border-b border-zinc-200 pb-2 text-xs">
                {user.email}
              </p>
              <Link to="/dashboard" className="flex items-center py-2 gap-2 hover:text-[#9fcc51] rounded-2xl mt-2">
                <LuLayoutDashboard />
                Dashboard</Link>
              <button
                onClick={handleSignOut}
                className="bg-[#A0BB70] text-white transition-all duration-300-2 rounded-3xl mt-3 py-2"
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
