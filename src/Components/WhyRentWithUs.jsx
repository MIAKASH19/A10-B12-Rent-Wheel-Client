import {
  HiOutlineBolt,
  HiOutlineShieldCheck,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
} from "react-icons/hi2";

const whyRentData = [
  {
    id: 1,
    icon: <HiOutlineBolt className="text-4xl text-zinc-700" />,
    title: "Fast & Easy Booking",
    image: "https://images.unsplash.com/photo-1724282181494-7f102a9d6950?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
    category: "Service",
  },
  {
    id: 2,
    icon: <HiOutlineCurrencyDollar className="text-4xl text-zinc-700" />,
    title: "Best Price Guarantee",
    image: "https://images.unsplash.com/photo-1761014586555-947a9555d302?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Financial",
  },
  {
    id: 3,
    icon: <HiOutlineShieldCheck className="text-4xl text-zinc-700" />,
    title: "Fully Insured Vehicles",
    image: "https://images.unsplash.com/photo-1596564239685-09d2e88e1bb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8",
    category: "Long lasting",
  },
  {
    id: 4,
    icon: <HiOutlineClock className="text-4xl text-zinc-700" />,
    title: "24/7 Support",
    image: "https://plus.unsplash.com/premium_photo-1741769013280-840d9fabdaa5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8",
    category: "Guard",
  },
];





const WhyRentWithUs = () => {
  return (
    <div className=" w-full h-fit px-10 py-20 text-zinc-750">
      <div className="h-20 w-full flex items-center justify-between  border-b-2 border-b-zinc-200">
        <h3 className="text-4xl font-momo opacity-60">03</h3>
        <h2 className="text-4xl">Why Rent With Us</h2>
        <span className="text-4xl"></span>
      </div>
      <div className="grid md:grid-cols-4 gap-8 mt-10">
        {whyRentData.map((item, index) => (
          <div
            key={item.id}
            className="h-100  flex flex-col justify-between gap-3 "
          >
            <div className="bg-red-500 relative w-full h-[80%] rounded-2xl overflow-hidden">
                <div className="w-14 h-14 bg-black text-white flex items-center justify-center rounded-full absolute top-3 left-3">0{index + 1}</div>
                <img src={item.image} className="w-full h-full object-center" />
            </div>
            <div className="h-[20%] ">
                <p className="flex gap-2 font-medium text-zinc-700 items-center"> <div className="w-3 h-3 rounded-full bg-black"></div>{item.category}</p>
                <h1 className="font-semibold text-lg tracking-tight">{item.title}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyRentWithUs;
