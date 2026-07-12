const themes = {
  amber: {
    label: "text-amber-600",
    line: "border-amber-500",
    rank: "text-amber-600",
    row: "hover:bg-amber-50",
    bar: "bg-amber-500",
  },
  red: {
    label: "text-red-600",
    line: "border-red-600",
    rank: "text-red-600",
    row: "hover:bg-red-50",
    bar: "bg-red-600",
  },
  blue: {
    label: "text-sky-600",
    line: "border-sky-500",
    rank: "text-sky-600",
    row: "hover:bg-sky-50",
    bar: "bg-sky-500",
  },
};

export default function GameLeaderboard({ title = "Leaderboard", rows = [], theme = "red" }) {
  const colors = themes[theme] || themes.red;
  const fallbackRows = [
    { rank: "01", team: "To be announced", played: "-", points: "-" },
    { rank: "02", team: "To be announced", played: "-", points: "-" },
    { rank: "03", team: "To be announced", played: "-", points: "-" },
    { rank: "04", team: "To be announced", played: "-", points: "-" },
  ];

  const items = rows.length ? rows : fallbackRows;

  return (
    <section className="bg-white py-12 text-slate-950 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`mb-6 flex flex-col gap-3 border-l pl-4 ${colors.line} sm:flex-row sm:items-end sm:justify-between`}>
          <div>
            <p className={`text-[10px] font-semibold uppercase tracking-[0.45em] ${colors.label}`}>
              Standings
            </p>
            <h2 className="mt-2 text-3xl font-[family-name:var(--font-display)] leading-none tracking-wide sm:text-5xl">
              {title}
            </h2>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">
            Updates after matches
          </span>
        </div>

        <div className="overflow-hidden bg-slate-100">
          <div className="grid grid-cols-[58px_1fr_56px_62px] border-b border-black/10 px-3 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:grid-cols-[72px_1fr_92px_92px] sm:px-5 sm:text-[10px]">
            <span>Rank</span>
            <span>Team</span>
            <span className="text-right">Played</span>
            <span className="text-right">Points</span>
          </div>

          {items.map((row) => (
            <div
              key={`${row.rank}-${row.team}`}
              className={`grid grid-cols-[58px_1fr_56px_62px] items-center border-b border-black/10 px-3 py-4 text-sm text-slate-600 transition last:border-b-0 sm:grid-cols-[72px_1fr_92px_92px] sm:px-5 ${colors.row}`}
            >
              <span className={`font-black ${colors.rank}`}>{row.rank}</span>
              <span className="min-w-0 truncate font-medium text-slate-900">{row.team}</span>
              <span className="text-right text-slate-500">{row.played}</span>
              <span className="text-right font-black text-slate-950">{row.points}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 h-1 bg-slate-200">
          <div className={`h-full w-1/3 ${colors.bar}`} />
        </div>
      </div>
    </section>
  );
}
