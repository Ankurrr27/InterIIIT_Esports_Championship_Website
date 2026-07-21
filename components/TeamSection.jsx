import { getIECTeamMembers } from "@/lib/helpers/iecTeam";
import TeamCard from "./TeamCard";

export default async function TeamSection() {
  const teamMembers = await getIECTeamMembers();

  return (
    <section className="bg-white py-12 text-slate-950 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-[family-name:var(--font-display)] text-5xl tracking-wide sm:text-6xl text-[#0f172a] uppercase leading-none">
            Members
          </h2>
        </div>
        
        {(!teamMembers || teamMembers.length === 0) ? (
          <div className="w-full py-16 text-center text-slate-500 border border-dashed border-slate-200">
            The core team is currently being assembled.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member._id.toString()} className="flex justify-center">
                <div className="w-full max-w-[280px]">
                  <TeamCard member={member} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
