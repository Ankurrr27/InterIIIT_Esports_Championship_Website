"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";

export default function HomeCollegesSection() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchColleges() {
      try {
        const res = await fetch("/api/college-requests?limit=8");
        const json = await res.json();
        if (json.success) setColleges(json.data);
      } catch (err) {
        console.error("Failed to fetch colleges:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchColleges();
  }, []);

  return (
    <section className="relative py-10 sm:py-12 lg:py-16 bg-black text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="mb-10 flex items-start flex-col gap-1">
          {/* <p className="text-[0.5rem] sm:text-xs tracking-[0.25em] uppercase text-red-500 font-medium">
            Our Colleges
          </p> */}
          <h2 className="text-3xl md:text-6xl font-[family-name:var(--font-display)] tracking-wide text-white leading-none">
            Participating Colleges
          </h2>
          <p className="mt-2 text-[11px] sm:text-sm text-slate-400">
            IIITs from across the nation competing for glory.
          </p>
          <div className="mt-2 h-[2px] w-12 bg-red-600" />
        </div>

        {/* ── Grid ── */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-6 animate-pulse"
              >
                <div className="h-20 w-20 rounded-full bg-white/5" />
                <div className="h-4 w-24 rounded bg-white/5" />
              </div>
            ))}
          </div>
        ) : colleges.length === 0 ? (
          <p className="text-center text-slate-500 py-12">
            No colleges registered yet. Be the first!
          </p>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {colleges.map((college) => (
              <div
                key={college._id}
                className="group flex flex-col items-center gap-3 border-white/10 p-6 transition-all duration-300 ]"
              >
                <div className="flex h-20 w-20 rounded-full shrink-0 items-center justify-center overflow-hidden bg-white/5 p-1">
                  {college.college_logo ? (
                    <Image
                      src={college.college_logo}
                      alt={`${college.college_name} logo`}
                      width={80}
                      height={80}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <Building2 size={28} className="text-slate-500" />
                  )}
                </div>
                <h3 className="text-center text-sm font-semibold text-white group-hover:text-red-400 transition-colors leading-tight">
                  {college.college_name}
                </h3>
              </div>
            ))}
          </div>
        )}

        {/* ── CTA Banner ── */}
        <div className="mt-10  bg-white/[0.03] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Can&apos;t find your college?
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Register your IIIT and join the championship.
            </p>
          </div>
          <Link
            href="/register-college"
            className="group flex items-center gap-2 rounded-none bg-red-600 px-6 py-3 text-sm font-semibold text-white uppercase tracking-widest transition-all hover:bg-red-500"
          >
            Register Now
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
