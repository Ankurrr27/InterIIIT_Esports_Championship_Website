"use client";

import { Send, Mail, Globe, MessageSquareMore, Clock, ArrowRight } from "lucide-react";

const contacts = [
  {
    icon: MessageSquareMore,
    title: "Discord Community",
    value: "Join our Discord",
    href: "#",
    accent: "text-indigo-600 bg-white border-indigo-200",
    borderHover: "hover:border-indigo-600"
  },
  {
    icon: Mail,
    title: "Email Support",
    value: "support@yourdomain.com",
    href: "mailto:support@yourdomain.com",
    accent: "text-red-600 bg-white border-red-200",
    borderHover: "hover:border-red-600"
  },
  {
    icon: Globe,
    title: "Instagram",
    value: "@yourpage",
    href: "#",
    accent: "text-pink-600 bg-white border-pink-200",
    borderHover: "hover:border-pink-600"
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
          <div className="lg:col-span-2 rounded-none border border-black/10 bg-white p-8 shadow-sm">
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700 uppercase tracking-widest">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full rounded-none border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-red-500 focus:bg-white" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700 uppercase tracking-widest">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full rounded-none border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-red-500 focus:bg-white" />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700 uppercase tracking-widest">Category</label>
                  <select className="w-full rounded-none border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-red-500 focus:bg-white">
                    <option>Registration</option>
                    <option>Tournament Issues</option>
                    <option>Account Support</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-700 uppercase tracking-widest">Subject</label>
                  <input type="text" placeholder="Briefly describe your issue" className="w-full rounded-none border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-red-500 focus:bg-white" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-700 uppercase tracking-widest">Message</label>
                <textarea rows={4} placeholder="Tell us about your issue..." className="w-full resize-none rounded-none border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-red-500 focus:bg-white" />
              </div>

              <button type="submit" className="group flex w-full md:w-auto items-center justify-center gap-2 rounded-none bg-slate-900 px-8 py-3 text-sm font-semibold text-white uppercase tracking-widest transition-all hover:bg-red-600">
                <Send size={16} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                Submit Request
              </button>
            </form>
          </div>

          {/* Sidebar Cards (Takes up 1 column) */}
          <div className="space-y-4">
            
            {contacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <a
                  key={contact.title}
                  href={contact.href}
                  className={`group flex items-center gap-4 rounded-none border border-black/10 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-md ${contact.borderHover}`}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center border transition-all group-hover:scale-110 ${contact.accent}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{contact.title}</h3>
                    <p className="text-sm font-medium text-slate-600">{contact.value}</p>
                  </div>
                </a>
              );
            })}

            {/* Compact Response Time Banner */}
            <div className="mt-4 flex items-center gap-4 rounded-none border border-red-500 bg-red-50 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-red-200 bg-white text-red-600">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Average Response</h3>
                <p className="text-sm font-medium text-slate-600">Within <span className="font-bold text-red-600">24 hours</span></p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
