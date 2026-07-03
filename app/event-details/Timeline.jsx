"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    date: "10 July 2026",
    title: "Registration Opens",
    description: "Team registrations begin for all esports titles.",
  },
  {
    date: "20 July 2026",
    title: "Registration Closes",
    description: "Last day to register your team before the deadline.",
  },
  {
    date: "25 July 2026",
    title: "Qualifiers",
    description: "Battle through the qualifiers to secure your place.",
  },
  {
    date: "27 July 2026",
    title: "Semi Finals",
    description: "Top teams compete for a spot in the Grand Finals.",
  },
  {
    date: "30 July 2026",
    title: "Grand Finals",
    description: "The ultimate showdown to crown the champions.",
  },
];

export default function Timeline() {
  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-extrabold uppercase tracking-wider">
            Event Timeline
          </h2>

          <div className="w-28 h-1 bg-orange-500 rounded-full mx-auto mt-5"></div>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Follow the tournament journey from registrations to the Grand
            Finals.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-zinc-700 hidden md:block"></div>

          <div className="space-y-20">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0
                    ? "md:justify-start"
                    : "md:justify-end"
                } justify-center`}
              >
                {/* Card */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -120 : 120,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                  }}
                  className="w-full md:w-[45%] bg-zinc-900 border border-zinc-800 rounded-2xl p-7 transition-all duration-300 hover:border-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.25)]"
                >
                  <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest">
                    {item.date}
                  </p>

                  <h3 className="text-2xl font-bold mt-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mt-4 leading-7">
                    {item.description}
                  </p>
                </motion.div>

                {/* Timeline Dot */}
                <motion.div
                  initial={{
                    scale: 0,
                    opacity: 0,
                  }}
                  whileInView={{
                    scale: 1,
                    opacity: 1,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.25,
                    duration: 0.4,
                    type: "spring",
                  }}
                  className="hidden md:flex absolute left-1/2 -translate-x-1/2
                  w-6 h-6 rounded-full
                  bg-orange-500
                  border-4 border-black
                  shadow-[0_0_20px_rgba(249,115,22,0.9)]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}