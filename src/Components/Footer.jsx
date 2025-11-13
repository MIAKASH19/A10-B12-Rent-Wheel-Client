import React from "react";
import { Link } from "react-router";
import { MdArrowOutward } from "react-icons/md";


const Footer = () => {
  return (
    <div className="relative w-full h-[110vh] bg-black text-white  pt-20">
      <div className="flex flex-col gap-4 px-10">
        <p className="w-40">Uncover the Potency of Rent-Wheels</p>
        <div className="flex justify-between border-b border-zinc-700 pb-6">
          <h1 className="text-7xl w-fit">
            info@rent-wheels.com
          </h1>
          <button className="text-2xl bg-[#A0BB70] px-7 py-2 flex items-center gap-3 rounded-full text-white">Contact Us <MdArrowOutward className="text-3xl "></MdArrowOutward></button>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 px-10">
        <div className="flex flex-col gap-1">
          <h1 className="opacity-70 text-sm mb-3">Navigation</h1>
          <Link className="text-3xl font-medium">Home</Link>
          <Link className="text-3xl font-medium">Browse Car</Link>
          <Link className="text-3xl font-medium">Add Car</Link>
          <Link className="text-3xl font-medium">My Listings</Link>
        </div>
        <div className="flex flex-col items-end gap-1">
          <h1 className="opacity-70 text-xl mb-3">Office</h1>
          <p className="text-3xl w-80 text-end">
            k/7 road, Rubir Mor, Noagaon, Bangladesh
            (+943-587-924)
          </p>
        </div>
      </div>
      <h1 className="text-[29vh] text-center bg-rd-500 leading-none mt-6  uppercase font-medium tracking-tight">Rent-Wheels</h1>
      <div className="h-16 w-full absolute bottom-0 text-black text-sm font-medium flex items-center justify-between bg-purple-600 px-10">
        <p className="uppercase cursor-pointer">Copyright ©️ rent-wheels 2025</p>
        <p className="uppercase cursor-pointer">Youtube</p>
        <p className="uppercase cursor-pointer">Facebook</p>
        <p className="uppercase cursor-pointer">Instagram</p>
        <p className="uppercase cursor-pointer">LinkedIn</p>
      </div>
    </div>
  );
};

export default Footer;
