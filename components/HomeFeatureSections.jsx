import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Flag, RadioTower, ShieldCheck, Swords, Trophy, Users } from "lucide-react";

const featureCards = [
  {
    icon: Swords,
    title: "Intra IIIT Battles",
    copy: "Every roster represents its IIIT, keeping the competition sharp, fair, and easy to follow.",
  },
  {
    icon: RadioTower,
    title: "Inter IIIT",
    copy: "Schedules, lobby updates, disputes, and announcements stay coordinated through one tournament flow.",
  },
  {
    icon: ShieldCheck,
    title: "Grand Finale",
    copy: "College email checks and team rules keep registrations clean before fixtures go live.",
  },
];

const stages = [
  { label: "Register", value: "01", detail: "Create your team and lock the game title." },
  { label: "Verify", value: "02", detail: "Admins confirm rosters and college eligibility." },
  { label: "Qualify", value: "03", detail: "Fight through opening brackets and lobbies." },
  { label: "Finals", value: "04", detail: "Top squads play for trophies and prize money." },
];

const matchStats = [
  { icon: Users, label: "Expected teams", value: "50+" },
  { icon: Trophy, label: "Prize pool", value: "50K+" },
  { icon: CalendarDays, label: "Final week", value: "August" },
  { icon: Flag, label: "Game titles", value: "3" },
];

export default function HomeFeatureSections() {
  return (
    <section className="bg-[#050505] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <div className="relative min-h-[460px] overflow-hidden rounded-lg border border-white/10 bg-black">
            <Image
              src="/pan.jpg"
              alt="IEC tournament games lineup"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              {/* <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-400">Tournament Hub</p> */}
              
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {matchStats.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="rounded-sm  border-white/10 p-3 ">
                      {/* <Icon size={17} className="text-red-500" /> */}
                      <p className="mt-3 text-lg font-black text-white">{item.value}</p>
                      <p className="mt-1 text-[10px] uppercase  text-white/45">{item.label}</p>
                    </div>
                  );
                })}
              </div>
              {/* <h2 className="mt-3 max-w-lg text-xl font-black leading-tight text-white sm:text-2xl">
                One championship across BGMI, Valorant, and Free Fire.
              </h2> */}
            </div>
          </div>

          <div className="grid content-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">Built for competition</p>
              <h2 className="mt-3 text-4xl font-[family-name:var(--font-display)] leading-none tracking-wide text-white sm:text-5xl">
                Event Architecture
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                IEC now reads like a complete event system: verified teams, game-specific formats, match-day coordination, and a clear route from sign-up to finals.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {featureCards.map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                    {/* <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 text-red-400">
                      <Icon size={19} />
                    </div> */}
                    <h3 className="mt-4 text-sm font-semibold   text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{item.copy}</p>
                  </article>
                );
              })}
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4 sm:p-5">
              <div className="grid gap-3 sm:grid-cols-4">
                {stages.map((stage) => (
                  <div key={stage.label} className="border-l border-white/10 pl-4">
                    <p className="text-2xl font-black text-red-500">{stage.value}</p>
                    <h3 className="mt-2 text-sm font-semibold text-white">{stage.label}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-400">{stage.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/register" className="rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white">
                Register Team
              </Link>
              <Link href="/event-details" className="rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white">
                View Event
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}