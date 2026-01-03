import { motion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck, Car, MapPin, Users } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="dark:bg-zinc-900 bg-white dark:text-white text-black overflow-hidden">

      {/* HERO */}
      <section
        className="min-h-screen flex items-center justify-center px-6 relative bg-cover bg-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1704476944918-c1258561ebb9?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        }}
      >

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-[8vw] text-white leading-none text-center"
        >
          We don’t
          <span className=" text-[#9fcc51]"> rent cars</span>
          <span className="block">We enable movement.</span>
        </motion.h1>
      </section>

      {/* STORY */}
      <section className="grid md:grid-cols-2 gap-16 px-10 py-32">
        <motion.div initial={{ x: -80, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-6xl font-medium mb-6">Our Story</h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
            Rent‑Wheels was born from a simple frustration — car rentals felt slow, outdated, and untrustworthy.
            We reimagined the experience from the ground up, blending technology, transparency, and design.
            Today, we power thousands of journeys with clarity and confidence.
          </p>
        </motion.div>

        <motion.div initial={{ x: 80, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
          <p className="text-neutral-600 dark:text-neutral-400 text-xl leading-relaxed">
            From airport pickups to long‑term leasing, every touchpoint is crafted to feel premium, intuitive,
            and human. We don’t just move people — we empower lifestyles.
          </p>
        </motion.div>
      </section>

      {/* VALUES */}
      <section className="px-10 py-32">
        <h2 className="text-6xl font-medium mb-20">What Drives Us</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[{
            icon: ShieldCheck,
            title: "Trust by Design",
            desc: "Every vehicle, price, and policy is transparent — no hidden surprises."
          }, {
            icon: Car,
            title: "Obsessed With Quality",
            desc: "From economy to luxury, our fleet meets the highest standards."
          }, {
            icon: Users,
            title: "Human First",
            desc: "Technology accelerates us, but people define us."
          }].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -12 }}
              className="border border-neutral-400  p-10 rounded-2xl"
            >
              <item.icon size={48} className="mb-6 text-[#9fcc51]" />
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* IMPACT */}
      <section className="px-10 py-40 text-neutral-200  bg-neutral-950">
        <div className="grid md:grid-cols-3 gap-20 text-center">
          <div>
            <h3 className="text-6xl font-bold text-[#9fcc51]">10K+</h3>
            <p className="mt-2">Successful Rentals</p>
          </div>
          <div>
            <h3 className="text-6xl font-bold text-[#9fcc51]">25+</h3>
            <p className=" mt-2">Cities Covered</p>
          </div>
          <div>
            <h3 className="text-6xl font-bold text-[#9fcc51]">98%</h3>
            <p className=" mt-2">Customer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="px-10 py-32 grid md:grid-cols-2 gap-16">
        <h2 className="text-7xl font-medium uppercase leading-tighter">
          Mobility is not about cars.
          <span className="block text-[#9fcc51]">It’s about freedom.</span>
        </h2>
        <p className="dark:text-neutral-400 text-neutral-600 text-lg leading-relaxed">
          Whether it’s a business trip, family vacation, or spontaneous escape -
          Rent‑Wheels adapts to your life. Seamless booking, flexible options,
          and cars that elevate your journey.
        </p>
      </section>

      <section className="px-10 py-40 text-center">
        <motion.a
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-4 px-4 py-2 text-lg rounded-full border font-medium border-b border-[#9fcc51] hover:text-white hover:bg-[#9fcc51] text-[#9fcc51] pb-2"
          href="#"
        >
          Start Your Journey <ArrowRight />
        </motion.a>
      </section>

    </div>
  );
}
