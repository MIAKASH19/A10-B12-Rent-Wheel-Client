import React, { useContext } from "react";
import { Link } from "react-router";
import { MdArrowOutward } from "react-icons/md";
import { AuthContext } from "../Context/AuthContext";


const Footer = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="relative w-full h-fit flex flex-col  justify-end bg-black text-white  pt-20">
      <div className="flex flex-col  gap-4 sm:px-10 px-4">
        <p className="w-40">Uncover the Potency of Rent-Wheels</p>
        <div className="flex justify-between border-b border-zinc-700 pb-6">
          <h1 className="sm:text-7xl text-4xl  w-fit">info@rent-wheels.com</h1>
          <button className="sm:text-2xl text-xs bg-[#A0BB70] px-7 sm:py-2 py-0 flex items-center gap-3 rounded-full text-white">
            <span className="hidden sm:block">Contact Us</span>{" "}
            <MdArrowOutward className="sm:text-3xl text-2xl "></MdArrowOutward>
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-0 sm:justify-between sm:items-center h-[40vh] mt-4 sm:px-10 px-4">
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
        <div className="flex flex-col sm:items-end items-start gap-1">
          <h1 className="opacity-70 text-xl mb-3">Office</h1>
          <p className="text-3xl w-80 text-end">
            k/7 road, Rubir Mor, Noagaon, Bangladesh (+943-587-924)
          </p>
        </div>
        <div className="sm:hidden flex  gap-5">
          <Link
            to="https://www.youtube.com"
            className="uppercase cursor-pointer"
          >
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
      <div className="w-full h-fit mt-30 md:mt-0">
        <h1 className="text-[14vw] text-center bg-rd-500 leading-none mt-6  uppercase font-medium tracking-tight">
          Rent-Wheels
        </h1>
      </div>
      <div className="sm:h-[12vh] h-[8vh] w-full text-black text-sm font-medium flex items-center sm:justify-between justify-center bg-[#A0BB70] px-10 mt-5">
        <p className="uppercase cursor-pointer sm:text-start text-center text-xs">
          Copyright © rent-wheels 2025
        </p>
        <div className="hidden sm:flex gap-5">
          <Link
            to="https://www.youtube.com"
            className="uppercase cursor-pointer"
          >
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
    </div>
  );
};

export default Footer;
