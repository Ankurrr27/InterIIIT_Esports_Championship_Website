"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      question: "Who can participate in the tournament?",
      answer: "The tournament is strictly for college students currently enrolled in any IIIT across India. You will need to verify your student status using your official college email ID during registration.",
    },
    {
      question: "Is there any registration fee?",
      answer: "No, participation in the Inter-IIIT Esports League is completely free of charge.",
    },
    {
      question: "Can I participate in multiple games?",
      answer: "Yes! You can register for multiple games as long as the match schedules do not conflict. However, you must join different teams if your current team is not participating in the other games.",
    },
    {
      question: "What is the format of the tournament?",
      answer: "The tournament consists of online qualifiers followed by semi-finals and a grand finale. Specific formats vary by game and will be announced on the official Discord server.",
    },
    {
      question: "Do I need to be in the same college as my teammates?",
      answer: "Yes, all team members must be enrolled in the same IIIT to represent their college. Mixed-college teams are not permitted.",
    },
    {
      question: "How are the prize pools distributed?",
      answer: "Prize pools will be distributed among the top 3 teams for each game. The specific breakdown will be shared on our Discord server before the semi-finals.",
    },
    {
      question: "How do I communicate with the organizers during the tournament?",
      answer: "All official communication, announcements, match scheduling, and dispute resolutions will take place on our official Discord server.",
    },
    {
      question: "What happens if a player disconnects during a match?",
      answer: "Standard esports rules apply. Players are given a specific reconnect window depending on the game, after which the match either continues or pauses based on the admin's discretion.",
    },
  ];

  return (
    <section className="relative py-10 sm:py-12 lg:py-16 bg-black text-white">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-6 sm:mb-8">
          <p className="text-[0.5rem] sm:text-xs tracking-[0.25em] uppercase text-slate-400 font-medium mb-1">Help</p>
          <h2 className="text-3xl sm:text-6xl font-[family-name:var(--font-display)] tracking-wide text-white leading-none">
            FAQ
          </h2>
          <p className="mt-2 text-[11px] sm:mt-3 sm:text-sm text-slate-400">
            Got questions? We&apos;ve got answers.
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex w-full items-center justify-between p-3 sm:p-5 text-left"
              >
                <span className="font-semibold text-[13px] sm:text-base text-slate-200">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-slate-400 transition-transform duration-300 ${
                    openIdx === idx ? "rotate-180 text-red-500" : ""
                  }`}
                />
              </button>
              
              <div
                className={`px-3 sm:px-5 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIdx === idx ? "max-h-40 pb-4 sm:pb-5 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-[11px] sm:text-sm text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


