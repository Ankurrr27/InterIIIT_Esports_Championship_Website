import StatCard from "./StatCard";

function StatsSection() {
  const stats = [
    { number: "500+", label: "Participants" },
    { number: "3", label: "Game Titles" },
    { number: "50+", label: "Teams" },
    { number: "Rs 50K+", label: "Prize Pool" },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-16 text-white sm:py-20">
      <div className="absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-red-500 sm:text-xs">
            IEC Championship
          </p>
          <h2 className="text-3xl font-semibold uppercase tracking-tight sm:text-4xl lg:text-5xl">
            Our Impact
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            A growing inter-college esports event built around competition, community, and clean execution.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} number={stat.number} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
