"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BorderGlow from "./BorderGlow";
import { Mail, Lock, User, GraduationCap, Gamepad2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function RegisterCard() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collegeEmail: "",
    password: "",
    game: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/register", {
        // Change this if your route is different
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess(true);
      setMessage("✅ Registration Successful!");

      console.log("Registered User:", data);

      setFormData({
        name: "",
        email: "",
        collegeEmail: "",
        password: "",
        game: "",
      });

      // Redirect to login after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      setSuccess(false);
      setMessage(err.message);
    }

    setLoading(false);
  };

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
        <h1 className="text-3xl font-bold text-white text-center">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Register to IEC Esports
        </p>

        <div className="mt-8 space-y-5">
          {/* Name */}
          <div className="relative">
            <User
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-[#111111] py-3 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none focus:border-red-500"
            />
          </div>

          {/* Personal Email */}
          <div className="relative">
            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              name="email"
              type="email"
              placeholder="Personal Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-[#111111] py-3 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none focus:border-red-500"
            />
          </div>

          {/* College Email */}
          <div className="relative">
            <GraduationCap
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              name="collegeEmail"
              type="email"
              placeholder="College Email"
              value={formData.collegeEmail}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-[#111111] py-3 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none focus:border-red-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              name="password"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-[#111111] py-3 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none focus:border-red-500"
            />
          </div>

          {/* Game */}
          <div className="relative">
            <Gamepad2
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              name="game"
              value={formData.game}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-[#111111] py-3 pl-12 pr-4 text-white outline-none focus:border-red-500"
            >
              <option value="">Select Game</option>
              <option value="BGMI">BGMI</option>
              <option value="Valorant">Valorant</option>
              <option value="Free Fire">Free Fire</option>
            </select>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {message && (
            <p
              className={`text-center text-sm ${success ? "text-green-400" : "text-red-400"
                }`}
            >
              {message}
            </p>
          )}

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-700" />
            <span className="text-sm text-gray-500">OR</span>
            <div className="h-px flex-1 bg-zinc-700" />
          </div>

          <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-700 bg-[#111111] py-3 font-medium text-white transition hover:border-white">
            <FcGoogle size={22} />
            Continue with Google
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-red-500 hover:text-red-400"
          >
            Sign In
          </Link>
        </p>
      </div>
    </BorderGlow>
  );
}