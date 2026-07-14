import { dbConnect } from "@/lib/mongodb";
import IECTeamMember from "@/lib/models/IECTeamMember";
import TeamCard from "./TeamCard";

export default async function TeamSection() {
  await dbConnect();
  
  // Fetch team members from database directly in the Server Component
  const teamMembers = await IECTeamMember.find({}).sort({ order: 1, createdAt: 1 }).lean();

  return (
    <section className="bg-[#f8fafc] px-4 py-12 text-slate-950 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="font-[family-name:var(--font-display)] text-5xl tracking-wide sm:text-6xl text-[#0f172a] uppercase leading-none">
            Members
          </h2>
        </div>

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {teamMembers.map((member) => (
            <TeamCard key={member._id.toString()} member={member} />
          ))}

          {teamMembers.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-500 border border-dashed border-slate-200">
              The core team is currently being assembled.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
