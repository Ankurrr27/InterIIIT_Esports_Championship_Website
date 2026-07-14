"use client";

import { Send, Mail, Globe, MessageSquareMore, Clock } from "lucide-react";

const contacts = [
  {
    icon: MessageSquareMore,
    title: "Discord Community",
    value: "Join our Discord",
    href: "#",
    accent: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    borderHover: "hover:border-indigo-500/40",
  },
  {
    icon: Mail,
    title: "Email Support",
    value: "support@yourdomain.com",
    href: "mailto:support@yourdomain.com",
    accent: "text-red-400 bg-red-500/10 border-red-500/20",
    borderHover: "hover:border-red-500/40",
  },
  {
    icon: Globe,
    title: "Instagram",
    value: "@yourpage",
    href: "#",
    accent: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    borderHover: "hover:border-pink-500/40",
  },
];

export default function HomeContactSection() {
  return (
    <section className="relative py-10 sm:py-12 lg:py-16 bg-[#0a0a0f] text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="mb-10 flex items-start flex-col gap-1">
          <p className="text-[0.5rem] sm:text-xs tracking-[0.25em] uppercase text-red-500 font-medium">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-6xl font-[family-name:var(--font-display)] tracking-wide text-white leading-none">
            Contact Support
          </h2>
          <p className="mt-2 text-[11px] sm:text-sm text-slate-400">
            Send us a message or reach out through our community channels.
          </p>
          <div className="mt-2 h-[2px] w-12 bg-red-600" />
        </div>

        {/* ── Content Grid ── */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Form (2 columns) */}
          <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-none border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all focus:border-red-500 focus:bg-white/[0.08]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-none border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all focus:border-red-500 focus:bg-white/[0.08]"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    Category
                  </label>
                  <select className="w-full rounded-none border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all focus:border-red-500 focus:bg-white/[0.08]">
                    <option>Registration</option>
                    <option>Tournament Issues</option>
                    <option>Account Support</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Briefly describe your issue"
                    className="w-full rounded-none border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all focus:border-red-500 focus:bg-white/[0.08]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your issue..."
                  className="w-full resize-none rounded-none border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all focus:border-red-500 focus:bg-white/[0.08]"
                />
              </div>

              <button
                type="submit"
                className="group flex w-full md:w-auto items-center justify-center gap-2 rounded-none bg-red-600 px-8 py-3 text-sm font-semibold text-white uppercase tracking-widest transition-all hover:bg-red-500"
              >
                <Send size={16} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                Submit Request
              </button>
            </form>
          </div>

          {/* Sidebar Cards (1 column) */}
          <div className="space-y-4">
            {contacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <a
                  key={contact.title}
                  href={contact.href}
                  className={`group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:-translate-y-1 hover:bg-white/[0.08] ${contact.borderHover}`}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center border transition-all group-hover:scale-110 ${contact.accent}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{contact.title}</h3>
                    <p className="text-sm font-medium text-slate-400">{contact.value}</p>
                  </div>
                </a>
              );
            })}

            {/* Response Time Banner */}
            <div className="mt-4 flex items-center gap-4 rounded-xl border border-red-500/30 bg-red-500/10 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white">Average Response</h3>
                <p className="text-sm font-medium text-slate-400">
                  Within <span className="font-bold text-red-400">24 hours</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
