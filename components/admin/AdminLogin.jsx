"use client";

import { useState } from "react";
import { ArrowRight, Lock, Mail } from "lucide-react";
import Image from "next/image";

export default function AdminLogin({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use existing login route (it returns JWT token)
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Existing login uses 'collegeEmail' not 'email'
        body: JSON.stringify({
          collegeEmail: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials");
      }

      // Check if user is actually an admin by hitting a protected stats route
      const statsRes = await fetch("/api/college-requests/stats", {
        headers: { Authorization: `Bearer ${data.token}` },
      });

      if (!statsRes.ok) {
        throw new Error("Access denied. Admin privileges required.");
      }

      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="absolute inset-0 z-0">
        <div className="grunge-noise" />
      </div>

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/logos/IEC LOGO Black.png"
            alt="IEC Logo"
            width={64}
            height={64}
            className="mb-4 invert"
          />
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Admin Portal
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Sign in with your administrator account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Admin Email
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-colors focus:border-red-500 focus:bg-white/10"
                placeholder="admin@iecesports.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-colors focus:border-red-500 focus:bg-white/10"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-center text-sm font-medium text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="relative mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-500 disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? "AUTHENTICATING..." : "SIGN IN TO DASHBOARD"}
            {!loading && <ArrowRight size={18} className="absolute right-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
