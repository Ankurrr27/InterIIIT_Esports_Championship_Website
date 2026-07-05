"use client";

import { Plus } from "lucide-react";

export default function CreateTeamCard({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 text-left transition-all duration-300 hover:border-red-500/50 hover:bg-white/5 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/10"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative z-10">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/10 to-red-500/5 text-red-500 ring-1 ring-red-500/20 transition-all duration-300 group-hover:scale-110 group-hover:from-red-600 group-hover:to-red-500 group-hover:text-white group-hover:ring-red-500 group-hover:shadow-lg group-hover:shadow-red-500/30">
          <Plus size={32} />
        </div>

        <h2 className="text-2xl font-bold text-white transition-colors group-hover:text-red-400">
          Create Team
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-gray-400">
          Start your own squad and invite teammates using your unique team code.
        </p>

        <span className="mt-8 inline-flex items-center text-sm font-semibold text-red-500 transition-all duration-300 group-hover:translate-x-2 group-hover:text-red-400">
          Create →
        </span>
      </div>
    </button>
  );
}