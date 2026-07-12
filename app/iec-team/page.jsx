import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";

const teamMembers = [
  {
    name: "Ankur Singh",
    role: "Frontend Lead",
    department: "Website & Experience",
    tag: "UI",
    image: "/developers/ankur.jpg",
    note: "Handles interface polish, responsiveness, and participant-facing flows.",
  },
  {
    name: "Advik",
    role: "Frontend Developer",
    department: "Design Implementation",
    tag: "UX",
    image: "/developers/Advik.jpeg",
    note: "Works on visual sections, page structure, and event UI refinements.",
  },
  {
    name: "Rahul",
    role: "Backend Developer",
    department: "Platform Systems",
    tag: "API",
    image: "/developers/rahul.jpg",
    note: "Supports authentication, teams, registrations, and backend operations.",
  },
];

const crewStats = [
  { value: "03", label: "Core Members" },
  { value: "24/7", label: "Event Support" },
  { value: "IEC", label: "Championship Crew" },
];

export const metadata = {
  title: "IEC Team | IEC Esports",
  description: "Meet the IEC team behind the Inter IIIT Esports Championship.",
};

export default function IecTeamPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <Navbar />

      <section className="relative px-4 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(239,68,68,0.22),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(135deg,#050505_0%,#0d0d10_52%,#020202_100%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="mb-4 h-1 w-16 bg-red-600" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-red-400">
              Behind The Championship
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-none tracking-wide sm:text-7xl lg:text-8xl">
              Meet The IEC Team
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              The people coordinating the website, tournament systems, and event experience for the Inter IIIT Esports Championship.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {crewStats.map((item) => (
              <div key={item.label} className="bg-white/[0.055] p-5">
                <p className="text-3xl font-black text-white">{item.value}</p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 text-slate-950 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-red-600">
                Our Members
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl leading-none tracking-wide sm:text-6xl">
                Core Team
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-600">
              A compact view of the people currently listed for the IEC operations and build team.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <article
                key={member.name}
                className="group relative overflow-hidden bg-black text-white"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-red-600" />
                <div className="absolute right-0 top-0 h-32 w-32 bg-red-600/15 blur-3xl transition duration-500 group-hover:bg-red-600/25" />

                <div className="relative h-80 overflow-hidden bg-slate-950">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <span className="absolute left-4 top-4 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-black">
                    {member.tag}
                  </span>
                  <span className="absolute bottom-4 left-4 bg-red-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-red-300">
                    {member.department}
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-white/55">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-white/62">
                    {member.note}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="h-px flex-1 bg-white/12" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35">
                      IEC Crew
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 bg-white/[0.045] p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-red-400">
              Work Together
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl leading-none tracking-wide sm:text-6xl">
              Keeping The Event Moving
            </h2>
          </div>
          <p className="text-sm leading-7 text-white/65 sm:text-base">
            This team page is ready for more IEC members. Add new photos and names to the member list as the organizing crew grows.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
