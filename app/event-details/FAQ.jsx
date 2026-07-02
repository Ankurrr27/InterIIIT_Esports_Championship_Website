"use client";

import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "Who can participate in the tournament?",
      answer:
        "The tournament is open to all eligible college students. Each participant must register before the deadline.",
    },
    {
      question: "Is there any registration fee?",
      answer:
        "No, participation is completely free. Simply register your team through the registration portal.",
    },
    {
      question: "Which games are included?",
      answer:
        "The tournament features BGMI, Free Fire, and Valorant. Each game has its own format and schedule.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold uppercase tracking-wider">
            Frequently Asked Questions
          </h2>

          <div className="w-28 h-1 bg-orange-500 rounded-full mx-auto mt-5"></div>

          <p className="text-gray-400 mt-6">
            Everything you need to know before entering the tournament.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-orange-500"
            >
              {/* Question */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="text-lg font-semibold">
                  {faq.question}
                </span>

                <span
                  className={`text-2xl text-orange-500 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 text-gray-400 leading-7">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}