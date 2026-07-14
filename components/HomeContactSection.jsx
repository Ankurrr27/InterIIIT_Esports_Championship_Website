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
    <section className="relative py-10 sm:py-12 lg:py-16 bg-white text-slate-900">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="mb-10 flex items-start flex-col gap-1">
          
          <h2 className="text-3xl md:text-6xl font-[family-name:var(--font-display)] tracking-wide text-black leading-none">
            Contact Support
          </h2>
          <p className="mt-2 text-[11px] sm:text-sm text-slate-600">
            Send us a message or reach out through our community channels.
          </p>
          <div className="mt-2 h-[2px] w-12 bg-red-600" />
        </div>

        {/* ── Content Grid ── */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Form (2 columns) */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-none border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-none border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    Category
                  </label>
                  <select className="w-full rounded-none border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-red-500 focus:bg-white">
                    <option>Registration</option>
                    <option>Tournament Issues</option>
                    <option>Account Support</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Briefly describe your issue"
                    className="w-full rounded-none border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your issue..."
                  className="w-full resize-none rounded-none border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-500 focus:bg-white"
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
                  className={`group flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 transition-all hover:-translate-y-1 hover:bg-slate-100 ${contact.borderHover}`}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center border transition-all group-hover:scale-110 ${contact.accent}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{contact.title}</h3>
                    <p className="text-sm font-medium text-slate-500">{contact.value}</p>
                  </div>
                </a>
              );
            })}

            {/* Response Time Banner */}
            <div className="mt-4 flex items-center gap-4 rounded-xl border border-red-200 bg-red-50 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-red-200 bg-red-100 text-red-500">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Average Response</h3>
                <p className="text-sm font-medium text-slate-600">
                  Within <span className="font-bold text-red-500">24 hours</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
