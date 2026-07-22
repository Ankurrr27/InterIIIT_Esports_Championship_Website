"use client";

import Link from "next/link";
import { Headset, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      
      <div className="relative z-10 mx-auto max-w-4xl text-center w-full">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-slate-50 px-5 py-2 text-sm font-medium text-slate-600 shadow-sm">
          <Headset size={18} className="text-slate-900" />
          Support Available 24/7
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-[family-name:var(--font-display)] tracking-wide text-slate-900 leading-[1.1]">
          We're Here
          <br />
          <span className="text-red-600">
            To Help.
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl font-medium">
          Whether you need help with registration, have a question about the tournament, or just want to say hi, our team is ready to assist you.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto">
          <Link
            href="#contact"
            className="w-full sm:w-auto rounded-none bg-slate-900 px-5 py-3 sm:px-6 sm:py-3 text-[11px] sm:text-[13px] font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-red-600 text-center"
          >
            Contact Support
          </Link>

          <Link
            href="/discord"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-none border border-slate-200 bg-white px-5 py-3 sm:px-6 sm:py-3 text-[11px] sm:text-[13px] font-semibold uppercase tracking-widest text-slate-900 transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 text-center"
          >
            <MessageCircle size={18} />
            Join Discord
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8 w-full max-w-3xl mx-auto">
          <div className="border-t border-black/10 pt-6 transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-3xl font-[family-name:var(--font-display)] text-slate-900">&lt;24h</h3>
            <p className="mt-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">Average Response</p>
          </div>

          <div className="border-t border-black/10 pt-6 transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-3xl font-[family-name:var(--font-display)] text-slate-900">7 Days</h3>
            <p className="mt-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">Support Availability</p>
          </div>

          <div className="border-t border-black/10 pt-6 transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-3xl font-[family-name:var(--font-display)] text-slate-900">100%</h3>
            <p className="mt-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">Player Focused</p>
          </div>
        </div>
      </div>
    </section>
  );
}