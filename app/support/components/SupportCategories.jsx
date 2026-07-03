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
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            What do you need help with?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Choose the category that best describes your issue and we'll point
            you in the right direction.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300  hover:border-red-500/50 "
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 text-red-500 transition-all duration-300 group-hover:bg-red-500 group-hover:text-white">
                  <Icon size={28} />
                </div>

                <h3 className="text-2xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}