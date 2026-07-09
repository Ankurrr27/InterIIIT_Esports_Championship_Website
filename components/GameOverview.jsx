const themes = {
  amber: {
    accent: "text-amber-300",
    soft: "bg-amber-400/10 text-amber-100",
    bar: "bg-amber-400",
    wash: "bg-amber-400/10",
  },
  red: {
    accent: "text-red-300",
    soft: "bg-red-500/10 text-red-100",
    bar: "bg-red-500",
    wash: "bg-red-500/10",
  },
  blue: {
    accent: "text-sky-300",
    soft: "bg-sky-400/10 text-sky-100",
    bar: "bg-sky-400",
    wash: "bg-sky-400/10",
  },
};

export default function GameOverview({
  eyebrow,
  title,
  description,
  stats = [],
  highlights = [],
  steps = [],
  theme = "red",
}) {
  const colors = themes[theme] || themes.red;

  return (
    <section className="relative overflow-hidden bg-black py-12 text-white sm:py-16">
      <div className={`absolute right-[-10%] top-[-20%] h-80 w-80 rounded-full ${colors.wash} blur-3xl`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,0.055),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <div className={`mb-4 h-1 w-16 ${colors.bar}`} />
            <p className={`text-[10px] font-semibold uppercase tracking-[0.45em] ${colors.accent}`}>
              {eyebrow}
            </p>
            <h2 className="mt-2 max-w-xl text-3xl font-[family-name:var(--font-display)] leading-none tracking-wide text-white sm:text-5xl">
              {title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <article key={stat.label} className="bg-white/[0.045] p-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-white/35">
                  {stat.label}
                </p>
                <p className={`mt-2 text-2xl font-black ${colors.accent}`}>
                  {stat.value}
                </p>
                <p className="mt-2 text-[11px] leading-5 text-white/52">
                  {stat.note}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="relative overflow-hidden bg-white/[0.04] p-5 sm:p-6">
            <div className={`absolute left-0 top-0 h-full w-1 ${colors.bar}`} />
            <div className="flex flex-col gap-2 pl-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.36em] ${colors.accent}`}>
                  Format Focus
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  What decides the game
                </h3>
              </div>
              <span className={`w-fit px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${colors.soft}`}>
                Match DNA
              </span>
            </div>

            <div className="mt-5 grid gap-2 pl-3 sm:grid-cols-2">
              {highlights.map((item, index) => (
                <div key={item} className="bg-black/45 p-4">
                  <span className={`text-[10px] font-bold ${colors.accent}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-sm leading-7 text-white/72">{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="bg-white/[0.04] p-5 sm:p-6">
            <p className={`text-[10px] font-semibold uppercase tracking-[0.36em] ${colors.accent}`}>
              Match Path
            </p>
            <div className="mt-5 space-y-4">
              {steps.map((step, index) => (
                <div key={step} className="grid grid-cols-[42px_1fr] gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center ${colors.soft} text-[11px] font-black`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-2 text-sm leading-6 text-white/75">{step}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
