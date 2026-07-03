function StatCard({ number, label }) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-md
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-red-500/60
        hover:shadow-[0_0_35px_rgba(239,68,68,0.25)]
      "
    >
      {/* Top Accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-transparent"></div>

      {/* Background Glow */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-red-500/10 blur-3xl transition-all duration-300 group-hover:bg-red-500/20"></div>

      <h2 className="relative text-5xl font-extrabold tracking-tight text-white">
        {number}
      </h2>

      <p className="relative mt-3 uppercase tracking-[0.25em] text-sm text-gray-400">
        {label}
      </p>
    </div>
  );
}

export default StatCard;