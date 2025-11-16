import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-4 font-inter">
      <div className="w-[300px] md:w-[300px]">
        <DotLottieReact
          src="/404 error GLiTch 2.lottie"
          autoplay
          loop
          className="w-full"
        ></DotLottieReact>
      </div>

      <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mt-4">
        Oops! Page Not Found
      </h1>

      {/* Back Home Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-[#A0BB70] rounded-full text-sm text-white hover:bg-black transition-all duration-300 px-4 py-2 mt-5"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
