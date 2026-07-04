import GameCard from "./GameCard";

const tournaments = [
  {
    title: "Free Fire",
    image: "/ff/FFCard.png",
    description:
      "Fast-paced squad battles built for quick decisions, clean rotations, and sharp execution.",
    accent: "from-rose-500/20 to-transparent",
    tag: "Squad Battle",
  },
  {
    title: "Valorant",
    image: "/valo/ValoCard.png",
    description:
      "Tactical team play, disciplined aim, and coordinated rounds from start to finish.",
    accent: "from-cyan-500/20 to-transparent",
    tag: "Tactical FPS",
  },
  {
    title: "BGMI",
    image: "/bgmi/BGMICard.png",
    description:
      "Battle royale matches where survival, positioning, and timing decide the winner.",
    accent: "from-amber-500/20 to-transparent",
    tag: "Battle Royale",
  },
];

function GameSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute left-1/2 top-8 h-64 w-64 -translate-x-1/2 rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-red-400 sm:text-xs">
            Featured Tournaments
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Game Titles
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Register your college team for the main esports titles in the event.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tournaments.map((game) => (
            <GameCard
              key={game.title}
              title={game.title}
              image={game.image}
              description={game.description}
              accent={game.accent}
              tag={game.tag}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GameSection;
