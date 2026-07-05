"use client";

import Link from "next/link";
import { TriangleAlert, ArrowRight } from "lucide-react";

export default function EmergencyHelp() {
  return (
    <section className="px-6 py-24 relative z-10">
      <div className="mx-auto max-w-6xl">

        <div className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-black/40 backdrop-blur-xl p-10 md:p-14 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center relative z-10">

            <div className="max-w-3xl">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <TriangleAlert size={18} className="animate-pulse" />
                Urgent Assistance
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 leading-tight">
                Tournament Starts Soon?
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-gray-400 font-medium">
                If you're experiencing a payment issue, registration problem,
                missing teammate, or match-related issue just before your
                tournament begins, contact our moderators immediately for the
                fastest assistance.
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full lg:w-auto shrink-0">

              <Link
                href="#"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-8 py-4 font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-red-500/40"
              >
                Join Discord
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#contact"
                className="group w-full rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-center font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]"
              >
                Submit Support Ticket
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}