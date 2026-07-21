"use client";

import { Mail, Globe, MessageSquareMore, Clock, ArrowRight } from "lucide-react";

const contacts = [
  {
    icon: MessageSquareMore,
    title: "Discord Community",
    description:
      "Get quick assistance from moderators and fellow players.",
    value: "Join our Discord",
    button: "Join Server",
    href: "https://discord.gg/iiitiansnetwork",
    accent: "text-indigo-600 bg-white border-indigo-200",
    borderHover: "hover:border-indigo-600"
  },
  {
    icon: Mail,
    title: "Email Support",
    description:
      "For registrations, payments, and account-related queries.",
    value: "support@iec.iiitiansnetwork.com",
    button: "Send Email",
    href: "mailto:support@iec.iiitiansnetwork.com",
    accent: "text-red-600 bg-white border-red-200",
    borderHover: "hover:border-red-600"
  },
  {
    icon: Globe,
    title: "Instagram",
    description:
      "Stay updated and send us a DM if you need help.",
    value: "@interiiit_esports",
    button: "Visit Page",
    href: "https://www.instagram.com/interiiit_esports",
    accent: "text-pink-600 bg-white border-pink-200",
    borderHover: "hover:border-pink-600"
  },
];

export default function ContactCards() {
  return (
    <section className="px-6 py-24 relative z-10 bg-white">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] tracking-wide text-slate-900">
            Other Ways to Reach Us
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 font-medium">
            Choose whichever platform is most convenient for you.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {contacts.map((contact) => {
            const Icon = contact.icon;

            return (
              <div
                key={contact.title}
                className={`group relative overflow-hidden rounded-none border border-black/10 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${contact.borderHover}`}
              >
                
                <div className="relative z-10">
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center border transition-all duration-300 group-hover:scale-110 ${contact.accent}`}
                  >
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 transition-colors">
                    {contact.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-slate-600">
                    {contact.description}
                  </p>

                  <p className="mt-6 font-semibold text-slate-900">
                    {contact.value}
                  </p>

                  <a
                   href={contact.href}
                   target="_blank" rel="noopener noreferrer"
                   className="mt-8 inline-flex items-center gap-2 rounded-none border border-slate-300 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-widest text-slate-900 transition-all duration-300 hover:bg-slate-900 hover:text-white"
                  >
                    {contact.button}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Response Time Banner */}
        <div className="mt-16 relative overflow-hidden rounded-none border border-red-500 bg-red-50 p-8 md:p-10">
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row relative z-10 text-center md:text-left">
            <div className="flex h-16 w-16 items-center justify-center rounded-none bg-white text-red-600 border border-red-200">
              <Clock size={28} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Average Response Time
              </h3>

              <p className="mt-2 text-slate-600 font-medium">
                We usually reply to all support requests within{" "}
                <span className="font-bold text-red-600">
                  24 hours
                </span>
                .
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}