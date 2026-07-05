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
    href: "#",
    accent: "bg-indigo-500/10 text-indigo-400 ring-indigo-500/20 group-hover:from-indigo-600 group-hover:to-indigo-500",
    gradientHover: "group-hover:shadow-[0_0_35px_rgba(99,102,241,0.2)]",
    borderHover: "hover:border-indigo-500/40"
  },
  {
    icon: Mail,
    title: "Email Support",
    description:
      "For registrations, payments, and account-related queries.",
    value: "support@yourdomain.com",
    button: "Send Email",
    href: "mailto:support@yourdomain.com",
    accent: "bg-red-500/10 text-red-400 ring-red-500/20 group-hover:from-red-600 group-hover:to-red-500",
    gradientHover: "group-hover:shadow-[0_0_35px_rgba(239,68,68,0.2)]",
    borderHover: "hover:border-red-500/40"
  },
  {
    icon: Globe,
    title: "Instagram",
    description:
      "Stay updated and send us a DM if you need help.",
    value: "@yourpage",
    button: "Visit Page",
    href: "#",
    accent: "bg-pink-500/10 text-pink-400 ring-pink-500/20 group-hover:from-pink-600 group-hover:to-pink-500",
    gradientHover: "group-hover:shadow-[0_0_35px_rgba(236,72,153,0.2)]",
    borderHover: "hover:border-pink-500/40"
  },
];

export default function ContactCards() {
  return (
    <section className="px-6 py-24 relative z-10">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 md:text-5xl">
            Other Ways to Reach Us
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 font-medium">
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
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 ${contact.borderHover} ${contact.gradientHover}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative z-10">
                  <div
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 transition-all duration-300 group-hover:scale-110 group-hover:text-white group-hover:shadow-lg ${contact.accent}`}
                  >
                    <Icon size={30} />
                  </div>

                  <h3 className="text-2xl font-bold text-white transition-colors">
                    {contact.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-gray-400">
                    {contact.description}
                  </p>

                  <p className="mt-6 font-semibold text-white">
                    {contact.value}
                  </p>

                  <a
                    href={contact.href}
                    className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10"
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
        <div className="mt-16 relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent p-8 md:p-10 backdrop-blur-md">
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row relative z-10 text-center md:text-left">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-red-400 ring-4 ring-red-500/10">
              <Clock size={32} />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">
                Average Response Time
              </h3>

              <p className="mt-2 text-lg text-gray-400">
                We usually reply to all support requests within{" "}
                <span className="font-bold text-red-400">
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