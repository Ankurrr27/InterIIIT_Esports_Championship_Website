"use client";

import { useState } from "react";
import { X, ArrowRight, Shield } from "lucide-react";

export default function CreateTeamModal({ onClose }) {
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleCreateTeam = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login first.");
      }

      const res = await fetch("/api/team/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: teamName,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || "Failed to create team.");
      }

      setSuccess(true);
      setMessage("✅ Team created successfully!");

      console.log("Created Team:", data.team);

      setTimeout(() => {
        onClose();
      }, 1200);

    } catch (err) {
      setSuccess(false);
      if (err.message === "UNREGISTERED_COLLEGE") {
        setMessage("Your college is not registered. Ask your esports club to register first.");
      } else {
        setMessage(err.message);
      }
      console.error("[CreateTeam] Error:", err.message);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-[420px] rounded-3xl bg-black/80 backdrop-blur-xl border border-white/10 p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
              Create Team
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Give your squad a legendary name.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-white/5 p-2 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="relative group">
            <Shield
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-red-500"
            />
            <input
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white/10 focus:ring-4 focus:ring-red-500/10"
            />
          </div>

          {message && (
            <div
              className={`rounded-lg p-3 text-center text-sm font-medium backdrop-blur-sm ${
                success 
                  ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {message}
            </div>
          )}

          <button
            onClick={handleCreateTeam}
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-3.5 font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-red-500/40 disabled:pointer-events-none disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Team"}
            {!loading && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
          </button>
        </div>
      </div>
    </div>
  );
}