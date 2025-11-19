import React, { useContext } from "react";
import { Link } from "react-router";
import { MdArrowOutward } from "react-icons/md";
import { AuthContext } from "../Context/AuthContext";

const Footer = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="relative w-full h-fit flex flex-col  justify-end bg-black text-white  pt-20">
      <div className="flex flex-col  gap-4 px-10">
        <p className="w-40">Uncover the Potency of Rent-Wheels</p>
        <div className="flex justify-between border-b border-zinc-700 pb-6">
          <h1 className="text-7xl w-fit">info@rent-wheels.com</h1>
          <button className="text-2xl bg-[#A0BB70] px-7 py-2 flex items-center gap-3 rounded-full text-white">
            Contact Us <MdArrowOutward className="text-3xl "></MdArrowOutward>
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center h-[40vh] mt-4 px-10">
        <div className="flex flex-col gap-1">
          <h1 className="opacity-70 text-sm mb-3">Navigation</h1>
          <Link to="/" className="text-3xl font-medium">
            Home
          </Link>
          <Link to="/browse-cars" className="text-3xl font-medium">
            Browse Car
          </Link>
          <Link to="/add-car" className="text-3xl font-medium">
            Add Car
          </Link>
          {user && (
            <Link to="/my-listings" className="text-3xl font-medium">
              My Listings
            </Link>
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          <h1 className="opacity-70 text-xl mb-3">Office</h1>
          <p className="text-3xl w-80 text-end">
            k/7 road, Rubir Mor, Noagaon, Bangladesh (+943-587-924)
          </p>
        </div>
      </div>
      <div className="  w-full h-fit ">
        <h1 className="text-[14vw] text-center bg-rd-500 leading-none mt-6  uppercase font-medium tracking-tight">
          Rent-Wheels
        </h1>
      </div>
      <div className="h-[12vh]  w-full text-black text-sm font-medium flex items-center justify-between bg-purple-600 px-10">
        <p className="uppercase cursor-pointer">
          Copyright ©️ rent-wheels 2025
        </p>
        <Link to="https://www.youtube.com" className="uppercase cursor-pointer">
          Youtube
        </Link>
        <Link
          to="https://www.facebook.com"
          className="uppercase cursor-pointer"
        >
          Facebook
        </Link>
        <Link
          to="https://www.instagram.com"
          className="uppercase cursor-pointer"
        >
          Instagram
        </Link>
        <Link
          to="https://www.linkedin.com"
          className="uppercase cursor-pointer"
        >
          LinkedIn
        </Link>
      </div>
    </div>
  );
};

export default Footer;
