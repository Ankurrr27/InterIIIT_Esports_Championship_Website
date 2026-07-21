"use client";

import { Send, Mail, Globe, MessageSquareMore, Clock, ArrowRight } from "lucide-react";

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
    value: "support@iec.iiitiansnetwork.com",
    href: "mailto:support@iec.iiitiansnetwork.com",
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
    <section id="contact" className="px-6 py-20 relative z-10 bg-slate-50">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] tracking-wide text-slate-900">
            Contact Support
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 font-medium">
            Send us a message or reach out through our community channels.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Form Side (Takes up 2 columns) */}
          <div className="lg:col-span-2 rounded-xl border border-slate-100 bg-slate-50/50 p-6 sm:p-8">
            <form className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-100" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-100" />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-500 uppercase tracking-widest">Category</label>
                  <select className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-100">
                    <option>Registration</option>
                    <option>Tournament Issues</option>
                    <option>Account Support</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-500 uppercase tracking-widest">Subject</label>
                  <input type="text" placeholder="Briefly describe your issue" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-100" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-500 uppercase tracking-widest">Message</label>
                <textarea rows={4} placeholder="Tell us about your issue..." className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-100" />
              </div>

              <button type="submit" className="group flex w-full md:w-auto items-center justify-center gap-2 rounded-md bg-[#e3000f] px-6 py-2.5 text-sm font-bold text-white uppercase tracking-wider transition-all hover:bg-red-700">
                <Send size={16} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                Submit Request
              </button>
            </form>
          </div>

          {/* Sidebar Cards (Takes up 1 column) */}
          <div className="space-y-3">
            
            {contacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <a
                  key={contact.title}
                  href={contact.href}
                  target="_blank" rel="noopener noreferrer"
                  className={`group flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:shadow-sm ${contact.borderHover}`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded border transition-all ${contact.accent}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{contact.title}</h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{contact.value}</p>
                  </div>
                </a>
              );
            })}

            {/* Compact Response Time Banner */}
            <div className="mt-4 flex items-center gap-4 rounded-xl border border-red-100 bg-red-50/50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-red-100 bg-white text-red-500">
                <Clock size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Average Response</h3>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Within <span className="font-bold text-red-600">24 hours</span></p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
