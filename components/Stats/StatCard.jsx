function StatCard({ number, label }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:border-red-500/40 hover:bg-white/[0.06] sm:p-6">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-red-500 via-red-400 to-transparent opacity-80" />
      <h2 className="relative text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {number}
      </h2>
      <p className="relative mt-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400 sm:text-xs">
        {label}
      </p>
    </div>
  );
}

export default StatCard;
