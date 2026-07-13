"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Search, Users, Loader2, Trash2, Shield } from "lucide-react";

export default function TeamsPage() {
  const [token, setToken] = useState("");
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) { setToken(storedToken); fetchTeams(storedToken); }
  }, []);

  const fetchTeams = async (currentToken) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/teams", { headers: { Authorization: `Bearer ${currentToken}` } });
      const data = await res.json();
      if (data.success) setTeams(data.teams);
      else toast.error("Failed to load teams");
    } catch { toast.error("An error occurred"); }
    finally { setLoading(false); }
  };

  const deleteTeam = async (teamId) => {
    if (!confirm("Delete this team permanently?")) return;
    try {
      const res = await fetch(`/api/admin/teams?teamId=${teamId}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) { toast.success("Team deleted"); fetchTeams(token); }
      else toast.error(data.message);
    } catch { toast.error("Failed to delete team"); }
  };

  const filteredTeams = teams.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const registered = teams.filter(t => t.isRegistered).length;
  const pending = teams.length - registered;

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Teams Directory</h2>
          <p className="text-xs text-gray-500 mt-0.5">View and manage all registered squads</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search teams or colleges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-gray-200 bg-white py-1.5 pl-8 pr-4 text-xs text-slate-900 outline-none transition-colors focus:border-red-500 placeholder:text-gray-400 shadow-sm"
          />
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Teams", value: teams.length, color: "text-slate-900" },
          { label: "Registered", value: registered, color: "text-emerald-600" },
          { label: "Pending", value: pending, color: "text-orange-600" },
        ].map(stat => (
          <div key={stat.label} className="rounded-lg border border-gray-200 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-gray-500">
          <thead className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-400 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2.5 font-semibold">Team Name</th>
              <th className="px-4 py-2.5 font-semibold hidden sm:table-cell">College</th>
              <th className="px-4 py-2.5 font-semibold">Game</th>
              <th className="px-4 py-2.5 font-semibold text-center">Members</th>
              <th className="px-4 py-2.5 font-semibold">Status</th>
              <th className="px-4 py-2.5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && (
              <tr>
                <td colSpan="6" className="py-12 text-center">
                  <Loader2 className="animate-spin mx-auto text-red-500 mb-2" size={20} />
                  <p className="text-gray-400 text-xs">Loading teams...</p>
                </td>
              </tr>
            )}
            {!loading && filteredTeams.length === 0 && (
              <tr>
                <td colSpan="6" className="py-16 text-center">
                  <Users size={32} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-400 text-sm font-medium">No teams found</p>
                  <p className="text-gray-300 text-xs mt-1">Teams will appear here once players register</p>
                </td>
              </tr>
            )}
            {filteredTeams.map((team) => (
              <tr key={team._id} className="transition-colors hover:bg-gray-50 group">
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    {team.isRegistered && <Shield size={11} className="text-emerald-600 shrink-0" />}
                    <p className="font-semibold text-slate-900 text-xs truncate max-w-[140px]">{team.name}</p>
                  </div>
                  <p className="text-[10px] text-gray-400 sm:hidden mt-0.5 truncate">{team.college}</p>
                </td>
                <td className="px-4 py-2.5 text-gray-500 hidden sm:table-cell text-xs truncate max-w-[160px]">{team.college}</td>
                <td className="px-4 py-2.5">
                  <span className="inline-block rounded bg-gray-100 border border-gray-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    {team.game}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-center font-mono text-xs text-gray-500">
                  {team.members?.length || 0}<span className="text-gray-400">/{team.maxPlayers}</span>
                </td>
                <td className="px-4 py-2.5">
                  <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${team.isRegistered ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-orange-50 text-orange-700 border-orange-200"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${team.isRegistered ? "bg-emerald-500" : "bg-orange-500"}`} />
                    {team.isRegistered ? "Registered" : "Pending"}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <button
                    onClick={() => deleteTeam(team._id)}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={10} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
