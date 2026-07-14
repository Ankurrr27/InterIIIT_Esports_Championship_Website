import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import TeamClientWrapper from "./components/TeamClientWrapper";

const stats = [
  { label: "Team Modes", value: "03", detail: "BGMI, Valorant, Free Fire" },
  { label: "Roster Lock", value: "1", detail: "One verified squad per player" },
  { label: "Support", value: "Live", detail: "Help for invites and team issues" },
];

const steps = [
  {
    number: "01",
    title: "Create or Join",
    copy: "Captains can create squads while players can enter invite codes to join their team.",
  },
  {
    number: "02",
    title: "Verify Roster",
    copy: "Keep names, college details, and game choice clean before the bracket is locked.",
  },
  {
    number: "03",
    title: "Compete Together",
    copy: "Use the team dashboard to track members and stay ready for match-day instructions.",
  },
];

export const metadata = {
  title: "Teams | IEC Esports",
  description: "Create, join, and manage your IEC esports squad.",
};

export default function UserTeamPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      <TeamClientWrapper>
      <section className="relative overflow-hidden px-4 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(239,68,68,0.24),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_26%),linear-gradient(135deg,#050505_0%,#0d0d10_48%,#020202_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:54px_54px]" />
        <div className="absolute bottom-0 left-0 h-1 w-full bg-white/10">
          <div className="h-full w-1/3 bg-red-600" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-red-400">
              Squad Control
            </p>
            <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-display)] text-5xl leading-none tracking-wide sm:text-7xl lg:text-8xl">
              Build Your Team Before The Lobby Opens
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              Create a squad, join your captain, verify your roster, and keep your team ready for the Inter IIIT Esports Championship.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#team-actions"
                className="bg-red-600 px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-red-500"
              >
                Manage Team
              </a>
              <a
                href="/support"
                className="bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-slate-200"
              >
                Need Help
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((item) => (
              <div key={item.label} className="bg-white/[0.06] p-5 ring-1 ring-white/10 backdrop-blur">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
                  {item.label}
                </p>
                <p className="mt-2 text-4xl font-black text-white">{item.value}</p>
                <p className="mt-2 text-xs leading-5 text-white/55">{item.detail}</p>
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
                Team Flow
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl leading-none tracking-wide sm:text-6xl">
                From Invite To Match Day
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-600">
              Keep the process simple: form the roster, verify the players, then focus on performance.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.number} className="bg-slate-100 p-5 sm:p-6">
                <span className="text-4xl font-black text-red-600">{step.number}</span>
                <h3 className="mt-4 text-xl font-black text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      </TeamClientWrapper>

      <Footer />
    </main>
  );
}
