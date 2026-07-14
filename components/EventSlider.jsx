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
        <section className="relative bg-black flex flex-col md:block">
          {/* Changing Banner (Top half on mobile, absolute full on desktop) */}
          <div className="relative h-[45vh] w-full shrink-0 md:absolute md:inset-0 md:h-full">
            <img
              src={slides[active].image}
              alt={slides[active].title || title}
              className="h-full w-full object-cover object-[70%_center] md:object-center transition-all duration-700"
            />

            {/* Dark Overlay - fades to black at bottom for mobile, left-to-right for desktop */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent" />

            {/* Diagonal stripe overlay — esports texture */}
            {/* <div
              className="absolute inset-0 pointer-events-none "
              style={{
                background: `repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 30px,
                  rgba(255,255,255,0.3) 30px,
                  rgba(255,255,255,0.3) 31px
                )`,
              }}
            /> */}
          </div>

          {/* Content (Bottom half on mobile, overlay on desktop) */}
          <div className="relative mx-auto w-full max-w-7xl md:min-h-[calc(100vh-56px)] flex items-center px-6 pt-4 pb-16 md:py-0">
            <div className="max-w-xl z-10">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-[family-name:var(--font-display)] tracking-wide leading-[0.9] uppercase">
                {title}
                <span className="block text-3xl md:text-5xl text-white mt-1 md:mt-2">
                  {subtitle}
                </span>
              </h1>

              <p className="mt-4 md:mt-5 text-xs md:text-lg leading-relaxed text-gray-400 md:text-gray-300">
                {description}
              </p>

              <div className="mt-6 md:mt-7 flex flex-wrap gap-3 md:gap-4">
                <Link
                  href={primaryBtn.href}
                  className="rounded bg-red-600 px-5 py-2.5 md:px-6 md:py-3 text-[13px] md:text-base font-semibold hover:bg-red-500 transition text-center"
                >
                  {primaryBtn.text}
                </Link>

                <Link
                  href={secondaryBtn.href}
                  className="hidden md:inline-flex rounded border border-white/20 bg-white/10 px-6 py-3 text-base font-semibold hover:border-red-500 transition text-center"
                >
                  {secondaryBtn.text}
                </Link>
              </div>

              {/* Indicators */}
              <div className="mt-8 hidden md:flex gap-2 justify-start">
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
