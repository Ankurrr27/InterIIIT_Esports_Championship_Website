"use client";

import { Send } from "lucide-react";

export default function ContactForm() {
  return (
    <section id="contact" className="px-6 py-24 relative z-10">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 md:text-5xl">
            Contact Support
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 font-medium">
            Still need help? Send us a message and we'll get back to you as
            soon as possible.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <form className="space-y-8 relative z-10">

            {/* Name + Email */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white/10 focus:ring-4 focus:ring-red-500/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white/10 focus:ring-4 focus:ring-red-500/10"
                />
              </div>

            </div>

            {/* Category + Subject */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Category
                </label>

                <select className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-all duration-300 focus:border-red-500 focus:bg-white/10 focus:ring-4 focus:ring-red-500/10 appearance-none">
                  <option className="bg-[#111111]">Registration</option>
                  <option className="bg-[#111111]">Team Management</option>
                  <option className="bg-[#111111]">Payments</option>
                  <option className="bg-[#111111]">Tournament Issues</option>
                  <option className="bg-[#111111]">Account Support</option>
                  <option className="bg-[#111111]">Website Bug</option>
                  <option className="bg-[#111111]">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Briefly describe your issue"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white/10 focus:ring-4 focus:ring-red-500/10"
                />
              </div>

            </div>

            {/* Message */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Message
              </label>

              <textarea
                rows={6}
                placeholder="Tell us about your issue..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white/10 focus:ring-4 focus:ring-red-500/10"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group flex w-full md:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-10 py-4 font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-red-500/40"
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