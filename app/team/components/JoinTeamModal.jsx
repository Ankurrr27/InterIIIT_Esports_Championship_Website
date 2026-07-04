"use client";

import { useState } from "react";
import { X } from "lucide-react";

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

      const res = await fetch("/api/team/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          teamId,
        }),
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-[420px] rounded-2xl bg-[#1A1A1A] p-8">

        <div className="mb-6 flex items-center justify-between">

          <h1 className="text-2xl font-bold text-white">
            Join Team
          </h1>

          <button onClick={onClose}>
            <X className="text-white" />
          </button>

        </div>

        <input
          placeholder="Enter Team ID"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-[#111111] px-4 py-3 text-white outline-none focus:border-red-500"
        />

        {message && (
          <p
            className={`mt-4 text-center ${
              success ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <button
          onClick={handleJoin}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Join Request"}
        </button>

      </div>

    </div>
  );
}