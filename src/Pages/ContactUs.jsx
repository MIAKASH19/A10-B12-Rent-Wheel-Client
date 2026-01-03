import React from "react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const ContactUs = () => {
  return (
    <section className="min-h-screen dark:bg-[#0b0b0b] bg-white dark:text-white text-zinc-900 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#9fcc51] dark:bg-[#9fcc51]/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#9fcc51] dark:bg-[#9fcc51]/20 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-0 py-24">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <p className="text-[#8fc435] uppercase tracking-widest text-sm mb-4">
            Contact Rent-Wheels
          </p>
          <h1 className="text-4xl md:text-7xl font-medium leading-tight">
            Let’s talk about your <br /> next ride experience
          </h1>
          <p className="text-gray-400 mt-6 text-lg">
            Whether you need a rental, have a question, or want to partner with
            us - we’re ready to help.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Info */}
          <div className="flex flex-col gap-10">
            <div className="flex items-start gap-4">
              <Mail className="text-[#9fcc51]" />
              <div>
                <h4 className="text-lg font-medium">Email</h4>
                <p className="text-gray-400">support@rentwheels.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-[#9fcc51]" />
              <div>
                <h4 className="text-lg font-medium">Phone</h4>
                <p className="text-gray-400">+880 1830144301</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="text-[#9fcc51]" />
              <div>
                <h4 className="text-lg font-medium">Office</h4>
                <p className="text-gray-400">
                  Naogaon, Bangladesh <br /> Serving nationwide
                </p>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-gray-500 text-sm">
                We usually reply within 24 hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border dark:border-white/10 border-zinc-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                className="bg-transparent border dark:border-white/10 border-zinc-300 rounded-xl px-5 py-4 outline-none focus:border-[#9fcc51]"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border dark:border-white/10 border-zinc-300 rounded-xl px-5 py-4 outline-none focus:border-[#9fcc51]"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="mt-6 w-full bg-transparent border dark:border-white/10 border-zinc-300 rounded-xl px-5 py-4 outline-none focus:border-[#9fcc51]"
            />

            <textarea
              rows="5"
              placeholder="Your message"
              className="mt-6 w-full bg-transparent border dark:border-white/10 border-zinc-300 rounded-xl px-5 py-4 outline-none focus:border-[#9fcc51]"
            ></textarea>

            <button
              type="submit"
              className="mt-8 w-full bg-[#9fcc51] text-black font-medium py-4 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-all duration-300"
            >
              Send Message <ArrowUpRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
