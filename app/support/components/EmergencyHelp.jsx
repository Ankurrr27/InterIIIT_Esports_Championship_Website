"use client";

import Link from "next/link";
import { TriangleAlert, ArrowRight } from "lucide-react";

export default function EmergencyHelp() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">

        <div className="overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent p-10 backdrop-blur-md">

          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">

            <div className="max-w-3xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-red-400">
                <TriangleAlert size={18} />
                Urgent Assistance
              </div>

              <h2 className="text-4xl font-bold text-white">
                Tournament Starts Soon?
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-400">
                If you're experiencing a payment issue, registration problem,
                missing teammate, or match-related issue just before your
                tournament begins, contact our moderators immediately for the
                fastest assistance.
              </p>
            </div>

            <div className="flex flex-col gap-4">

              <Link
                href="#"
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.45)]"
              >
                Join Discord
                <ArrowRight size={18} />
              </Link>

              <Link
                href="#contact"
                className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-center font-semibold text-white transition hover:border-red-500 hover:bg-white/10"
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