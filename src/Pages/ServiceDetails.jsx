import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  LuCar,
  LuCalendar,
  LuCrown,
  LuKey,
  LuPlane,
  LuMap,
} from "react-icons/lu";
import { PiArrowUpRightBold } from "react-icons/pi";

const iconMap = {
  LuCar: LuCar,
  LuCalendar: LuCalendar,
  LuCrown: LuCrown,
  LuKey: LuKey,
  LuPlane: LuPlane,
  LuMap: LuMap,
};

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    fetch("/normal-service.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedService = data.find((srv) => srv.id === id);
        setService(selectedService);
      });

    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }

  const IconComponent = iconMap[service.icon];

  return (
    <div className="w-full min-h-screen flex flex-col pb-10">
      {/* HERO SECTION */}
      <div
        className="w-full h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${service.mainImage})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-medium text-center flex items-center gap-4">
            {IconComponent && (
              <IconComponent className="text-[#9fcc51]" size={52} />
            )}
            {service.title}
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-6 md:px-10 py-12 flex flex-col gap-10">
        <div className="md:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 flex items-center gap-3">
            {IconComponent && (
              <IconComponent className="text-[#9fcc51]" size={32} />
            )}
            {service.title}
          </h2>

          <p className="text-gray-700 text-md">
            {service.description}
          </p>

          {/* PRICE */}
          <p className="text-lg font-semibold text-gray-900">
            Starting from{" "}
            <span className="text-[#9fcc51]">
              ৳{service.startingPrice}
            </span>{" "}
            / {service.priceType}
          </p>

          {/* FEATURES */}
          <div className="flex flex-wrap gap-3 mt-4">
            {service.features.map((feat, i) => (
              <span
                key={i}
                className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium text-sm shadow"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* GALLERY */}
        <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4">
          {service.galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="h-64 w-full rounded-2xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-[1.02]"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* BACK BUTTON */}
      <div className="flex justify-center">
        <Link
          to="/services"
          className="bg-[#9fcc51] px-6 py-3 rounded-full text-white flex items-center gap-2 transition-all duration-300 hover:bg-black"
        >
          Back to Services
          <PiArrowUpRightBold />
        </Link>
      </div>
    </div>
  );
};

export default ServiceDetails;
