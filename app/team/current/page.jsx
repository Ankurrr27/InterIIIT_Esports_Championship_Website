import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Users, Crosshair, Shield, Activity, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Team Synergy - IEC Esports",
  description: "Team profile and roster for Inter IIIT Esports Championship",
};

const teamData = {
  name: "Team Synergy",
  college: "IIIT Nagpur",
  logo: "/logos/synergy.png",
  joined: "June 2026",
  captain: "Ankur",
  roster: [
    { name: "Ankur", ign: "SYN_Ankur", role: "IGL / Flex", main: "Valorant" },
    { name: "Rahul", ign: "SYN_Rahul", role: "Entry Fragger", main: "Valorant" },
    { name: "Advik", ign: "SYN_Advik", role: "Controller", main: "Valorant" },
    { name: "Kunal", ign: "SYN_Kunal", role: "Sniper / Support", main: "Valorant" },
    { name: "Rishabh", ign: "SYN_Rishabh", role: "Rusher", main: "Valorant" },
  ],
  game: { title: "Valorant", status: "Registered", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
  matches: [
    { date: "July 25, 2026", opponent: "IIIT Kota Clutchers", game: "Valorant", result: "Upcoming", score: "-" },
    { date: "July 22, 2026", opponent: "IIIT Kalyani Sports", game: "BGMI", result: "Won", score: "2-1" },
    { date: "July 18, 2026", opponent: "IIIT Una Esports", game: "Valorant", result: "Won", score: "13-8" },
  ]
};

export default function CurrentTeamPage() {
  return (
    <main className="overflow-x-hidden bg-slate-950 text-white min-h-screen">
      <Navbar />

      {/* ── Hero Section (Grunge Aesthetic) ── */}
      <section className="relative overflow-hidden bg-black pt-16 pb-12 sm:pt-24 sm:pb-16 border-b border-white/10">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />

        {/* Diagonal splatter wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(220,38,38,0.02) 30%, transparent 50%),
              linear-gradient(-45deg, rgba(180,30,30,0.08) 0%, transparent 40%)
            `,
          }}
        />

        {/* Diagonal accent stripes */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,0.015) 40px,
              rgba(255,255,255,0.015) 42px
            )`,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-end gap-6 sm:gap-8">
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl border-2 border-white/10 bg-slate-900 sm:h-40 sm:w-40 shadow-2xl">
              <Image
                src={teamData.logo}
                alt={teamData.name}
                fill
                className="object-cover p-2"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="flex flex-col justify-end">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500">
                {teamData.college}
              </p>
              <h1 className="mt-2 text-5xl font-[family-name:var(--font-display)] tracking-wide text-white sm:text-7xl">
                {teamData.name}
              </h1>
              <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
                <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Verified Roster
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">
                  Joined {teamData.joined}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Dashboard ── */}
      <section className="relative bg-[#020617] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            
            {/* Left Column (Roster) */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Roster Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Active Roster</h2>
                    <p className="text-sm text-slate-400 mt-1">Official lineup for upcoming tournaments.</p>
                  </div>
                  <Users className="text-slate-600 opacity-50" size={32} />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {teamData.roster.map((player, idx) => (
                    <div key={idx} className="group relative overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:border-red-500/30 hover:bg-white/[0.04]">
                      <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity duration-300 group-hover:opacity-30">
                        {player.role.includes("IGL") ? <Shield size={40} /> : <Crosshair size={40} />}
                      </div>
                      
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-500">
                        {player.main}
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-white group-hover:text-red-100 transition-colors">
                        {player.ign}
                      </h3>
                      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                        <p className="text-sm text-slate-400">{player.name}</p>
                        <span className="rounded bg-black/50 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-300">
                          {player.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Match History */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Recent Matches</h2>
                    <p className="text-sm text-slate-400 mt-1">Performance in qualifiers and leagues.</p>
                  </div>
                  <Activity className="text-slate-600 opacity-50" size={32} />
                </div>

                <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
                  <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-black/40 text-xs uppercase text-slate-500">
                      <tr>
                        <th className="px-6 py-4 font-semibold tracking-wider">Opponent</th>
                        <th className="px-6 py-4 font-semibold tracking-wider">Game</th>
                        <th className="px-6 py-4 font-semibold tracking-wider hidden sm:table-cell">Date</th>
                        <th className="px-6 py-4 font-semibold tracking-wider text-right">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {teamData.matches.map((match, idx) => (
                        <tr key={idx} className="transition-colors hover:bg-white/[0.02]">
                          <td className="px-6 py-4 font-medium text-white">{match.opponent}</td>
                          <td className="px-6 py-4 text-slate-300">{match.game}</td>
                          <td className="px-6 py-4 text-slate-500 hidden sm:table-cell">{match.date}</td>
                          <td className="px-6 py-4 text-right whitespace-nowrap">
                            {match.result === "Won" ? (
                              <span className="font-semibold text-emerald-400">{match.score} (W)</span>
                            ) : match.result === "Upcoming" ? (
                              <span className="font-semibold text-slate-400">Upcoming</span>
                            ) : (
                              <span className="font-semibold text-red-400">{match.score} (L)</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-6">
              <div className="rounded-xl border border-white/10 bg-black/40 p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-6">
                  Registered Event
                </h3>
                
                <div className="space-y-4">
                  <div className={`flex flex-col justify-center rounded-lg border p-4 ${teamData.game.border} ${teamData.game.bg}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{teamData.game.title}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${teamData.game.color}`}>
                        {teamData.game.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button className="mt-6 w-full rounded-lg bg-red-600/10 border border-red-500/20 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-red-400 transition hover:bg-red-600/20 hover:border-red-500/40">
                  Manage Roster
                </button>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">
                  Team Captain
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white shadow-lg shadow-red-600/20">
                    {teamData.captain.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{teamData.captain}</p>
                    <p className="text-xs text-slate-400">Primary Contact</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}