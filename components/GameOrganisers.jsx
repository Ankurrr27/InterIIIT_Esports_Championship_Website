import Image from "next/image";

const themes = {
  amber: {
    label: "text-amber-300",
    panel: "from-amber-500/16 via-zinc-950 to-black",
    ring: "ring-amber-400/35",
    chip: "bg-amber-300 text-black",
    soft: "bg-amber-400/10 text-amber-100",
    line: "bg-amber-400",
    glow: "shadow-[0_0_70px_rgba(251,191,36,0.16)]",
  },
  red: {
    label: "text-red-300",
    panel: "from-red-600/18 via-zinc-950 to-black",
    ring: "ring-red-500/35",
    chip: "bg-red-500 text-white",
    soft: "bg-red-500/10 text-red-100",
    line: "bg-red-500",
    glow: "shadow-[0_0_70px_rgba(239,68,68,0.16)]",
  },
  blue: {
    label: "text-sky-300",
    panel: "from-sky-500/18 via-zinc-950 to-black",
    ring: "ring-sky-400/35",
    chip: "bg-sky-400 text-black",
    soft: "bg-sky-400/10 text-sky-100",
    line: "bg-sky-400",
    glow: "shadow-[0_0_70px_rgba(56,189,248,0.16)]",
  },
};

export default function GameOrganizers({ organizers = [], theme = "red" }) {
  const colors = themes[theme] || themes.red;

  return (
    <section className="relative overflow-hidden bg-black py-12 text-white sm:py-16">
      <div className={`absolute inset-x-0 top-0 h-px ${colors.line} opacity-50`} />
      <div className="absolute left-1/2 top-0 h-72 w-[70vw] -translate-x-1/2 bg-white/[0.035] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`text-[10px] font-semibold uppercase tracking-[0.45em] ${colors.label}`}>
              Partner Network
            </p>
            <h2 className="mt-2 text-3xl font-[family-name:var(--font-display)] leading-none tracking-wide sm:text-5xl">
              Game Organizers
            </h2>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
            Event operations crew
          </span>
        </div>

        <div className="grid gap-5">
          {organizers.map((org, index) => {
            const clubLogo = org.clubLogo || org.logo || "/logos/iiitians-network.png";
            const networkLogo = org.networkLogo || "/logos/iiitians-network.png";

            return (
              <article
                key={index}
                className={`group relative overflow-hidden bg-gradient-to-br ${colors.panel} p-4 ring-1 ring-white/10 transition duration-300 hover:ring-white/20 sm:p-6 lg:p-7 ${colors.glow}`}
              >
                <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_38%)] opacity-70" />
                <div className="absolute bottom-0 left-0 h-1 w-full bg-white/10">
                  <div className={`h-full w-2/5 ${colors.line}`} />
                </div>

                <div className="relative grid gap-6 lg:grid-cols-[280px_1fr_260px] lg:items-stretch">
                  <div className="relative min-h-[250px] overflow-hidden bg-zinc-950 ring-1 ring-white/10 sm:min-h-[300px] lg:min-h-[340px]">
                    <Image
                      src={org.personImage}
                      alt={org.leader}
                      fill
                      sizes="(min-width: 1024px) 280px, 100vw"
                      className="object-cover object-top grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                      <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] ${colors.chip}`}>
                        {org.game || "Partner"}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-col justify-center py-1 lg:py-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="relative h-11 w-24 bg-white p-2 ring-1 ring-white/10">
                        <Image
                          src={networkLogo}
                          alt="IIITians Network logo"
                          fill
                          sizes="96px"
                          className="object-contain p-2"
                        />
                      </div>
                      <span className="text-xs font-black uppercase tracking-[0.26em] text-white/35">x</span>
                      <div className="relative h-11 w-24 bg-white p-2 ring-1 ring-white/10">
                        <Image
                          src={clubLogo}
                          alt={`${org.club || "Club"} logo`}
                          fill
                          sizes="96px"
                          className="object-contain p-2"
                        />
                      </div>
                    </div>

                    <h3 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-5xl">
                      {org.leader}
                    </h3>
                    <p className={`mt-3 inline-flex w-fit px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] ${colors.soft}`}>
                      {org.role}
                    </p>
                    {org.description ? (
                      <p className="mt-5 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
                        {org.description}
                      </p>
                    ) : null}
                  </div>

                  <aside className="flex flex-col justify-between gap-5 bg-black/30 p-4 ring-1 ring-white/10 lg:p-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
                        Responsible For
                      </p>
                      <div className="mt-4 grid gap-2 text-sm font-semibold text-white/80">
                        <span>Match rooms</span>
                        <span>Roster checks</span>
                        <span>Player coordination</span>
                        <span>Dispute support</span>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
                        Affiliation
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
                          {org.club}
                        </span>
                        <span className="bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
                          {org.college}
                        </span>
                      </div>
                    </div>
                  </aside>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
