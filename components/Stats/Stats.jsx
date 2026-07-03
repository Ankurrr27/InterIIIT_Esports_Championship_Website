import StatCard from "./StatCard";

function StatsSection() {
  const stats = [
    { number: "500+", label: "Participants" },
    { number: "3", label: "Game Titles" },
    { number: "50+", label: "Teams" },
    { number: "₹50K+", label: "Prize Pool" },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-24 text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-red-500">
            IEC Championship
          </p>

          <h2 className="text-4xl font-black uppercase md:text-6xl">
            OUR IMPACT
          </h2>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-red-500"></div>

          <p className="mx-auto mt-7 max-w-2xl text-lg text-gray-400">
            Building one of India's fastest-growing inter-college esports
            communities through competitive gaming and unforgettable events.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;