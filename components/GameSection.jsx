import GameCard from "./GameCard";

function GameSection() {
  return (
    <section className="w-full py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-5xl font-extrabold uppercase tracking-wider">
            Featured tournaments
          </h2>

          <div className="w-28 h-1 bg-red-500 rounded-full mx-auto mt-5"></div>

          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the main esports titles and register your college team for the next match.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
          <GameCard
            image="/FFCard.png"
            title="Free Fire"
            description="Drop into fast-paced battles and fight your way to victory with your squad."
          />

          <GameCard
            image="/ValoCard.png"
            title="Valorant"
            description="Outplay your opponents with teamwork, precision, and tactical gameplay."
          />

          <GameCard
            image="/BGMICard.png"
            title="BGMI"
            description="Survive intense battle royale matches and dominate the competition."
          />

        </div>

      </div>
    </section>
  );
}

export default GameSection;