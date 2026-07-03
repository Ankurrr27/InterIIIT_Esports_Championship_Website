"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function CreateTeamModal({
  open,
  onClose,
  onCreate,
  loading = false,
}) {
  const [teamName, setTeamName] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    if (!teamName.trim()) return;

    onCreate(teamName.trim());
    setTeamName("");
  };

  const handleClose = () => {
    setTeamName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#181818] p-8 shadow-2xl">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-white">
          Create Team
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Enter your team name below.
        </p>

        <div className="mt-6">
          <label className="mb-2 block text-sm text-gray-300">
            Team Name
          </label>

          <input
            type="text"
            placeholder="e.g. Team Phoenix"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-red-500"
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={handleClose}
            className="rounded-xl border border-zinc-700 px-5 py-2 text-gray-300 hover:border-white hover:text-white"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="rounded-xl bg-red-600 px-6 py-2 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Team"}
          </button>

        </div>
      </div>
    </div>
  );
}