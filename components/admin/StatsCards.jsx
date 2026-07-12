import { Users, Clock, CheckCircle, XCircle } from "lucide-react";

export default function StatsCards({ stats }) {
  const cards = [
    {
      title: "Total Registrations",
      value: stats.total || 0,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      title: "Pending Approval",
      value: stats.pending || 0,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      title: "Approved Colleges",
      value: stats.approved || 0,
      icon: CheckCircle,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
    },
    {
      title: "Rejected Requests",
      value: stats.rejected || 0,
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`flex flex-col justify-between rounded-xl border ${card.border} bg-white/5 p-6 backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-400">{card.title}</p>
              <div className={`rounded-lg ${card.bg} p-2`}>
                <Icon size={18} className={card.color} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-white">{card.value}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
