"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Shield, Mail, Building2, Gamepad2, User, ArrowRight } from "lucide-react";

const cardShell = "z-10 my-2 flex w-full max-w-[430px] justify-center px-4 sm:px-0 lg:my-0";
const cardPanel = "flex h-[590px] max-h-[calc(100svh-7rem)] min-h-[520px] w-full flex-col overflow-y-auto rounded-lg border border-white/10 bg-black/55 px-5 py-5 shadow-2xl backdrop-blur-xl sm:px-6 sm:py-6";

export default function AlreadyLoggedInCard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("/api/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  if (loading) return null;
  if (!user) return null;

  return (
    <div className={cardShell}>
      <div className={cardPanel}>
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-400 shadow-lg shadow-red-500/25">
            <User size={28} className="text-white" />
          </div>
          <h2 className="text-xl font-extrabold text-white">Already Logged In</h2>
          <p className="mt-1 text-xs text-gray-400">You are currently signed in as</p>
        </div>

        {/* User Details */}
        <div className="flex-1 space-y-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <h3 className="mb-3 text-lg font-bold text-white">{user.name}</h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={14} className="shrink-0 text-gray-500" />
                <span className="text-gray-400">Email</span>
                <span className="ml-auto truncate text-white max-w-[180px]">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield size={14} className="shrink-0 text-emerald-500" />
                <span className="text-gray-400">College Email</span>
                <span className="ml-auto truncate text-white max-w-[180px]">{user.collegeEmail}</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-center gap-3 text-sm">
                <Building2 size={14} className="shrink-0 text-gray-500" />
                <span className="text-gray-400">College</span>
                <span className="ml-auto font-medium text-white">{user.college}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Gamepad2 size={14} className="shrink-0 text-gray-500" />
                <span className="text-gray-400">Game</span>
                <span className="ml-auto font-medium text-white">{user.game}</span>
              </div>
            </div>
          </div>

          {user.teamId && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-sm">
              <Shield size={14} className="text-emerald-400" />
              <span className="text-emerald-400 font-medium">You are in a team</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto space-y-3 pt-4">
          <button
            onClick={() => router.push("/team")}
            className="relative flex w-full items-center justify-center gap-2 rounded-lg bg-[#cc0000] py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-red-700"
          >
            Go to Dashboard
            <ArrowRight size={18} className="absolute right-4" />
          </button>

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
