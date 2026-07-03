"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    image: "/11.png",
    title: "Free Fire Championship",
    subtitle: "Fast-paced survival action for college teams.",
    label: "Register your squad now",
  },
  {
    image: "/33.png",
    title: "Valorant Tactical Showdown",
    subtitle: "Teamwork, strategy, and precision in every match.",
    label: "Secure your slot today",
  },
  {
    image: "/23.png",
    title: "BGMI Championship",
    subtitle: "Battle with the best squads from IIITs across India.",
    label: "Compete for glory",
  },
];

export default function EventSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-slate-950 text-white">
      {/* Banner */}
      <div className="relative overflow-hidden">
        <section className="relative bg-slate-950 overflow-hidden">
          {/* Changing Banner */}
          <img
            src={slides[active].image}
            alt={slides[active].title}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-100/10 to-transparent" />

          {/* Content */}
          <div className="relative mx-auto max-w-7xl min-h-[650px] flex items-center px-6">
            <div className="max-w-xl">
              {/* <p className="uppercase tracking-[0.35em] text-white text-sm mb-4">
                INTER IIIT ESPORTS CHAMPIONSHIP
              </p> */}

              <h1 className="text-4xl md:text-5xl font-black leading-tight">
                India's Biggest
                <span className="block text-3xl md:text-4xl  text-white">
                  Inter-IIIT Esports League
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-300">
                Compete with the finest gamers from IIITs across India in BGMI,
                Valorant and Free Fire. Experience professional production,
                exciting prize pools and national recognition.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="rounded bg-red-600 px-6 py-3 font-semibold hover:bg-red-500"
                >
                  Register Now
                </Link>

                <Link
                  href="/event-details"
                  className="rounded border border-white/20 bg-white/10 px-6 py-3 font-semibold hover:border-red-500"
                >
                  Event Details
                </Link>
              </div>

              {/* Indicators */}
              <div className="mt-10 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActive(index)}
                    className={`h-2 rounded-full transition-all ${
                      active === index ? "w-2 bg-white" : "w-2 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-200/10 to-transparent" />
      </div>

     
    </section>
  );
}
