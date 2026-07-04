"use client";

import { useState } from "react";
import { X } from "lucide-react";

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
      setMessage(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-[420px] rounded-2xl bg-[#111111] p-8 border border-zinc-700">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Create Team
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-[#1A1A1A] px-4 py-3 text-white outline-none focus:border-red-500"
        />

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              success ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <button
          onClick={handleCreateTeam}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Team"}
        </button>
      </div>
    </div>
  );
}