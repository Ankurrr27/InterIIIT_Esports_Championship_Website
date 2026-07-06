"use client";

import Link from "next/link";
import { TriangleAlert, ArrowRight } from "lucide-react";

export default function EmergencyHelp() {
  return (
    <section className="px-6 py-24 relative z-10 bg-slate-50">
      <div className="mx-auto max-w-6xl">

        <div className="relative overflow-hidden rounded-none border border-red-500 bg-white p-10 md:p-14 shadow-sm">
          
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center relative z-10">

            <div className="max-w-3xl">

              <div className="mb-6 inline-flex items-center gap-2 rounded-none border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold uppercase tracking-widest text-red-600">
                <TriangleAlert size={18} className="animate-pulse" />
                Urgent Assistance
              </div>

              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] tracking-wide text-slate-900 leading-tight">
                Tournament Starts Soon?
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-slate-600 font-medium">
                If you're experiencing a payment issue, registration problem,
                missing teammate, or match-related issue just before your
                tournament begins, contact our moderators immediately for the
                fastest assistance.
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full lg:w-auto shrink-0">

              <Link
                href="#"
                className="group flex w-full items-center justify-center gap-2 rounded-none bg-red-600 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-red-700"
              >
                Join Discord
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#contact"
                className="group w-full rounded-none border border-slate-300 bg-white px-8 py-4 text-center text-sm font-semibold uppercase tracking-widest text-slate-900 transition-all duration-300 hover:bg-slate-50 hover:border-slate-400"
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