"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { Users, Shield, Lock, Loader2, LogOut, Trash2, Mail, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function CurrentTeamPage() {
  const [team, setTeam] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) { router.push("/login"); return; }
      const res = await fetch("/api/team/current", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) {
        setTeam(data.team);
        setCurrentUser(data.currentUser);
      } else {
        toast.error(data.message || "Failed to load team data");
        router.push("/team");
      }
    } catch {
      toast.error("An error occurred");
      router.push("/team");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (!team?.inviteCode) return;
    navigator.clipboard.writeText(team.inviteCode);
    setCopied(true);
    toast.success("Invite code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setInviting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/team/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: inviteEmail }),
      });
      const data = await res.json();
      if (data.success) { toast.success("Invitation sent!"); setInviteEmail(""); }
      else toast.error(data.message || "Failed to send invite");
    } catch { toast.error("Failed to send invite"); }
    finally { setInviting(false); }
  };

  const handleRemoveMember = async (memberId) => {
    if (!confirm("Remove this member?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/team/remove-member", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ memberId }),
      });
      const data = await res.json();
      if (data.success) { toast.success("Member removed"); fetchTeamData(); }
      else toast.error(data.message);
    } catch { toast.error("Failed to remove member"); }
  };

  const handleLeaveTeam = async () => {
    if (!confirm("Leave this team?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/team/leave", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) { toast.success("Left team"); router.push("/team"); }
      else toast.error(data.message);
    } catch { toast.error("Failed to leave team"); }
  };

  const handleDeleteTeam = async () => {
    if (!confirm("WARNING: Permanently delete the team?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/team/delete", { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) { toast.success("Team deleted"); router.push("/team"); }
      else toast.error(data.message);
    } catch { toast.error("Failed to delete team"); }
  };

  const handleRegister = async () => {
    if (!confirm("Lock roster and register? You cannot change members after this.")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/team/register", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) { toast.success("Team registered!"); fetchTeamData(); }
      else toast.error(data.message);
    } catch { toast.error("Failed to register team"); }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black">
        <Loader2 className="h-12 w-12 animate-spin text-red-500" />
      </main>
    );
  }

  if (!team) return null;

  const isCaptain = currentUser?.role === "LEADER";

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      {/* Hero Section — matches site style */}
      <section className="relative overflow-hidden px-4 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(239,68,68,0.22),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06),transparent_26%),linear-gradient(135deg,#050505_0%,#0d0d10_48%,#020202_100%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-white/10">
          <div className="h-full w-1/3 bg-red-600" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-4 h-1 w-16 bg-red-600" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-red-400">{team.college}</p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-none tracking-wide sm:text-7xl lg:text-8xl">
            {team.name}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            {team.isRegistered ? (
              <span className="flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                <Lock size={12} /> Roster Locked & Registered
              </span>
            ) : (
              <span className="flex items-center gap-1.5 border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
                <Users size={12} /> Open Roster — {team.members.length}/{team.maxPlayers} Players
              </span>
            )}
            <span className="text-xs font-bold uppercase tracking-widest text-white/35">{team.game}</span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-white px-4 py-12 text-slate-950 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">

            {/* Roster */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-red-600">Squad</p>
                  <h2 className="mt-1 font-[family-name:var(--font-display)] text-4xl leading-none tracking-wide">Active Roster</h2>
                </div>
                <span className="text-sm font-semibold text-slate-400">{team.members.length}/{team.maxPlayers}</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {team.members.map((member, idx) => (
                  <div key={idx} className="group relative overflow-hidden bg-black text-white border border-transparent hover:border-red-500/30 transition-colors">
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-red-600" />
                    <div className="absolute right-0 top-0 h-20 w-20 bg-red-600/10 blur-2xl transition group-hover:bg-red-600/20" />
                    <div className="relative p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-black text-white">{member.userId?.name || "Unknown"}</h3>
                          <p className="mt-1 text-xs text-white/50 truncate max-w-[180px]">{member.userId?.collegeEmail}</p>
                        </div>
                        <span className={`shrink-0 ml-2 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest border ${member.role === "LEADER" ? "border-red-500/40 bg-red-500/10 text-red-400" : "border-white/10 bg-white/5 text-slate-400"}`}>
                          {member.role === "LEADER" ? <span className="flex items-center gap-1"><Shield size={9} /> Captain</span> : "Player"}
                        </span>
                      </div>
                      {isCaptain && member.role !== "LEADER" && !team.isRegistered && (
                        <button
                          onClick={() => handleRemoveMember(member.userId?._id)}
                          className="mt-4 text-[10px] font-bold uppercase tracking-wider text-red-500 hover:text-red-400 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Status */}
              <div className="bg-black text-white p-5 border border-white/10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40 mb-4">Tournament Status</p>
                <div className={`flex items-center justify-between rounded p-3 border text-sm font-semibold ${team.isRegistered ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" : "border-orange-500/30 bg-orange-500/10 text-orange-400"}`}>
                  <span>{team.game}</span>
                  <span className="text-[10px] uppercase tracking-wider font-black">{team.isRegistered ? "Registered" : "Pending"}</span>
                </div>
                {isCaptain && !team.isRegistered && (
                  <button
                    onClick={handleRegister}
                    className="mt-4 w-full bg-white text-black py-2.5 text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-200 transition-colors"
                  >
                    Lock & Register Team
                  </button>
                )}
              </div>

              {/* Invite */}
              {isCaptain && !team.isRegistered && (
                <div className="bg-black text-white p-5 border border-white/10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40 mb-4">Invite Players</p>

                  <div className="mb-4">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Invite Code</p>
                    <div className="flex bg-white/5 border border-white/10">
                      <div className="flex-1 px-3 py-2 text-sm font-mono tracking-widest text-red-400">{team.inviteCode}</div>
                      <button onClick={handleCopyCode} className="bg-white/10 hover:bg-white/20 px-3 transition-colors">
                        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-slate-300" />}
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleInvite}>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Invite via Email</p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        required
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="player@college.edu"
                        className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/20 focus:border-red-500 focus:outline-none"
                      />
                      <button type="submit" disabled={inviting} className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 transition-colors disabled:opacity-50">
                        {inviting ? <Loader2 size={14} className="animate-spin" /> : <Mail size={14} />}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Danger Zone */}
              <div className="bg-black text-white p-5 border border-white/10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40 mb-4">Danger Zone</p>
                {!isCaptain && (
                  <button
                    onClick={handleLeaveTeam}
                    disabled={team.isRegistered}
                    className="w-full flex items-center justify-center gap-2 border border-orange-500/30 bg-orange-500/10 py-2.5 text-xs font-bold uppercase tracking-wider text-orange-400 hover:bg-orange-500/20 transition-colors disabled:opacity-40"
                  >
                    <LogOut size={14} /> Leave Team
                  </button>
                )}
                {isCaptain && (
                  <button
                    onClick={handleDeleteTeam}
                    className="w-full flex items-center justify-center gap-2 border border-red-500/30 bg-red-500/10 py-2.5 text-xs font-bold uppercase tracking-wider text-red-500 hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 size={14} /> Disband Team
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}