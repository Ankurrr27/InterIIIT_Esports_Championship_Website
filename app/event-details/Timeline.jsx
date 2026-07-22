"use client";

import { motion } from "framer-motion";
import { FileEdit, Lock, Swords, Trophy, Crown } from "lucide-react";

const timeline = [
  {
    date: "10 August 2026",
    title: "Registration Opens",
    description: "Team registrations begin for all esports titles.",
    status: "active",
    icon: <FileEdit size={18} />,
  },
  {
    date: "20 August 2026",
    title: "Registration Closes",
    description: "Last day to register your team before the deadline.",
    status: "upcoming",
    icon: <Lock size={18} />,
  },
  {
    date: "25 July 2026",
    title: "Qualifiers",
    description: "Battle through the qualifiers to secure your place.",
    status: "upcoming",
    icon: <Swords size={18} />,
  },
  {
    date: "27 July 2026",
    title: "Semi Finals",
    description: "Top teams compete for a spot in the Grand Finals.",
    status: "upcoming",
    icon: <Trophy size={18} />,
  },
  {
    date: "30 July 2026",
    title: "Grand Finals",
    description: "The ultimate showdown to crown the champions.",
    status: "upcoming",
    icon: <Crown size={18} />,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Timeline() {
  return (
    <section id="timeline" className="relative overflow-hidden bg-slate-50 py-12 sm:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-red-600">
            Format Overview
          </p>
          <h2 className="mt-2 sm:mt-4 text-3xl font-[family-name:var(--font-display)] tracking-wide sm:text-5xl lg:text-6xl text-slate-900">
            Tournament Structure
          </h2>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-slate-500">
            The path to glory. Follow the timeline from registration to the Grand Finals to ensure your squad is ready for battle.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="mt-20 hidden md:block">
          <div className="relative">

            {/* Progress Track */}
            <div className="absolute top-[38px] left-0 right-0 h-[2px] bg-slate-200" />
            {/* Active progress */}
            <div className="absolute top-[38px] left-0 h-[2px] bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)]" style={{ width: "10%" }} />

            <div className="grid grid-cols-5 gap-6">
              {timeline.map((item, index) => {
                const isActive = item.status === "active";
                const isPast = false;
                return (
                  <motion.article
                    key={item.title}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeUp}
                    className="relative group"
                  >
                    {/* Node */}
                    <div className="flex justify-center mb-8">
                      <div className={`relative h-5 w-5 rounded-full transition-all duration-500 ${
                        isActive
                          ? "bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4),0_0_30px_rgba(220,38,38,0.2)]"
                          : isPast
                            ? "bg-red-600/60"
                            : "bg-slate-300 group-hover:bg-slate-400"
                      }`}>
                        {isActive && (
                          <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30" />
                        )}
                        <span className={`absolute inset-[5px] rounded-full ${
                          isActive ? "bg-white" : "bg-white"
                        }`} />
                      </div>
                    </div>

                    {/* Card */}
                    <div className={`relative rounded-xl p-6 transition-all duration-300 border h-full flex flex-col ${
                      isActive
                        ? "bg-white border-red-200 shadow-xl shadow-red-500/5 ring-1 ring-red-100"
                        : "bg-white border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md"
                    }`}>
                      {/* Phase label */}
                      <div className="flex items-center justify-between gap-2 mb-5">
                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                          isActive ? "text-red-500" : "text-slate-400"
                        }`}>
                          Phase {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          isActive ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-400"
                        }`}>
                          {item.icon}
                        </div>
                      </div>

                      {/* Date */}
                      <p className={`text-[11px] font-semibold uppercase tracking-widest mb-3 ${
                        isActive ? "text-red-500" : "text-slate-500"
                      }`}>
                        {item.date}
                      </p>

                      {/* Title */}
                      <h3 className={`text-lg font-bold tracking-tight mb-2 ${
                        isActive ? "text-slate-900" : "text-slate-800 group-hover:text-slate-900"
                      }`}>
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-slate-500 flex-1">
                        {item.description}
                      </p>

                      {/* Status indicator */}
                      {isActive && (
                        <div className="mt-4 pt-4 border-t border-red-100">
                          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-red-500">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                            </span>
                            Live Now
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="mt-10 block md:hidden">
          <div className="relative pl-10">

            {/* Vertical Track */}
            <div className="absolute left-[14px] top-0 bottom-0 w-[2px] bg-slate-200" />
            <div className="absolute left-[14px] top-0 h-20 w-[2px] bg-red-500 shadow-[0_0_12px_rgba(220,38,38,0.3)]" />

            <div className="space-y-4">
              {timeline.map((item, index) => {
                const isActive = item.status === "active";
                return (
                  <motion.article
                    key={item.title}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-30px" }}
                    variants={fadeUp}
                    className="relative"
                  >
                    {/* Node */}
                    <div className={`absolute -left-10 top-6 h-[14px] w-[14px] rounded-full transition-all ${
                      isActive
                        ? "bg-red-500 shadow-[0_0_12px_rgba(220,38,38,0.4)]"
                        : "bg-slate-300 border border-slate-200"
                    }`}>
                      {isActive && (
                        <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30" />
                      )}
                    </div>

                    {/* Card */}
                    <div className={`rounded-xl p-4 sm:p-5 border transition-all duration-300 ${
                      isActive
                        ? "bg-white border-red-200 shadow-lg shadow-red-500/5 ring-1 ring-red-100"
                        : "bg-white border-slate-200 shadow-sm"
                    }`}>
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                          isActive ? "text-red-500" : "text-slate-400"
                        }`}>
                          Phase {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          isActive ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-400"
                        }`}>
                          {item.icon}
                        </div>
                      </div>

                      <p className={`text-[11px] font-semibold uppercase tracking-widest mb-2 ${
                        isActive ? "text-red-500" : "text-slate-500"
                      }`}>
                        {item.date}
                      </p>

                      <h3 className={`text-base sm:text-lg font-bold tracking-tight mb-1 sm:mb-1.5 ${
                        isActive ? "text-slate-900" : "text-slate-800"
                      }`}>
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                        {item.description}
                      </p>

                      {isActive && (
                        <div className="mt-3 pt-3 border-t border-red-100">
                          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-red-500">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                            </span>
                            Live Now
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
