import React, { useEffect, useState } from 'react'
import { IoArrowDownSharp } from 'react-icons/io5'
import { PiArrowUpRightBold } from 'react-icons/pi'
import useAxios from '../hooks/useAxios'
import { Link } from 'react-router'

const Services = () => {
  const [services, setServices] = useState([])

  const axiosSecure = useAxios()

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("./normal-service.json").then(res => res.json()).then(data => {
      console.log(data);
      setServices(data);
    });
  }, []);

  return (
    <div className='min-h-screen bg-white dark:bg-zinc-900 text-balck dark:text-white w-full flex flex-col py-20 px-10'>
      <div className='h-[40vh] flex items-center justify-between bg-re-500'>
        <div>
          <h1 className='text-[#9fcc51] text-5xl mb-3'>Our Services</h1>
          <p className='w-[60%]'>Seamless car rental services designed for comfort, flexibility, and trust , from quick bookings to smooth returns, we keep every mile effortless.</p>
        </div>
        <div className='bg-zinc-800 w-fit flex items-center gap-1 rounded-full px-4 py-2 cursor-pointer text-white'>
          Explore Services
          <IoArrowDownSharp fontSize={20} />
        </div>
      </div>
      <div className=' gap-y-5 justify-between'>
        {services.map((service, index) => (
          <div

            key={index}
            className="group flex flex-col md:flex-row w-full rounded-xl overflow-hidden shadow-md border border-zinc-300 mb-8 transition-transform duration-500 p-6"
          >
            {/* Image Section */}
            <div
              className="md:w-68 h-34 rounded-xl bg-cover bg-center"
              style={{ backgroundImage: `url(${service.mainImage})` }}
            ></div>

            {/* Details Section */}
            <div className="w-full  px-5 flex flex-col justify-between ">
              <h2 className="text-3xl  text-gray-900 dark:text-zinc-300">{service.title}</h2>
              <p className="text-gray-600 dark:text-zinc-400">{service.shortDescription}</p>
              <Link to={`/services/${service.id}`} className="text-white border dark:border-none bg-[#9fcc51] hover:bg-white hover:border-[#9fcc51] hover:text-[#9fcc51] w-fit px-5 py-2 rounded-full flex items-center gap-3 font-medium transition-all duration-300 cursor-pointer">
                Service Details
                <PiArrowUpRightBold />
              </Link>
            </div>
          </div>
        ))}


      </div>

    </div>
  )
}

export default Services