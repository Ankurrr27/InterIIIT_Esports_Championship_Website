"use client";

import { Send } from "lucide-react";

export default function ContactForm() {
  return (
    <section id="contact" className="px-6 py-24 relative z-10 bg-slate-50">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] tracking-wide text-slate-900">
            Contact Support
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 font-medium">
            Still need help? Send us a message and we'll get back to you as
            soon as possible.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-none border border-black/10 bg-white p-8 md:p-12 shadow-sm relative overflow-hidden">
          
          <form className="space-y-8 relative z-10">

            {/* Name + Email */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 uppercase tracking-widest">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-none border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 uppercase tracking-widest">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full rounded-none border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-1 focus:ring-red-500"
                />
              </div>

            </div>

            {/* Category + Subject */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 uppercase tracking-widest">
                  Category
                </label>

                <select className="w-full rounded-none border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-1 focus:ring-red-500">
                  <option>Registration</option>
                  <option>Team Management</option>
                  <option>Payments</option>
                  <option>Tournament Issues</option>
                  <option>Account Support</option>
                  <option>Website Bug</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 uppercase tracking-widest">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Briefly describe your issue"
                  className="w-full rounded-none border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-1 focus:ring-red-500"
                />
              </div>

            </div>

            {/* Message */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 uppercase tracking-widest">
                Message
              </label>

              <textarea
                rows={6}
                placeholder="Tell us about your issue..."
                className="w-full resize-none rounded-none border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group flex w-full md:w-auto items-center justify-center gap-2 rounded-none bg-slate-900 px-10 py-4 font-semibold text-white uppercase tracking-widest transition-all duration-300 hover:bg-red-600"
            >
              <Send size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              Submit Request
            </button>

          </form>

        </div>
      </div>
    </section>
  );
}