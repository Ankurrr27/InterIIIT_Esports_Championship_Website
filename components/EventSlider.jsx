"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function EventSlider({
  slides = [],
  title = "India's Biggest",
  subtitle = "Inter-IIIT Esports League",
  description = "",
  primaryBtn = {
    text: "Register Now",
    href: "/register",
  },
  secondaryBtn = {
    text: "Event Details",
    href: "/event-details",
  },
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Banner */}
      <div className="relative overflow-hidden">
        <section className="relative bg-black overflow-hidden">
          {/* Changing Banner */}
          <img
            src={slides[active].image}
            alt={slides[active].title || title}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

          {/* Diagonal stripe overlay — esports texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              background: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 30px,
                rgba(255,255,255,0.3) 30px,
                rgba(255,255,255,0.3) 31px
              )`,
            }}
          />

          {/* Content */}
          <div className="relative mx-auto max-w-7xl min-h-[calc(100vh-56px)] flex items-center px-6">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-black leading-tight">
                {title}
                <span className="block text-3xl md:text-4xl text-white">
                  {subtitle}
                </span>
              </h1>

              <p className="mt-5 text-lg text-gray-300">
                {description}
              </p>

              <div className="mt-7 flex flex-wrap gap-4">
                <Link
                  href={primaryBtn.href}
                  className="rounded bg-red-600 px-6 py-3 font-semibold hover:bg-red-500 transition"
                >
                  {primaryBtn.text}
                </Link>

                <Link
                  href={secondaryBtn.href}
                  className="rounded border border-white/20 bg-white/10 px-6 py-3 font-semibold hover:border-red-500 transition"
                >
                  {secondaryBtn.text}
                </Link>
              </div>

              {/* Indicators */}
              <div className="mt-8 flex gap-2">
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

        <div className="absolute inset-0  pointer-events-none" />
      </div>

      {/* Diagonal bottom edge — aggressive esports cut */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[50px] bg-black pointer-events-none z-10"
        style={{
          clipPath: "polygon(0 100%, 100% 40%, 100% 100%)",
        }}
      />
    </section>
  );
}