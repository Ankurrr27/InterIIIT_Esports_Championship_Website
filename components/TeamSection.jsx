import { getIECTeamMembers } from "@/lib/helpers/iecTeam";
import TeamCard from "./TeamCard";

const DEPARTMENTS = [
  "Management",
  "Free Fire",
  "BGMI",
  "Valorant",
  "Sponsorship",
  "Web Development",
  "Social Media",
  "Design",
  "Content"
];

export default async function TeamSection() {
  const teamMembers = await getIECTeamMembers();

  if (!teamMembers || teamMembers.length === 0) {
    return (
      <section className="bg-white py-12 text-slate-950 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-5xl tracking-wide sm:text-6xl text-[#0f172a] uppercase leading-none">
              Members
            </h2>
          </div>
          <div className="w-full py-16 text-center text-slate-500 border border-dashed border-slate-200">
            The core team is currently being assembled.
          </div>
        </div>
      </section>
    );
  }

  // Filter members by departments
  const departmentGroups = DEPARTMENTS.map(dept => {
    return {
      name: dept,
      members: teamMembers.filter(member => member.departments?.includes(dept))
    };
  }).filter(group => group.members.length > 0);

  // Fallback for members without any department
  const unassignedMembers = teamMembers.filter(member => !member.departments || member.departments.length === 0);
  if (unassignedMembers.length > 0) {
    departmentGroups.push({
      name: "Other Members",
      members: unassignedMembers
    });
  }

  return (
    <section className="bg-slate-50 py-10 text-slate-950 sm:py-24 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 sm:mb-16 text-left sm:text-center">
          <p className="text-[0.5rem] sm:text-xs tracking-[0.25em] uppercase text-red-500 font-medium mb-1">
            Our Team
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide sm:text-5xl lg:text-6xl text-slate-900 uppercase leading-none">
            Core Team
          </h2>
          <p className="mt-2 sm:mt-4 text-slate-500 text-[11px] sm:text-sm tracking-[0.2em] uppercase font-semibold">
            Meet the people behind the championship
          </p>
        </div>
        
        <div className="space-y-12 sm:space-y-24">
          {departmentGroups.map((group) => (
            <div key={group.name} className="relative">
              
              {/* Department Header */}
              <div className="mb-6 sm:mb-10 text-left sm:text-center relative">
                <div className="hidden sm:block absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative sm:flex sm:justify-center">
                  <span className="sm:bg-slate-50 sm:px-6 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-red-600">
                    {group.name} {group.name.includes("Team") ? "" : "Team"}
                  </span>
                </div>
              </div>

              {/* Department Members */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-6 lg:gap-8 justify-center">
                {group.members.map((member) => (
                  <div key={member._id.toString()} className="w-full">
                    <TeamCard member={member} />
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
