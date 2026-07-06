"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "Who can participate in the tournament?",
      answer:
        "The tournament is exclusively open to all eligible students from IIIT campuses across India. Each participant must verify their college ID during registration before the deadline.",
    },
    {
      question: "Is there any registration fee?",
      answer:
        "No, participation is completely free. Simply gather your squad, sign up on our platform, and register your team for the respective game's bracket.",
    },
    {
      question: "Which games are included?",
      answer:
        "The current championship features Valorant, BGMI, and Free Fire. Each game has its own dedicated tournament format, qualifiers, and live-streamed Grand Finals.",
    },
    {
      question: "Can I play in multiple teams?",
      answer:
        "No. To maintain competitive integrity, one user can participate in only one team, and that team can only register for one game throughout the duration of the championship.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-slate-950 py-12 text-white relative overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 translate-x-1/3" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-2xl border-l-2 border-red-600 pl-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-red-500">
            Support
          </p>
          <h2 className="mt-4 text-4xl font-[family-name:var(--font-display)] tracking-wide sm:text-5xl text-white">
            Frequently Asked
            <br />
            Questions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400 font-medium">
            Everything you need to know before stepping into the arena.
          </p>
        </div>

        <div className="mt-10 divide-y divide-white/5 border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="group transition-colors duration-300 hover:bg-white/[0.02]">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left"
                >
                  <span className={`text-base sm:text-lg font-bold tracking-wide transition-colors ${isOpen ? "text-red-500" : "text-white group-hover:text-red-400"}`}>
                    {faq.question}
                  </span>
                  
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? "border-red-500 text-red-500 bg-red-500/10 rotate-180" : "border-white/10 text-white/50 group-hover:border-red-400/50 group-hover:text-red-400"}`}>
                    <ChevronDown size={16} />
                  </span>
                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 pt-0 text-sm leading-relaxed text-slate-400 sm:text-base font-medium">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
