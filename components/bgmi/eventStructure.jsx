import React from "react";

export default function EventStructure() {
  const stages = [
    { 
      title: "Intra-IIIT", 
      desc: "Internal college qualifiers", 
      qualify: "Top 2 Teams",
      details: "The initial battleground where all registered squads from the campus compete in a single-elimination or round-robin format. Only the highest-performing 2 teams secure their slot to represent the institute on the grander stage."
    },
    { 
      title: "Group Stage", 
      desc: "3–4 Groups • 4–5 Matches", 
      qualify: "Top 2 / Group",
      details: "Qualified teams are split evenly into 3 to 4 competitive groups. Over a span of 4 to 5 intense matches per group, teams accumulate placement and finish points. The top 2 structural leaders from each group advance forward."
    },
    { 
      title: "Grand Finals", 
      desc: "6–8 Teams • 3 Matches", 
      qualify: "Highest Points",
      details: "The ultimate showdown consisting of the elite 6 to 8 surviving teams. Facing off across 3 high-stakes matches, strategies are tested to the limit. Standing order is determined entirely by overall accumulated points."
    },
    { 
      title: "Champion", 
      desc: "IEC BGMI 2026", 
      qualify: "🏆 Winner",
      details: "The squad that secures the maximum aggregate score at the end of the Grand Finals lifecycle is crowned the undisputed champion of IEC BGMI 2026, taking home the lion's share of glory and rewards."
    },
  ];

  return (
    <section className="bg-black py-12 text-white">
      <div className="mx-auto max-w-7xl px-4">
        
        {/* Compact Header */}
        <div className="mb-8 border-l-2 border-red-600 pl-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">Format Overview</p>
          <h2 className="text-xl font-black uppercase tracking-tight sm:text-2xl">Tournament Structure</h2>
        </div>

        {/* Adaptive Pipeline: Vertical on Mobile, Horizontal on Desktop */}
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-2">
          {stages.map((stage, i) => (
            <div key={stage.title} className="relative flex flex-1 flex-col sm:flex-row lg:flex-col group">
              
              {/* The Card */}
              <div className="relative w-full rounded-lg border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-4 transition-all duration-300 hover:border-red-500/30 hover:from-red-950/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-200 group-hover:text-red-400 transition-colors">
                    {stage.title}
                  </h3>
                  <span className="font-mono text-[10px] font-bold text-white/10 group-hover:text-red-500/30">
                    0{i + 1}
                  </span>
                </div>

                <p className="mt-1 text-xs text-gray-400 sm:max-w-md lg:max-w-none">
                  {stage.desc}
                </p>

                <div className="mt-3 inline-flex items-center rounded bg-red-950/40 border border-red-500/20 px-2 py-0.5 text-[10px] font-bold tracking-wide text-red-400 uppercase">
                  {stage.qualify}
                </div>
              </div>

              {/* Responsive Connecting Line */}
              {i !== stages.length - 1 && (
                <>
                  {/* Vertical Line on Mobile */}
                  <div className="absolute left-6 -bottom-4 h-4 w-[2px] bg-gradient-to-b from-red-500/20 to-transparent lg:hidden" />
                  
                  {/* Horizontal Bar on Desktop */}
                  <div className="hidden absolute top-1/2 -right-1 h-[1px] w-2 bg-white/10 group-hover:bg-red-500/30 lg:block z-10" />
                </>
              )}

            </div>
          ))}
        </div>

        {/* Structural Text Descriptions */}
        <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/5 pt-8 md:grid-cols-2">
          {stages.map((stage, i) => (
            <div key={`desc-${stage.title}`} className="flex gap-3">
              <span className="font-mono text-xs font-bold text-red-500/60 mt-0.5">
                [0{i + 1}]
              </span>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  {stage.title} Phase
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-gray-400">
                  {stage.details}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}