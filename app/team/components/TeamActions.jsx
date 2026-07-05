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

  // Create Team
  const handleCreateTeam = () => {
    setOpenModal(true);
  };

  // Join Team
  const handleJoinTeam = () => {
    setJoinModal(true);
  };

  // Current Team
  const handleCurrentTeam = () => {
    router.push("/team/current");
  };

  return (
    <>
      <section className="w-full py-24 min-h-[calc(100vh-80px)] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 w-full">

          {/* Heading */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-red-600 drop-shadow-sm">
              Team Management
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-gray-400 font-medium">
              Create your own squad, join an existing one, or manage your current
              team from one place.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            <CreateTeamCard onClick={handleCreateTeam} />
            <JoinTeamCard onClick={handleJoinTeam} />
            <CurrentTeamCard onClick={handleCurrentTeam} />
          </div>

        </div>
      </section>

      {/* Create Team Modal */}
      {openModal && (
        <CreateTeamModal
          onClose={() => setOpenModal(false)}
        />
      )}

      {/* Join Team Modal */}
      {joinModal && (
        <JoinTeamModal
          onClose={() => setJoinModal(false)}
        />
      )}
    </>
  );
}