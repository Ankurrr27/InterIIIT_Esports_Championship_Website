"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Users, Shield, CheckCircle2, Lock, Loader2, LogOut, Trash2, Mail, Copy, Check } from "lucide-react";
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
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("/api/team/current", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        setTeam(data.team);
        setCurrentUser(data.currentUser);
      } else {
        toast.error(data.message || "Failed to load team data");
        router.push("/team");
      }
    } catch (err) {
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
    toast.success("Invite code copied to clipboard!");
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: inviteEmail }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Invitation sent successfully!");
        setInviteEmail("");
      } else {
        toast.error(data.message || "Failed to send invite");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setInviting(false);
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (!confirm("Are you sure you want to remove this member?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/team/remove-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ memberId }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Member removed");
        fetchTeamData();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to remove member");
    }
  };

  const handleLeaveTeam = async () => {
    if (!confirm("Are you sure you want to leave this team?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/team/leave", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Left team successfully");
        router.push("/team");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to leave team");
    }
  };

  const handleDeleteTeam = async () => {
    if (!confirm("WARNING: This will permanently delete the team. Continue?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/team/delete", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Team deleted");
        router.push("/team");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to delete team");
    }
  };

  const handleRegister = async () => {
    if (!confirm("Lock roster and register for the tournament? You cannot change members after this.")) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/team/register", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Team registered successfully!");
        fetchTeamData();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to register team");
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loader2 className="h-12 w-12 animate-spin text-red-500" />
      </main>
    );
  }

  if (!team) return null;

  const isCaptain = currentUser?.role === "LEADER";

  return (
    <main className="overflow-x-hidden bg-slate-950 text-white min-h-screen pb-20">
      <Navbar />

      <section className="relative overflow-hidden bg-black pt-16 pb-12 sm:pt-24 sm:pb-16 border-b border-white/10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-end gap-6 sm:gap-8">
            <div className="flex flex-col justify-end">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500">
                {team.college}
              </p>
              <h1 className="mt-2 text-5xl font-[family-name:var(--font-display)] tracking-wide text-white sm:text-7xl">
                {team.name}
              </h1>
              <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
                {team.isRegistered ? (
                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    <Lock size={14} /> Roster Locked & Registered
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                    <Users size={14} /> Open Roster ({team.members.length}/{team.maxPlayers})
                  </span>
                )}
                <span className="text-xs text-slate-500 uppercase tracking-wider">
                  Game: {team.game}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#020617] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            
            <div className="lg:col-span-2 space-y-12">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Active Roster</h2>
                    <p className="text-sm text-slate-400 mt-1">Current lineup for {team.game}.</p>
                  </div>
                  <Users className="text-slate-600 opacity-50" size={32} />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {team.members.map((member, idx) => (
                    <div key={idx} className="group relative overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-red-500/30">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        {member.role === "LEADER" ? <Shield size={40} /> : <Users size={40} />}
                      </div>
                      
                      <h3 className="text-xl font-bold text-white">
                        {member.userId?.name || "Unknown"}
                      </h3>
                      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                        <p className="text-sm text-slate-400">{member.userId?.collegeEmail}</p>
                        <span className="rounded bg-black/50 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-300">
                          {member.role}
                        </span>
                      </div>
                      
                      {isCaptain && member.role !== "LEADER" && !team.isRegistered && (
                        <button 
                          onClick={() => handleRemoveMember(member.userId?._id)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500/10 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                          title="Remove Member"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-white/10 bg-black/40 p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-6">
                  Tournament Status
                </h3>
                
                <div className="space-y-4">
                  <div className={`flex flex-col justify-center rounded-lg border p-4 ${team.isRegistered ? 'border-emerald-500/20 bg-emerald-500/10' : 'border-orange-500/20 bg-orange-500/10'}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{team.game}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${team.isRegistered ? 'text-emerald-400' : 'text-orange-400'}`}>
                        {team.isRegistered ? "Registered" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
                
                {isCaptain && !team.isRegistered && (
                  <button 
                    onClick={handleRegister}
                    className="mt-6 w-full rounded-lg bg-emerald-600/10 border border-emerald-500/20 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400 transition hover:bg-emerald-600/20 hover:border-emerald-500/40"
                  >
                    Lock & Register Team
                  </button>
                )}
              </div>

              {isCaptain && !team.isRegistered && (
                <div className="rounded-xl border border-white/10 bg-black/40 p-6">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">
                    Invite Players
                  </h3>
                  
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2">Invite Code</p>
                    <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
                      <div className="flex-1 px-3 py-2 text-sm font-mono tracking-wider text-red-400">
                        {team.inviteCode}
                      </div>
                      <button 
                        onClick={handleCopyCode}
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-md transition-colors"
                      >
                        {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} className="text-slate-300" />}
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleInvite}>
                    <p className="text-xs text-slate-500 mb-2">Invite via Email</p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        required
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="player@college.edu"
                        className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-red-500 focus:outline-none"
                      />
                      <button 
                        type="submit"
                        disabled={inviting}
                        className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        {inviting ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">
                  Danger Zone
                </h3>
                
                {!isCaptain && (
                  <button 
                    onClick={handleLeaveTeam}
                    disabled={team.isRegistered}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-orange-500/10 border border-orange-500/20 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-orange-400 transition hover:bg-orange-500/20 disabled:opacity-50"
                  >
                    <LogOut size={16} /> Leave Team
                  </button>
                )}
                
                {isCaptain && (
                  <button 
                    onClick={handleDeleteTeam}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-red-500 transition hover:bg-red-500/20 hover:text-red-400"
                  >
                    <Trash2 size={16} /> Disband Team
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