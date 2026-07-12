"use client";

import { useState } from "react";
import { X, ArrowRight, Hash } from "lucide-react";

export default function JoinTeamModal({ onClose }) {
  const [teamId, setTeamId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleJoin = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login first.");
      }

      const isInviteCode = teamId.length <= 8;
      const endpoint = isInviteCode ? "/api/team/join" : "/api/team/request";
      const bodyPayload = isInviteCode ? { inviteCode: teamId } : { teamId };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyPayload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      setSuccess(true);
      setMessage(data.message);

      setTimeout(() => {
        onClose();
      }, 1200);

    } catch (err) {
      setSuccess(false);
      setMessage(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-[420px] rounded-3xl bg-black/80 backdrop-blur-xl border border-white/10 p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
              Join Team
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Enter the invite code to join.
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
            <Hash
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-red-500"
            />
            <input
              type="text"
              placeholder="Team ID / Code"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
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
            onClick={handleJoin}
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-3.5 font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-red-500/40 disabled:pointer-events-none disabled:opacity-60"
          >
            {loading ? "Sending..." : (teamId.length <= 8 && teamId.length > 0 ? "Join Team" : "Send Join Request")}
            {!loading && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
          </button>
        </div>
      </div>
    </div>
  );
}