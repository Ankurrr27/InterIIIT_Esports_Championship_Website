import StatCard from "./StatCard";

function StatsSection() {
  const stats = [
    { number: "500+", label: "Participants" },
    { number: "3", label: "Game Titles" },
    { number: "50+", label: "Teams" },
    { number: "₹50K+", label: "Prize Pool" },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-10 lg:py-12 text-white">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[250px] w-[250px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[100px]" />
      <div className="absolute right-0 bottom-0 h-[150px] w-[150px] rounded-full bg-red-500/5 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <h2 className="text-xl sm:text-2xl font-black md:text-3xl">
            Tournament by Numbers
          </h2>

          <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut nemo
            consequuntur laudantium deleniti dolorum tenetur vel totam dolore
            animi aspernatur?
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
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