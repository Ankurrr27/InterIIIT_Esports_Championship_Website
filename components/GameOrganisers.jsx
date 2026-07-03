import React from "react";

export default function GameOrganizers({ organizers = [] }) {
  return (
    <section className="bg-black py-10 text-white selection:bg-red-600">
      <div className="mx-auto max-w-7xl px-4">
        
        {/* Compact Minimal Header */}
        <div className="mb-6 flex items-baseline gap-2 border-l-2 border-red-600 pl-2.5">
          <h2 className="text-xl font-black uppercase tracking-tight">Game Organizers</h2>
          <span className="text-[9px] font-bold uppercase tracking-widest text-red-500">// Partners</span>
        </div>

        {/* High-Density Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {organizers.map((org, index) => (
            <div
              key={index}
              className="group flex flex-col justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3 transition-all duration-200 hover:border-red-500/20"
            >
              <div>
                {/* Meta Top Bar */}
                <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
                  <div className="flex items-center gap-1 rounded bg-black/40 p-1 border border-white/5">
                    <img src="/logos/IIITians-Network-Logo-Dark.png" alt="" className="h-20 w-20 rounded-sm bg-white object-contain p-0.5" />
                    <span className="text-sm font-bold text-white">×</span>
                    <img src={org.clubLogo} alt="" className="h-20 w-20 rounded-sm bg-white object-contain p-0.5" />
                  </div>
                  <span className="rounded bg-red-950/40 border border-red-500/20 px-1.5 py-0.5 text-[9px] font-black uppercase text-red-400">
                    {org.game}
                  </span>
                </div>

                {/* Core Profile Row */}
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={org.personImage}
                    alt={org.leader}
                    className="h-30 w-30 shrink-0 rounded border border-white/10 object-cover filter group-hover:grayscale-0 transition-all duration-200"
                  />
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-200 group-hover:text-red-400 transition-colors">
                      {org.leader}
                    </h3>
                    <p className="text-[10px] font-mono text-white uppercase">{org.role}</p>
                  </div>
                </div>

                {/* Micro Description */}
                <p className="mt-2.5 text-[11px] leading-relaxed text-gray-400 line-clamp-3">
                  {org.description}
                </p>
              </div>

              {/* Minimalist Footing info */}
              <div className="mt-3 flex items-center justify-between text-[10px] text-gray-500 border-t border-white/5 pt-2">
                <span className="font-medium truncate max-w-[120px] text-gray-400">{org.club}</span>
                <span className="font-mono text-[9px] shrink-0">{org.college}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}