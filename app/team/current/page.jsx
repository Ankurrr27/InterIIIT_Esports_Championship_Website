"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { Users, Shield, Lock, Loader2, LogOut, Trash2, Mail, Copy, Check, User as UserIcon, Edit2, X, Send, ImagePlus } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function CurrentTeamPage() {
  const [team, setTeam] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  
  const [editingTeam, setEditingTeam] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [updatingTeam, setUpdatingTeam] = useState(false);

  const [directory, setDirectory] = useState([]);
  const [loadingDirectory, setLoadingDirectory] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchTeamData();
    fetchDirectory();
  }, []);

  const fetchDirectory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch("/api/team/directory", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) {
        setDirectory(data.directory);
      }
    } catch (error) {
      console.error("Failed to load directory", error);
    } finally {
      setLoadingDirectory(false);
    }
  };

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

  const handleInviteFromDirectory = async (email) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/team/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) { toast.success(`Invitation sent to ${email}!`); }
      else toast.error(data.message || "Failed to send invite");
    } catch { toast.error("Failed to send invite"); }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Banner must be under 5MB"); return; }
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleUpdateTeam = async () => {
    const nameChanged = newTeamName.trim() && newTeamName !== team.name;
    if (!nameChanged && !bannerFile) {
      setEditingTeam(false);
      return;
    }
    setUpdatingTeam(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("teamId", team._id);
      if (nameChanged) formData.append("name", newTeamName);
      if (bannerFile) formData.append("banner", bannerFile);
      const res = await fetch("/api/team/update", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Team updated!");
        setTeam(data.team);
        setEditingTeam(false);
        setBannerFile(null);
        setBannerPreview(null);
      } else {
        toast.error(data.message || "Failed to update team");
      }
    } catch { toast.error("Failed to update team"); }
    finally { setUpdatingTeam(false); }
  };

  const cancelEdit = () => {
    setEditingTeam(false);
    setBannerFile(null);
    setBannerPreview(null);
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

  const isCaptain = currentUser?.id === (team?.leaderId?._id || team?.leaderId?.toString());
  const isAdmin = currentUser?.role === "ADMIN";

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white pt-32 pb-10 border-b border-black/5">

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Edit mode panel */}
          {editingTeam ? (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Team Name</label>
                <input
                  type="text"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="w-full max-w-md text-2xl sm:text-3xl font-[family-name:var(--font-display)] tracking-tight text-slate-900 border-b-2 border-slate-300 focus:border-red-500 outline-none bg-transparent px-1 py-1"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Team Banner</label>
                <label className="flex items-center gap-3 cursor-pointer w-fit px-4 py-2.5 border border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors">
                  <ImagePlus size={18} className="text-slate-400" />
                  <span className="text-sm text-slate-600">{bannerFile ? bannerFile.name : "Choose banner image"}</span>
                  <input type="file" accept="image/*" onChange={handleBannerChange} className="hidden" />
                </label>
                {bannerPreview && (
                  <div className="mt-3 relative w-full max-w-md h-28 rounded-lg overflow-hidden border border-slate-200">
                    <Image src={bannerPreview} alt="Banner preview" fill className="object-cover" />
                    <button onClick={() => { setBannerFile(null); setBannerPreview(null); }} className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button onClick={handleUpdateTeam} disabled={updatingTeam} className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50">
                  {updatingTeam ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Save Changes
                </button>
                <button onClick={cancelEdit} disabled={updatingTeam} className="px-5 py-2 bg-slate-100 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{team.college}</p>
                <div className="mt-2 flex items-center gap-3">
                  <h1 className="text-4xl sm:text-5xl font-[family-name:var(--font-display)] tracking-tight text-slate-900">
                    {team.name}
                  </h1>
                  {isCaptain && !team.isRegistered && (
                    <button onClick={() => { setNewTeamName(team.name); setEditingTeam(true); }} className="text-slate-400 hover:text-slate-700 transition-colors" title="Edit team">
                      <Edit2 size={20} />
                    </button>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-slate-600">{team.game}</span>
                  <span className="text-slate-300">•</span>
                  {team.isRegistered ? (
                    <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                      <Lock size={14} /> Registered
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                      <Users size={14} /> Open Roster ({team.members.length}/{team.maxPlayers})
                    </span>
                  )}
                </div>
              </div>
              {isCaptain && !team.isRegistered && (
                <button
                  onClick={handleRegister}
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  Lock & Register Team
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Minimal Main content */}
      <section className="bg-slate-50/50 px-4 py-12 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">

            {/* Roster */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Active Roster</h2>

              <div className="flex flex-col gap-3">
                {team.members.map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-100 bg-slate-50">
                        {member.userId?.profileImage ? (
                          <Image 
                            src={member.userId.profileImage} 
                            alt={member.userId.name} 
                            width={48} 
                            height={48} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <UserIcon size={20} className="text-slate-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-900">{member.userId?.name || "Unknown"}</h3>
                          {member.role === "LEADER" && (
                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded">
                              <Shield size={10} /> Captain
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{member.userId?.email}</p>
                      </div>
                    </div>
                    
                    {isCaptain && member.role !== "LEADER" && !team.isRegistered && (
                      <button
                        onClick={() => handleRemoveMember(member.userId?._id)}
                        className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors p-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* College Directory Section */}
              <div className="mt-12">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Users size={18} className="text-slate-400" /> College Directory
                </h2>
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                  {loadingDirectory ? (
                    <div className="p-8 text-center text-slate-500 flex flex-col items-center">
                      <Loader2 size={24} className="animate-spin text-slate-300 mb-2" />
                      Loading directory...
                    </div>
                  ) : directory.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No other players found from your college.</div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {directory.map((student) => {
                        const inMyTeam = team.members.some(m => m.userId?._id === student._id);
                        return (
                          <div key={student._id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-100 bg-slate-50">
                                {student.profileImage ? (
                                  <Image src={student.profileImage} alt={student.name} width={40} height={40} className="h-full w-full object-cover" />
                                ) : (
                                  <UserIcon size={16} className="text-slate-400" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-slate-900 text-sm">{student.name}</h3>
                                  {student.role === "ADMIN" && (
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Admin</span>
                                  )}
                                  {student.role === "LEADER" && (
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-1.5 py-0.5 rounded">Captain</span>
                                  )}
                                  {student.role === "MODERATOR" && (
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">Mod</span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500">{student.game} • {student.collegeEmail}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              {inMyTeam ? (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded">In Your Team</span>
                              ) : student.teamId ? (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                  {student.teamId.name}
                                </span>
                              ) : isCaptain && !team.isRegistered && team.members.length < team.maxPlayers ? (
                                <button 
                                  onClick={() => handleInviteFromDirectory(student.email)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded transition-colors"
                                >
                                  <Send size={12} /> Invite
                                </button>
                              ) : (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">No Team</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Invite */}
              {isCaptain && !team.isRegistered && (
                <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Invite Players</h3>

                  <div className="mb-5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Invite Code</label>
                    <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
                      <div className="flex-1 px-3 py-2 text-sm font-mono text-slate-700">{team.inviteCode}</div>
                      <button onClick={handleCopyCode} className="px-3 py-2 border-l border-slate-200 hover:bg-slate-100 transition-colors">
                        {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} className="text-slate-400" />}
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleInvite}>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Email Invite</label>
                    <div className="flex items-center rounded-lg border border-slate-200 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-slate-200 focus-within:border-slate-400 transition-all">
                      <input
                        type="email"
                        required
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="player@college.edu"
                        className="flex-1 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                      />
                      <button type="submit" disabled={inviting} className="px-3 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-colors disabled:opacity-50">
                        {inviting ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Danger Zone */}
              <div className="p-5 rounded-xl border border-red-100 bg-red-50/50">
                <h3 className="text-sm font-bold text-red-800 mb-4">Danger Zone</h3>
                {!isCaptain && (
                  <button
                    onClick={handleLeaveTeam}
                    disabled={team.isRegistered}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    <LogOut size={16} /> Leave Team
                  </button>
                )}
                {isCaptain && (
                  <button
                    onClick={handleDeleteTeam}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
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