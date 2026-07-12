import Image from "next/image";

const themes = {
  amber: {
    border: "border-amber-500",
    accent: "text-amber-600",
    glow: "from-amber-100",
    chip: "bg-amber-100 text-amber-700",
    bar: "bg-amber-500",
  },
  red: {
    border: "border-red-600",
    accent: "text-red-600",
    glow: "from-red-50",
    chip: "bg-red-50 text-red-700",
    bar: "bg-red-600",
  },
  blue: {
    border: "border-sky-500",
    accent: "text-sky-600",
    glow: "from-sky-50",
    chip: "bg-sky-50 text-sky-700",
    bar: "bg-sky-500",
  },
};

export default function GameMapSection({
  eyebrow,
  title,
  description,
  maps = [],
  theme = "red",
}) {
  const colors = themes[theme] || themes.red;
  const [featuredMap, ...supportMaps] = maps;

  if (!featuredMap) return null;

  return (
    <section className="relative overflow-hidden bg-white py-12 text-slate-950 sm:py-16">
      <div className={`absolute inset-x-0 top-0 h-44 bg-gradient-to-b ${colors.glow} to-transparent`} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className={`max-w-2xl border-l pl-4 ${colors.border}`}>
            <p className={`text-[10px] font-semibold uppercase tracking-[0.45em] ${colors.accent}`}>
              {eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-[family-name:var(--font-display)] leading-none tracking-wide text-slate-950 sm:text-5xl">
              {title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {description}
            </p>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">
            Route / Control / Finish
          </span>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="group relative min-h-[360px] overflow-hidden bg-slate-100 sm:min-h-[430px]">
            <Image
              src={featuredMap.image}
              alt={featuredMap.title}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.035]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/5" />
            <div className={`absolute bottom-0 left-0 h-1.5 ${colors.bar}`} style={{ width: featuredMap.progress || "70%" }} />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] ${colors.chip}`}>
                  {featuredMap.badge}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50">
                  Featured route
                </span>
              </div>
              <h3 className="mt-4 text-3xl font-[family-name:var(--font-display)] leading-none tracking-wide sm:text-5xl">
                {featuredMap.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                {featuredMap.description}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.24em] text-white/45">
                <span>Map Focus</span>
                <span>{featuredMap.focus}</span>
              </div>
            </div>
          </article>

          <div className="grid gap-4">
            {supportMaps.map((map, index) => (
              <article key={map.title} className="group grid grid-cols-[118px_1fr] overflow-hidden bg-slate-100 transition hover:bg-slate-50 sm:grid-cols-[170px_1fr] lg:grid-cols-1">
                <div className="relative min-h-36 overflow-hidden bg-slate-900 lg:aspect-[16/8]">
                  <Image
                    src={map.image}
                    alt={map.title}
                    fill
                    sizes="(min-width: 1024px) 32vw, 45vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="absolute left-3 top-3 text-[10px] font-black text-white/60">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em] ${colors.chip}`}>
                      {map.badge}
                    </span>
                    <span className={`text-[9px] font-semibold uppercase tracking-[0.2em] ${colors.accent}`}>
                      {map.focus}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-950">
                    {map.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
                    {map.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
