"use client";

import { Mail, Globe, MessageSquareMore, Clock } from "lucide-react";

const contacts = [
  {
    icon: MessageSquareMore,
    title: "Discord Community",
    description:
      "Get quick assistance from moderators and fellow players.",
    value: "Join our Discord",
    button: "Join Server",
    href: "#",
    accent: "bg-indigo-500/15 text-indigo-400",
  },
  {
    icon: Mail,
    title: "Email Support",
    description:
      "For registrations, payments, and account-related queries.",
    value: "support@yourdomain.com",
    button: "Send Email",
    href: "mailto:support@yourdomain.com",
    accent: "bg-red-500/15 text-red-400",
  },
  {
    icon: Globe,
    title: "Instagram",
    description:
      "Stay updated and send us a DM if you need help.",
    value: "@yourpage",
    button: "Visit Page",
    href: "#",
    accent: "bg-pink-500/15 text-pink-400",
  },
];

export default function ContactCards() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Other Ways to Reach Us
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Choose whichever platform is most convenient for you.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {contacts.map((contact) => {
            const Icon = contact.icon;

            return (
              <div
                key={contact.title}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-red-500/40 hover:shadow-[0_0_35px_rgba(239,68,68,0.2)]"
              >
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${contact.accent}`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="text-2xl font-semibold text-white">
                  {contact.title}
                </h3>

                <p className="mt-4 text-gray-400 leading-7">
                  {contact.description}
                </p>

                <p className="mt-6 font-medium text-white">
                  {contact.value}
                </p>

                <a
                  href={contact.href}
                  className="mt-8 inline-block rounded-xl border border-white/10 px-6 py-3 font-semibold text-white transition hover:border-red-500 hover:bg-red-500/10"
                >
                  {contact.button}
                </a>
              </div>
            );
          })}
        </div>

        {/* Response Time Banner */}
        <div className="mt-16 flex flex-col items-center justify-center gap-4 rounded-3xl border border-red-500/20 bg-red-500/10 px-8 py-8 text-center md:flex-row">
          <Clock className="text-red-400" size={30} />

          <div>
            <h3 className="text-xl font-semibold text-white">
              Average Response Time
            </h3>

            <p className="mt-1 text-gray-400">
              We usually reply to all support requests within{" "}
              <span className="font-semibold text-red-400">
                24 hours
              </span>
              .
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}