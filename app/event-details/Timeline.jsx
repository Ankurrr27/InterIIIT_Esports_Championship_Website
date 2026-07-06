const timeline = [
  {
    date: "10 July 2026",
    title: "Registration Opens",
    description: "Team registrations begin for all esports titles.",
    status: "active",
  },
  {
    date: "20 July 2026",
    title: "Registration Closes",
    description: "Last day to register your team before the deadline.",
    status: "upcoming",
  },
  {
    date: "25 July 2026",
    title: "Qualifiers",
    description: "Battle through the qualifiers to secure your place.",
    status: "upcoming",
  },
  {
    date: "27 July 2026",
    title: "Semi Finals",
    description: "Top teams compete for a spot in the Grand Finals.",
    status: "upcoming",
  },
  {
    date: "30 July 2026",
    title: "Grand Finals",
    description: "The ultimate showdown to crown the champions.",
    status: "upcoming",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="bg-white py-22 text-slate-900 sm:py-16 relative overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-1/3 h-full bg-red-600/5 blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-red-600">
            Format Overview
          </p>
          <h2 className="mt-4 text-4xl font-[family-name:var(--font-display)] tracking-wide sm:text-5xl lg:text-6xl text-slate-900">
            Tournament Structure
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-600 font-medium">
            The path to glory. Follow the timeline from registration to the Grand Finals to ensure your squad is ready for battle.
          </p>
        </div>

        {/* Timeline Desktop/Tablet Layout */}
        <div className="mt-10 hidden md:block">
          <div className="relative grid grid-cols-5 gap-4">
            
            {/* Connecting Line */}
            <div className="absolute top-8 left-1/10 right-1/10 h-0.5 bg-black/10 -z-10" />
            
            {/* Active Line (Red) */}
            <div className="absolute top-8 left-1/10 w-1/5 h-0.5 bg-red-600 -z-10 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />

            {timeline.map((item, index) => {
              const isActive = item.status === "active";
              return (
                <article key={item.title} className="relative group">
                  
                  {/* Timeline Dot */}
                  <div className="flex justify-center mb-6">
                    <div className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${
                      isActive 
                        ? "bg-red-600 border-red-600 shadow-[0_0_10px_rgba(220,38,38,0.6)] scale-125" 
                        : "bg-white border-black/20 group-hover:border-red-500 group-hover:bg-red-500/10"
                    }`} />
                  </div>

                  {/* Content Card */}
                  <div className={`border p-6 transition-all duration-300 h-full flex flex-col rounded-none ${
                    isActive
                      ? "border-red-500 bg-red-50 shadow-[0_4px_20px_rgba(220,38,38,0.1)]"
                      : "border-black/10 bg-slate-50 hover:bg-slate-100 hover:border-black/20"
                  }`}>
                    
                    <div className="flex items-center justify-between gap-2 border-b border-black/10 pb-4 mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-red-600">
                        Phase 0{index + 1}
                      </p>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {item.date}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 tracking-wide">
                      {item.title}
                    </h3>
                    
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>

                </article>
              );
            })}
          </div>
        </div>

        {/* Timeline Mobile Layout */}
        <div className="mt-8 block md:hidden space-y-6 relative">
          
          {/* Vertical Connecting Line */}
          <div className="absolute left-3.5 top-8 bottom-8 w-0.5 bg-black/10" />
          <div className="absolute left-3.5 top-8 h-32 w-0.5 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />

          {timeline.map((item, index) => {
            const isActive = item.status === "active";
            return (
              <article key={item.title} className="relative flex gap-6">
                
                {/* Timeline Dot */}
                <div className="relative z-10 flex-shrink-0 pt-6">
                  <div className={`h-7 w-7 rounded-full border flex items-center justify-center ${
                    isActive 
                      ? "bg-red-600 border-red-600 shadow-[0_0_10px_rgba(220,38,38,0.6)]" 
                      : "bg-white border-black/20"
                  }`}>
                    <div className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-white" : "bg-black/20"}`} />
                  </div>
                </div>

                {/* Content Card */}
                <div className={`flex-1 border p-6 transition-all duration-300 rounded-none ${
                  isActive
                    ? "border-red-500 bg-red-50 shadow-[0_4px_20px_rgba(220,38,38,0.1)]"
                    : "border-black/10 bg-slate-50"
                }`}>
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 pb-3 mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-red-600">
                      Phase 0{index + 1}
                    </p>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-wide">
                    {item.title}
                  </h3>
                  
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>

              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
