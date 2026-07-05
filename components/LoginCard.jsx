"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Gamepad2, GraduationCap, Lock, Mail, ShieldCheck, Trophy, Users } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const cardShell = "z-10 my-2 flex w-full max-w-[430px] justify-center px-4 sm:px-0 lg:my-0";
const cardPanel = "flex h-[590px] max-h-[calc(100svh-7rem)] min-h-[520px] w-full flex-col overflow-y-auto rounded-lg border border-white/10 bg-black/55 px-5 py-5 shadow-2xl backdrop-blur-xl sm:px-6 sm:py-6";
const inputClass = "w-full rounded-lg border border-white/10 bg-transparent py-2.5 pl-10 pr-10 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-red-500 focus:bg-white/5";

const perks = [
  { icon: Trophy, label: "Prize pool", value: "Rs 50K+" },
  { icon: Users, label: "Teams", value: "IIIT squads" },
  { icon: ShieldCheck, label: "Access", value: "College verified" },
];

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

      localStorage.setItem("token", data.token);
      setSuccess(true);
      setMessage("Login successful!");

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
    <div className={cardShell}>
      <div className={cardPanel}>        <div className="mb-4 flex w-full border-b border-white/20">
          <Link href="/login" className="flex-1 border-b-2 border-red-600 py-2 text-center text-xs font-medium uppercase tracking-widest text-red-500 sm:text-sm">
            LOGIN
          </Link>
          <Link href="/register" className="flex-1 py-2 text-center text-xs font-medium uppercase tracking-widest text-gray-400 sm:text-sm">
            SIGN UP
          </Link>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="space-y-3">
            <div className="relative group">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <input
                type="email"
                name="collegeEmail"
                placeholder="College Email"
                value={formData.collegeEmail}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="relative group">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={inputClass}
              />
              <Gamepad2 size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>

            <div className="grid gap-2.5">
              {perks.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="flex min-h-10 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm">
                    <Icon size={17} className="text-red-500" />
                    <span className="text-gray-400">{item.label}</span>
                    <span className="ml-auto font-medium text-white">{item.value}</span>
                  </div>
                );
              })}
            </div>

            <div className="min-h-10">
              {message && (
                <div
                  className={`rounded-md p-2.5 text-center text-sm font-medium backdrop-blur-sm ${
                    success
                      ? "border border-green-500/20 bg-green-500/10 text-green-400"
                      : "border border-red-500/20 bg-red-500/10 text-red-400"
                  }`}
                >
                  {message}
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto space-y-3">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="relative flex w-full items-center justify-center gap-2 rounded-lg bg-[#cc0000] py-2.5 text-sm font-semibold text-white shadow-lg disabled:pointer-events-none disabled:opacity-60"
            >
              {loading ? "LOGGING IN..." : "LOGIN"}
              {!loading && <ArrowRight size={18} className="absolute right-4" />}
            </button>

            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="text-xs font-medium uppercase tracking-wider text-gray-500">OR</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-medium text-black">
              <FcGoogle size={20} />
              Continue with Google
            </button>

            <p className="text-center text-xs text-gray-400">
              New to IEC?{" "}
              <Link href="/register" className="font-semibold text-red-600">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}