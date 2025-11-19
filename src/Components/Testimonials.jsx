import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

export const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Business Traveler",
    review:
      "The booking process was incredibly smooth. The car was spotless, comfortable, and delivered right on time. Highly recommended!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    name: "James Carter",
    role: "Tourist",
    review:
      "Super friendly service and reasonable pricing. The SUV made our trip so enjoyable! Will definitely rent again.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Event Manager",
    review:
      "Amazing experience! The luxury sedan was perfect for our event. Smooth ride and professional communication.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const Testimonial = () => {
  return (
    <div className="w-full px-10 py-20 ">
      <div className="h-20 w-full flex items-center justify-between  border-b-2 border-b-zinc-200">
        <h3 className="text-4xl font-momo opacity-60">04</h3>
        <h2 className="text-4xl">What Our Custormers Say</h2>
        <span className="text-4xl"></span>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-10">
        {testimonials.map((item) => (
          <div data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out" className="flex gap-2 w-full h-[30vh]">
            <div className="bg-zinc-100 w-[35%] flex flex-col items-center justify-center h-full rounded-lg p-5">
              <div className="w-15 h-20 bg-red-500 rounded-full overflow-hidden">
                <img
                  src={item.image}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <p className="font-medium my-2">{item.name}</p>
              <p className="font-semibold text-xs">{item.role}</p>
            </div>
            <div className="bg-zinc-100 w-[65%] h-full flex items-center justify-center p-5 rounded-lg">
              <p className="text-2xl font-medium opacity-80 tracking-tight">
                "{item.review}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
