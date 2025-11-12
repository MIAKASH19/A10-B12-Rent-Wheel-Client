import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Context/AuthContext";

const CarsDetails = () => {
  const {user} = useContext(AuthContext)
  const { id } = useParams();
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get(`/cars/${id}`).then((res) => console.log(res.data));
  }, []);

  return (
    <div className="w-full min-h-screen flex gap-5 px-10 mt-10">
      <div className="w-3/5 bg-green-500 h-120 rounded-2xl">sfjlsdj</div>
      <div className="bg-red-500 h-120 w-2/5 rounded-2xl">
        <h1></h1>
      </div>
    </div>
  );
};

export default CarsDetails;
