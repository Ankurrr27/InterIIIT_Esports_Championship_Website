"use client";

const logos = [
  "IIIT Nagpur",
  "IIIT Pune",
  "IIIT Lucknow",
  "IIIT Allahabad",
  "IIIT Hyderabad",
  "IIIT Bangalore",
  "IIIT Delhi",
  "IIIT Gwalior",
  "IIIT Jabalpur",
  "IIIT Kancheepuram",
  "IIIT Guwahati",
  "IIIT Vadodara",
];

export default function Campuses() {
  return (
    <section className="bg-slate-950 py-16 border-b border-white/5 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 w-full h-[300px] bg-red-600/5 blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-[family-name:var(--font-display)] tracking-widest text-white uppercase">
            Participating Campuses
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            Over 30+ IIITs battling for the ultimate championship.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {logos.map((label, index) => (
            <div
              key={`${label}-${index}`}
              className="group flex h-24 flex-col items-center justify-center border border-white/5 bg-white/[0.02] px-4 text-center transition-all duration-300 hover:bg-white/10 hover:border-red-500/50 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(220,38,38,0.1)]"
            >
              <div className="h-8 w-8 mb-2 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-red-500/20 group-hover:border-red-500/50 transition-colors">
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-red-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-300 transition-colors group-hover:text-white">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
