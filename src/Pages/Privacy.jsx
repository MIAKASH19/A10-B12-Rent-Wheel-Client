import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Cookie,
  RefreshCcw,
  UserCheck,
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="relative bg-white dark:bg-zinc-900 text-black dark:text-white overflow-hidden">

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#9fcc51] dark:bg-[#9fcc51]/30 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-[#9fcc51] dark:bg-[#9fcc51]/30 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#9fcc51] dark:bg-[#9fcc51]/30 rounded-full blur-[160px]" />
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="text-[9vw] leading-none font-medium tracking-tight"
        >
          Your Data
          <span className="text-[#9fcc51]"> Our Safety.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10 max-w-2xl text-lg text-neutral-700 dark:text-neutral-400"
        >
          At Rent-Wheels, your personal information is handled with clarity,
          responsibility, and respect never as a commodity.
        </motion.p>
      </section>

      {/* INTRO */}
      <section className="relative px-6 md:px-10 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-4xl md:text-5xl font-medium mb-8">
            Our privacy philosophy
          </h2>
          <p className="text-xl text-neutral-700 dark:text-neutral-400 leading-relaxed max-w-4xl">
            This Privacy Policy explains how Rent-Wheels collects, uses,
            stores, and protects your data when you browse, book, or interact
            with our platform. Transparency builds trust — and trust builds
            great experiences.
          </p>
        </motion.div>
      </section>

      {/* DETAILS GRID */}
      <section className="relative px-6 md:px-10 py-32">
        <div className="grid md:grid-cols-2 gap-16 max-w-7xl mx-auto">

          {[
            {
              icon: Database,
              title: "Information We Collect",
              desc:
                "We collect essential information such as your name, contact details, booking preferences, payment references, and communication history. No unnecessary data.",
            },
            {
              icon: Eye,
              title: "How Your Information Is Used",
              desc:
                "Your data allows us to process bookings, improve services, communicate updates, and deliver a seamless rental experience.",
            },
            {
              icon: Lock,
              title: "Security & Protection",
              desc:
                "Industry-standard security practices protect your data from unauthorized access, loss, or misuse.",
            },
            {
              icon: UserCheck,
              title: "Your Rights",
              desc:
                "You may access, correct, or request deletion of your data anytime. Control always stays with you.",
            },
            {
              icon: Cookie,
              title: "Cookies & Analytics",
              desc:
                "We use cookies strictly for performance, analytics, and functionality — never invasive tracking.",
            },
            {
              icon: RefreshCcw,
              title: "Policy Updates",
              desc:
                "This policy may evolve as our services grow. Updates will always remain transparent and user-first.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="relative backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 border border-neutral-300 dark:border-neutral-700 rounded-3xl p-10 hover:border-[#9fcc51] transition-all"
            >
              <item.icon size={44} className="text-[#9fcc51] mb-6" />
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="text-neutral-700 dark:text-neutral-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRUST STATEMENT */}
      <section className="relative px-6 md:px-10 py-40 bg-neutral-950 text-neutral-200">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-medium max-w-5xl"
        >
          Privacy isn’t just policy.
          <span className="block text-[#9fcc51] mt-4">
            It’s a promise.
          </span>
        </motion.h2>
      </section>

      {/* FOOTER NOTE */}
      <section className="relative px-6 md:px-10 py-32 text-center max-w-4xl mx-auto">
        <p className="text-neutral-700 dark:text-neutral-400 text-lg leading-relaxed">
          By using Rent-Wheels, you agree to this Privacy Policy.
          We stay transparent, accountable, and user-focused — always.
        </p>
      </section>

    </div>
  );
}
