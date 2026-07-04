"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BorderGlow from "./BorderGlow";
import { GraduationCap, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function LoginCard() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    collegeEmail: "",
    password: "",
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

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    try {
      // Change this endpoint if your login route is different
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      // Store JWT
      localStorage.setItem("token", data.token);

      setSuccess(true);
      setMessage("✅ Login Successful!");

      console.log("JWT Token:", data.token);
      console.log("Logged In User:", data.user);

      // Optional: clear form
      setFormData({
        collegeEmail: "",
        password: "",
      });

      // Redirect to team dashboard
      setTimeout(() => {
        router.push("/team");
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
        {/* Heading */}
        <h1 className="text-3xl font-bold text-white text-center">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Login to your IEC Esports account
        </p>

        {/* Form */}
        <div className="mt-8 space-y-5">

          {/* College Email */}
          <div className="relative">
            <GraduationCap
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              name="collegeEmail"
              placeholder="College Email"
              value={formData.collegeEmail}
              onChange={handleChange}
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
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-[#111111] py-3 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none transition focus:border-red-500"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          {/* Message */}
          {message && (
            <p
              className={`text-center text-sm ${success ? "text-green-400" : "text-red-400"
                }`}
            >
              {message}
            </p>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-700" />
            <span className="text-sm text-gray-500">OR</span>
            <div className="h-px flex-1 bg-zinc-700" />
          </div>

          {/* Google Login */}
          <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-700 bg-[#111111] py-3 font-medium text-white transition hover:border-white">
            <FcGoogle size={22} />
            Continue with Google
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-red-500 transition hover:text-red-400"
          >
            Register
          </Link>
        </p>
      </div>
    </BorderGlow>
  );
}