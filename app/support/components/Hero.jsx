"use client";

import Link from "next/link";
import { Headset, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium text-white backdrop-blur-md">
          <Headset size={18} />
          Support Available
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold leading-tight text-white md:text-7xl">
          We're Here
    
            To Help
    
        </h1>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-400 md:text-xl">
          need help? contact kasukabe
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Link
            href="#contact"
            className="rounded-xl bg-red-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.45)]"
          >
            Contact Support
          </Link>

          <Link
            href="/discord"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-red-500 hover:bg-white/10"
          >
            <MessageCircle size={20} />
            Join Discord
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-20 grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
          <div>
            <h3 className="text-3xl font-bold text-red-500">&lt;24h</h3>
            <p className="mt-2 text-gray-400">Average Response</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-red-500">7 Days</h3>
            <p className="mt-2 text-gray-400">Support Availability</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-red-500">100%</h3>
            <p className="mt-2 text-gray-400">Player Focused</p>
          </div>
        </div>
      </div>
    </section>
  );
}