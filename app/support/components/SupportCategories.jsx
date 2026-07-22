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
    <section className="px-4 sm:px-6 py-12 sm:py-24 relative z-10 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8 sm:mb-16 text-left sm:text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-display)] tracking-wide text-slate-900">
            What do you need help with?
          </h2>

          <p className="mt-3 sm:mt-6 max-w-2xl text-sm sm:text-lg text-slate-600 font-medium sm:mx-auto">
            Choose the category that best describes your issue and we'll point
            you in the right direction.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-3 sm:gap-6 grid-cols-2 xl:grid-cols-3">
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-none border border-black/10 bg-slate-50 p-4 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:shadow-xl cursor-pointer"
              >
                
                <div className="relative z-10">
                  <div className="mb-3 sm:mb-6 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center border border-black/10 bg-white text-slate-900 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600">
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>

                  <h3 className="text-sm sm:text-xl font-bold text-slate-900 transition-colors group-hover:text-red-600">
                    {item.title}
                  </h3>

                  <p className="mt-2 sm:mt-4 text-xs sm:text-base leading-relaxed text-slate-600">
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