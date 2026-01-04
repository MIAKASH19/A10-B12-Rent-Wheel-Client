import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";
import { Mail, User, ShieldCheck } from "lucide-react";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="relative min-h-screen px-6 py-10 bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
      {/* Glowing Orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#9fcc51]/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#A0BB70]/20 rounded-full blur-3xl -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-medium mb-10 text-zinc-900 dark:text-white">
          Profile
        </h1>

        {/* Profile Card */}
        <div className="relative bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-700 rounded-3xl shadow-2xl p-10">


          {/* Avatar */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <img
                src={user?.photoURL}
                alt="User"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#9fcc51]"
              />
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-[#9fcc51] rounded-full border-2 border-white dark:border-zinc-900"></span>
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-zinc-900 dark:text-white">
              {user?.displayName || "Anonymous User"}
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Rent-Wheels Member
            </p>
          </div>

          <div className="my-10 h-px bg-zinc-200 dark:bg-zinc-700"></div>

          <div className="grid md:grid-cols-3 gap-6">
            <InfoCard
              icon={<User />}
              label="Full Name"
              value={user?.displayName || "Not Provided"}
            />
            <InfoCard
              icon={<Mail />}
              label="Email Address"
              value={user?.email || "Not Provided"}
            />
            <InfoCard
              icon={<ShieldCheck />}
              label="Account Status"
              value={user?.emailVerified ? "Verified" : "Unverified"}
              highlight
            />
          </div>
        </div>
      </motion.div>


    </div>
  );
};

export default Profile;

/* Info Card */
const InfoCard = ({ icon, label, value, highlight }) => {
  return (
    <div className="flex flex-col gap-3 p-6 rounded-2xl bg-white/70 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 backdrop-blur-md">
      <div className="flex items-center gap-3 text-[#9fcc51]">
        {icon}
        <span className="text-sm text-zinc-500 dark:text-zinc-400">{label}</span>
      </div>
      <p
        className={`text-lg font-medium ${highlight ? "text-[#9fcc51]" : "text-zinc-900 dark:text-white"
          }`}
      >
        {value}
      </p>
    </div>
  );
};
