export default function DeveloperCard({ image, name, role, quote }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition duration-300 hover:border-red-500/40 hover:bg-white/[0.06]">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-72"
        />
      </div>

      <div className="space-y-3 p-5 text-center sm:p-6">
        <div>
          <h3 className="text-xl font-semibold text-white">
            {name}
          </h3>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-400">
            {role}
          </p>
        </div>

        <p className="text-sm leading-7 text-slate-400">
          {quote}
        </p>
      </div>
    </div>
  );
}
