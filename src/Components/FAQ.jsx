import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "How do I book a car?",
        answer:
            "You can book a car by visiting the 'My Bookings' page, selecting your desired vehicle, and following the booking process.",
    },
    {
        question: "Can I cancel or modify my booking?",
        answer:
            "Yes, you can cancel or modify your bookings anytime before the rental start date from your dashboard.",
    },
    {
        question: "What payment methods are accepted?",
        answer:
            "We accept all major credit/debit cards, PayPal, and other popular online payment methods.",
    },
    {
        question: "Is my data safe?",
        answer:
            "Absolutely! We use advanced security protocols to protect your personal and payment information.",
    },
    {
        question: "Are there any hidden charges?",
        answer:
            "No. All prices are transparent, and you will see the total cost before confirming your booking.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleIndex = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="relative py-24 px-0 md:px-12 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 overflow-hidden">

            <div className="flex flex-col gap-12">
                <div className="h-20 w-full flex sm:flex-row flex-col gap-3 sm:gap-0 items-center justify-center sm:justify-between  border-b-2 border-b-zinc-200">
                    <h3 className="sm:text-4xl text-3xl font-momo opacity-60 text-center">
                        05
                    </h3>
                    <h2 className="sm:text-4xl text-2xl">Frequently Asked Question</h2>
                    <span></span>
                </div>

                <div className="flex flex-col gap-5">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-3xl border border-zinc-300 dark:border-white/10  shadow-sm dark:shadow-lg overflow-hidden"
                        >
                            <button
                                onClick={() => toggleIndex(index)}
                                className="w-full flex items-center justify-between px-6 py-5 cursor-pointer focus:outline-none"
                            >
                                <span className=" text-zinc-900  dark:text-[#9fcc51] font-medium text-lg">
                                    {faq.question}
                                </span>
                                <motion.span
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-[#9fcc51]"
                                >
                                    <ChevronDown size={24} />
                                </motion.span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="px-6 pb-5 dark:text-zinc-300  text-[#9fcc51] text-sm leading-relaxed"
                                    >
                                        {faq.answer}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
