const gameCards = [
  {
    src: "/ff/1.png",
    title: "Free Fire",
    subtitle: "Squad battle energy",
  },
  {
    src: "/valo/1.png",
    title: "Valorant",
    subtitle: "Tactical duel focus",
  },
  {
    src: "/bgmi/1.png",
    title: "BGMI",
    subtitle: "Battle royale intensity",
  },
];

const stats = [
  { label: "Titles", value: "3 Major Games" },
  { label: "Teams", value: "30+ IIIT Squads" },
  { label: "Format", value: "Live Finals" },
  { label: "Prize", value: "₹50,000 Pool" },
];

export default function About() {
  return (
    <section id="about" className="relative bg-white py-12 text-slate-900 sm:py-16 overflow-hidden border-b border-black/5">
      
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          
          {/* Left Column (Text & Stats) */}
          <div className="flex flex-col justify-center">
            
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-red-600">
              About the Event
            </p>

            <h2 className="mt-6 max-w-xl text-4xl font-[family-name:var(--font-display)] tracking-wide sm:text-5xl lg:text-6xl text-slate-900 leading-[1.1]">
              The Ultimate 
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">Collegiate Showdown.</span>
            </h2>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-600 font-medium">
              Inter-IIIT Esports brings together the best competitive gamers across India's premier tech institutes. Featuring multiple titles, massive prize pools, and a ruthless tournament bracket designed to crown the undisputed champions.
            </p>

            {/* Stats Grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {stats.map((item) => (
                <div key={item.label} className="border border-black/10 bg-slate-50 p-6 backdrop-blur-sm transition-all hover:border-red-500 hover:bg-white hover:shadow-md">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-600">
                    {item.label}
                  </p>
                  <p className="mt-3 text-lg font-bold text-slate-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/register"
                className="border border-red-600 bg-red-600 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-red-700 hover:border-red-700 shadow-[0_0_15px_rgba(220,38,38,0.2)]"
              >
                Register Now
              </a>
              <a
                href="#timeline"
                className="border border-slate-300 bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
              >
                View Format
              </a>
            </div>
          </div>

          {/* Right Column (Games) */}
          <div className="relative">
            
            {/* Games Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <h3 className="sm:col-span-2 lg:col-span-1 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-2">Featured Titles</h3>
              {gameCards.map((game, index) => (
                <article
                  key={game.title}
                  className="group relative overflow-hidden border border-black/10 transition-all duration-500 hover:border-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:z-10"
                >
                  <div className="relative aspect-[3/1] sm:aspect-[2/1] lg:aspect-[3/1] overflow-hidden">
                    <img
                      src={game.src}
                      alt={game.title}
                      className="absolute inset-0 h-full w-full object-cover object-center  transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                    {/* White gradient overlay for contrast against light text */}
                    <div className="absolute inset-0 " />
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-8">
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-bold text-red-600 opacity-90">
                        0{index + 1}
                      </span>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 tracking-wide">
                          {game.title}
                        </h4>
                        <p className="mt-1 text-xs uppercase tracking-widest text-slate-500 font-semibold">
                          {game.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
