"use client";

import { Shield } from "lucide-react";

export default function CurrentTeamCard({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full rounded-2xl border border-white/10 bg-[#1A1A1A] p-8 text-left transition-all duration-300  hover:border-red-500/70 "
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition-all duration-300 group-hover:bg-red-500 group-hover:text-white">
        <Shield size={28} />
      </div>

      <h2 className="text-2xl font-bold text-white">
        Current Team
      </h2>

      <p className="mt-3 text-sm leading-6 text-gray-400">
        View your active team, manage members, and access your team details.
      </p>

      <span className="mt-8 inline-flex items-center text-sm font-medium text-red-500 transition-transform duration-300 group-hover:translate-x-2">
        View →
      </span>
    </button>
  );
}