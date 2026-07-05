"use client";

import Link from "next/link";
import { Headset, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      
      <div className="relative z-10 mx-auto max-w-4xl text-center w-full">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-sm font-medium text-red-400 backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <Headset size={18} />
          Support Available 24/7
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold leading-tight md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 drop-shadow-sm">
          We're Here
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-red-600">
            To Help
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl font-medium">
          Whether you need help with registration, have a question about the tournament, or just want to say hi, our team is ready to assist you.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row w-full sm:w-auto">
          <Link
            href="#contact"
            className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-red-500/40 text-center"
          >
            Contact Support
          </Link>

          <Link
            href="/discord"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] text-center"
          >
            <MessageCircle size={20} />
            Join Discord
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8 w-full max-w-3xl mx-auto">
          <div className="rounded-3xl border border-white/5 bg-black/40 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/10">
            <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-red-600">&lt;24h</h3>
            <p className="mt-2 text-sm font-medium text-gray-400 uppercase tracking-wider">Average Response</p>
          </div>

          <div className="rounded-3xl border border-white/5 bg-black/40 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/10">
            <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-red-600">7 Days</h3>
            <p className="mt-2 text-sm font-medium text-gray-400 uppercase tracking-wider">Support Availability</p>
          </div>

          <div className="rounded-3xl border border-white/5 bg-black/40 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/10">
            <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-red-600">100%</h3>
            <p className="mt-2 text-sm font-medium text-gray-400 uppercase tracking-wider">Player Focused</p>
          </div>
        </div>
      </div>
    </section>
  );
}