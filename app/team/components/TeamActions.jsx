"use client";

import { useState } from "react";

import CreateTeamCard from "./CreateTeamcard";
import JoinTeamCard from "./JoinTeamCard";
import CurrentTeamCard from "./CurrentTeamCard";
import CreateTeamModal from "./CreateTeamModal";

import { createTeam } from "@/lib/api/team";

export default function TeamActions() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateClick = () => {
    setOpenModal(true);
  };

  const handleCreateTeam = async (teamName) => {
  try {
    setLoading(true);

    const team = await createTeam(teamName);

    // Update local user for testing
    const user = JSON.parse(localStorage.getItem("user"));

    user.teamId = team._id;
    user.role = "LEADER";

    localStorage.setItem("user", JSON.stringify(user));

    console.log(team);

    alert("Team created successfully!");

    setOpenModal(false);
  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};

  const handleJoinTeam = () => {
    console.log("Join Team");
  };

  const handleCurrentTeam = () => {
    console.log("Current Team");
  };

  return (
    <>
      <section className="w-full py-20 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-white">
              Team Management
            </h1>

            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Create your own squad, join an existing one, or manage your current
              team from one place.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            <CreateTeamCard onClick={handleCreateClick} />
            <JoinTeamCard onClick={handleJoinTeam} />
            <CurrentTeamCard onClick={handleCurrentTeam} />
          </div>

        </div>
      </section>

      <CreateTeamModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={handleCreateTeam}
        loading={loading}
      />
    </>
  );
}