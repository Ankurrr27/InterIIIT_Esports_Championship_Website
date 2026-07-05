"use client";

import {
  UserPlus,
  Users,
  CreditCard,
  Trophy,
  ShieldAlert,
  Bug,
} from "lucide-react";

const categories = [
  {
    icon: UserPlus,
    title: "Registration",
    description:
      "Having trouble registering for a tournament or event? We'll help you get started.",
  },
  {
    icon: Users,
    title: "Team Management",
    description:
      "Create teams, invite players, manage captains, or resolve team-related issues.",
  },
  {
    icon: CreditCard,
    title: "Payments",
    description:
      "Need help with entry fees, failed transactions, or payment confirmations?",
  },
  {
    icon: Trophy,
    title: "Tournament Issues",
    description:
      "Match disputes, lobby details, scheduling, or tournament-related assistance.",
  },
  {
    icon: ShieldAlert,
    title: "Account Support",
    description:
      "Login problems, verification issues, or recovering access to your account.",
  },
  {
    icon: Bug,
    title: "Website Bugs",
    description:
      "Found a bug or unexpected behavior? Let us know so we can fix it quickly.",
  },
];

export default function SupportCategories() {
  return (
    <section className="px-6 py-24 relative z-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 md:text-5xl">
            What do you need help with?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 font-medium">
            Choose the category that best describes your issue and we'll point
            you in the right direction.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/10 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative z-10">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/10 to-red-500/5 text-red-500 ring-1 ring-red-500/20 transition-all duration-300 group-hover:scale-110 group-hover:from-red-600 group-hover:to-red-500 group-hover:text-white group-hover:ring-red-500 group-hover:shadow-lg group-hover:shadow-red-500/30">
                    <Icon size={32} />
                  </div>

                  <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-red-400">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}