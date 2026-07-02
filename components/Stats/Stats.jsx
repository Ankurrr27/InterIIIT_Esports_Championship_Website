import StatCard from "./StatCard";

function StatsSection() {
  return (
    <section className="w-full py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-5xl font-extrabold uppercase tracking-wider">
            Our Impact
          </h2>

          <div className="w-28 h-1 bg-red-500 rounded-full mx-auto mt-5"></div>

          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
            Numbers that showcase the scale of our esports community and
            competitive tournaments.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <StatCard number="500+" label="Participants" />
          <StatCard number="3" label="Game Titles" />
          <StatCard number="50+" label="Teams" />
          <StatCard number="₹50K+" label="Prize Pool" />
        </div>
      </div>
    </section>
  );
}

export default StatsSection;