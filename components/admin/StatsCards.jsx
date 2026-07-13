import { Users, Clock, CheckCircle, XCircle } from "lucide-react";

export default function StatsCards({ stats }) {
  const cards = [
    { title: "Total Registrations", value: stats.total || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { title: "Pending Approval",    value: stats.pending || 0, icon: Clock, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
    { title: "Approved Colleges",   value: stats.approved || 0, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
    { title: "Rejected Requests",   value: stats.rejected || 0, icon: XCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.title} className={`flex flex-col justify-between rounded-xl border ${card.border} bg-white shadow-sm p-4`}>
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{card.title}</p>
              <div className={`rounded-lg ${card.bg} p-1.5`}>
                <Icon size={15} className={card.color} />
              </div>
            </div>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">{card.value}</h3>
          </div>
        );
      })}
    </div>
  );
}
