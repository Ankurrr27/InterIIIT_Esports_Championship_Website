"use client";

import Link from "next/link";
import BorderGlow from "./BorderGlow";
import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function RegisterCard() {
  return (
    <BorderGlow
      edgeSensitivity={19}
      glowColor="40 80 80"
      backgroundColor="#000000"
      borderRadius={23}
      glowRadius={40}
      glowIntensity={1.2}
      coneSpread={12}
      animated={false}
      colors={["#c084fc", "#f472b6", "#38bdf8"]}
    >
      <div className="w-[420px] px-8 py-10">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-white text-center">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-400">
          ummm, iec login shiii
        </p>

        {/* Form */}
        <div className="mt-8 space-y-5">

          {/* Email */}
          <div className="relative">
            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl border border-zinc-700 bg-[#111111] py-3 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none transition focus:border-red-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-zinc-700 bg-[#111111] py-3 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none transition focus:border-red-500"
            />
          </div>

          {/* Register Button */}
          <button className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700">
            Register
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-700" />
            <span className="text-sm text-gray-500">OR</span>
            <div className="h-px flex-1 bg-zinc-700" />
          </div>

          {/* Google Button */}
          <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-700 bg-[#111111] py-3 font-medium text-white transition hover:border-white">
           <FcGoogle size={22} />
            Continue with Google
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-red-500 transition hover:text-red-400"
          >
            Sign In
          </Link>
        </p>
      </div>
    </BorderGlow>
  );
}