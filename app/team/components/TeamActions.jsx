"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import CreateTeamCard from "./CreateTeamCard";
import JoinTeamCard from "./JoinTeamCard";
import CurrentTeamCard from "./CurrentTeamCard";
import CreateTeamModal from "./CreateTeamModal";
import JoinTeamModal from "./JoinTeamModal";

export default function TeamActions() {
  const [openModal, setOpenModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch("/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user state", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleCardClick = (action) => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }
    action();
  };

  return (
    <>
      <section id="team-actions" className="relative overflow-hidden bg-black px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-px bg-red-600/60" />
        <div className="absolute right-0 top-0 h-72 w-72 bg-red-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-red-400">
                Team Portal
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl leading-none tracking-wide sm:text-6xl">
                Choose Your Next Move
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/55">
              Create a squad, join a captain, or open your active roster from one place.
            </p>
          </div>

          {loading ? (
            <div className="flex h-48 w-full items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Loader2 className="h-8 w-8 animate-spin text-red-500" />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {/* IF NO TEAM: Show Create & Join */}
              {!user?.teamId && (
                <>
                  <CreateTeamCard onClick={() => handleCardClick(() => setOpenModal(true))} />
                  <JoinTeamCard onClick={() => handleCardClick(() => setJoinModal(true))} />
                </>
              )}

              {/* IF HAS TEAM: Show View/Manage */}
              {user?.teamId && (
                <div className="md:col-span-3 lg:col-span-2">
                  <CurrentTeamCard onClick={() => handleCardClick(() => router.push("/team/current"))} />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {openModal ? <CreateTeamModal onClose={() => setOpenModal(false)} /> : null}
      {joinModal ? <JoinTeamModal onClose={() => setJoinModal(false)} /> : null}
    </>
  );
}
