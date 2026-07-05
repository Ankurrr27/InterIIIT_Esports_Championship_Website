const themes = {
  amber: {
    accent: "text-amber-300",
    border: "border-amber-400/40",
    fill: "bg-amber-400",
    soft: "bg-amber-400/10",
  },
  red: {
    accent: "text-red-300",
    border: "border-red-500/40",
    fill: "bg-red-500",
    soft: "bg-red-500/10",
  },
  blue: {
    accent: "text-sky-300",
    border: "border-sky-400/40",
    fill: "bg-sky-400",
    soft: "bg-sky-400/10",
  },
};

export default function GameMatchIntel({
  title = "Match Intel",
  description = "Key information teams need before match day.",
  overviewStats = [],
  prizeSplit = [],
  eventFlow = [],
  theme = "red",
}) {
  const colors = themes[theme] || themes.red;

  return (
    <section className="bg-black py-14 text-white sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className={`rounded-lg border ${colors.border} bg-white/[0.035] p-5 sm:p-6`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${colors.accent}`}>
              Game Dashboard
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base">
              {description}
            </p>

            <div className="mt-6 grid gap-3">
              {eventFlow.map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/35 px-4 py-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${colors.soft} text-xs font-bold ${colors.accent}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-white/85">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-3">
              {overviewStats.map((item) => (
                <article key={item.label} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">{item.label}</p>
                  <p className="mt-2 text-2xl font-black text-white">{item.value}</p>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className={`h-full rounded-full ${colors.fill}`} style={{ width: `${item.percent}%` }} />
                  </div>
                </article>
              ))}
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4 sm:p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${colors.accent}`}>Rewards Split</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Prize distribution focus</h3>
                </div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/35">Subject to final rulebook</p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {prizeSplit.map((item) => (
                  <div key={item.label} className="rounded-lg border border-white/10 bg-black/30 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-medium text-white/70">{item.label}</p>
                      <span className={`text-sm font-bold ${colors.accent}`}>{item.value}</span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className={`h-full rounded-full ${colors.fill}`} style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}