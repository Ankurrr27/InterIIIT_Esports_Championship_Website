"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, Gamepad2, GraduationCap, Lock, Mail, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const COLLEGES = [
  { name: "IIIT Kota", domain: "iiitkota.ac.in" },
  { name: "IIIT Nagpur", domain: "iiitnagpur.ac.in" },
  { name: "IIIT Patna", domain: "iiitpatna.ac.in" },
];

const cardShell = "z-10 my-2 flex w-full max-w-[430px] justify-center px-4 sm:px-0 lg:my-0";
const cardPanel = "flex h-[590px] max-h-[calc(100svh-7rem)] min-h-[520px] w-full flex-col overflow-y-auto rounded-lg border border-white/10 bg-black/55 px-5 py-5 shadow-2xl backdrop-blur-xl sm:px-6 sm:py-6";
const inputClass = "w-full rounded-lg border border-white/10 bg-transparent py-2.5 pl-10 pr-10 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-red-500 focus:bg-white/5";

export default function RegisterCard() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
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

  // Get expected domain hint for the selected college
  const selectedCollege = COLLEGES.find((c) => c.name === formData.college);
  const domainHint = selectedCollege ? `e.g. you@${selectedCollege.domain}` : "College Email";

  const handleRegister = async () => {
    // Client-side validation: email domain must match selected college
    if (selectedCollege && formData.collegeEmail) {
      const emailDomain = formData.collegeEmail.split("@")[1]?.toLowerCase();
      if (emailDomain !== selectedCollege.domain) {
        setSuccess(false);
        setMessage(
          `Email must end with @${selectedCollege.domain} for ${selectedCollege.name}`
        );
        return;
      }
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/register", {
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
      setMessage("Registration successful!");

      setFormData({
        name: "",
        email: "",
        college: "",
        collegeEmail: "",
        password: "",
        game: "",
      });

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
    <div className={cardShell}>
      <div className={cardPanel}>        <div className="mb-4 flex w-full border-b border-white/20">
          <Link href="/login" className="flex-1 py-2 text-center text-xs font-medium uppercase tracking-widest text-gray-400 sm:text-sm">
            LOGIN
          </Link>
          <Link href="/register" className="flex-1 border-b-2 border-red-600 py-2 text-center text-xs font-medium uppercase tracking-widest text-red-500 sm:text-sm">
            SIGN UP
          </Link>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="space-y-3">
            <div className="relative group">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="relative group">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <input
                name="email"
                type="email"
                placeholder="Personal Email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* College Dropdown */}
            <div className="relative group">
              <Building2 size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <select
                name="college"
                value={formData.college}
                onChange={handleChange}
                className={inputClass + " appearance-none"}
              >
                <option value="" className="bg-[#111111]">Select College</option>
                {COLLEGES.map((c) => (
                  <option key={c.name} value={c.name} className="bg-[#111111]">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* College Email — placeholder changes based on selected college */}
            <div className="relative group">
              <GraduationCap size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <input
                name="collegeEmail"
                type="email"
                placeholder={domainHint}
                value={formData.collegeEmail}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="relative group">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={inputClass}
              />
              <Gamepad2 size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>

            <div className="relative group">
              <Gamepad2 size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <select
                name="game"
                value={formData.game}
                onChange={handleChange}
                className={inputClass + " appearance-none"}
              >
                <option value="" className="bg-[#111111]">Select Game</option>
                <option value="BGMI" className="bg-[#111111]">BGMI</option>
                <option value="VALORANT" className="bg-[#111111]">Valorant</option>
                <option value="FREEFIRE" className="bg-[#111111]">Free Fire</option>
              </select>
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
              onClick={handleRegister}
              disabled={loading}
              className="relative flex w-full items-center justify-center gap-2 rounded-lg bg-[#cc0000] py-2.5 text-sm font-semibold text-white shadow-lg disabled:pointer-events-none disabled:opacity-60"
            >
              {loading ? "REGISTERING..." : "REGISTER"}
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
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-red-600">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}