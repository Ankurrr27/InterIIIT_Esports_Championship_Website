function StatCard({ number, label }) {
  return (
    <div className="bg-slate-200">
      <h2>{number}</h2>
      <p>{label}</p>
    </div>
  );
}

export default StatCard;