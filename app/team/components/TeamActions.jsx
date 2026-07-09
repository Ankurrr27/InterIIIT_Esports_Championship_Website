"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CreateTeamCard from "./CreateTeamCard";
import JoinTeamCard from "./JoinTeamCard";
import CurrentTeamCard from "./CurrentTeamCard";
import CreateTeamModal from "./CreateTeamModal";
import JoinTeamModal from "./JoinTeamModal";

export default function TeamActions() {
  const [openModal, setOpenModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const router = useRouter();

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

          <div className="grid gap-4 md:grid-cols-3">
            <CreateTeamCard onClick={() => setOpenModal(true)} />
            <JoinTeamCard onClick={() => setJoinModal(true)} />
            <CurrentTeamCard onClick={() => router.push("/team/current")} />
          </div>
        </div>
      </section>

      {openModal ? <CreateTeamModal onClose={() => setOpenModal(false)} /> : null}
      {joinModal ? <JoinTeamModal onClose={() => setJoinModal(false)} /> : null}
    </>
  );
}
