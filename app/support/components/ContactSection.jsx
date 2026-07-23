"use client";

import { Send, Mail, Globe, MessageSquareMore, Clock } from "lucide-react";

const contacts = [
  {
    icon: MessageSquareMore,
    title: "Discord Community",
    value: "Join our Discord",
    href: "https://discord.gg/iiitiansnetwork",
    accent: "text-indigo-500 bg-indigo-50 border-indigo-100",
    borderHover: "hover:border-indigo-300"
  },
  {
    icon: Mail,
    title: "Email Support",
    value: "iiitiansnetwork@gmail.com",
    href: "mailto:iiitiansnetwork@gmail.com",
    accent: "text-red-500 bg-red-50 border-red-100",
    borderHover: "hover:border-red-300"
  },
  {
    icon: Globe,
    title: "Instagram",
    value: "@interiiit_esports",
    href: "https://www.instagram.com/interiiit_esports",
    accent: "text-pink-500 bg-pink-50 border-pink-100",
    borderHover: "hover:border-pink-300"
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="px-4 py-12 sm:px-6 sm:py-20 relative z-10 bg-slate-50">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-8 sm:mb-12 text-left sm:text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-display)] tracking-wide text-slate-900">
            Contact Support
          </h2>
          <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-slate-600 font-medium sm:mx-auto">
            Send us a message or reach out through our community channels.
          </p>
        </div>

        {/* Contact Cards - Top */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 sm:mb-12">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.title}
                href={contact.href}
                target="_blank" rel="noopener noreferrer"
                className={`group flex flex-col items-center text-center gap-2 sm:gap-3 rounded-xl border border-slate-100 bg-white p-3 sm:p-6 transition-all hover:shadow-md hover:-translate-y-1 ${contact.borderHover}`}
              >
                <div className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl border transition-all ${contact.accent}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-[11px] sm:text-sm font-bold text-slate-900">{contact.title}</h3>
                  <p className="text-[9px] sm:text-xs font-medium text-slate-500 mt-0.5 sm:mt-1 truncate">{contact.value}</p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Form */}
        <div className="rounded-xl border border-slate-100 bg-white p-4 sm:p-8">
          <form className="space-y-4 sm:space-y-5">
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1.5 sm:mb-2 block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-100" />
              </div>
              <div>
                <label className="mb-1.5 sm:mb-2 block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-100" />
              </div>
            </div>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1.5 sm:mb-2 block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">Category</label>
                <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-slate-900 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-100">
                  <option>Registration</option>
                  <option>Tournament Issues</option>
                  <option>Account Support</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 sm:mb-2 block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">Subject</label>
                <input type="text" placeholder="Briefly describe your issue" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-100" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 sm:mb-2 block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">Message</label>
              <textarea rows={4} placeholder="Tell us about your issue..." className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-100" />
            </div>

            <button type="submit" className="group flex w-full md:w-auto items-center justify-center gap-2 rounded-md bg-[#e3000f] px-4 py-2 sm:px-6 sm:py-2.5 text-[11px] sm:text-sm font-bold text-white uppercase tracking-wider transition-all hover:bg-red-700">
              <Send size={14} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              Submit Request
            </button>
          </form>
        </div>

        {/* Response time */}
        <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 text-[10px] sm:text-xs text-slate-500 font-medium">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
          Average response time: <span className="font-bold text-red-600">24 hours</span>
        </div>

      </div>
    </section>
  );
}
