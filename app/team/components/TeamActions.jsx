"use client";

import CreateTeamCard from "./CreateTeamcard";
import JoinTeamCard from "./JoinTeamCard";
import CurrentTeamCard from "./CurrentTeamCard";

export default function TeamActions() {
  const handleCreateTeam = () => {
    console.log("Create Team");
    // Later:
    // if(userHasTeam){
    //   toast.error("You're already in a team");
    // } else {
    //   router.push("/create-team");
    // }
  };

  const handleJoinTeam = () => {
    console.log("Join Team");
    // Later:
    // if(userHasTeam){
    //   toast.error("You're already in a team");
    // } else {
    //   openJoinModal();
    // }
  };

  const handleCurrentTeam = () => {
    console.log("Current Team");
    // Later:
    // if(userHasTeam){
    //   router.push("/team");
    // } else {
    //   toast.error("You are not in a team");
    // }
  };

  return (
    <section className="w-full py-20 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white">
            Team Management
          </h1>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
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
  );
}