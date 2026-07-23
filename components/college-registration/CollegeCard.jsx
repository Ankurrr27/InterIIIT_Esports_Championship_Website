import Image from "next/image";
import { Building2, User, Mail, ShieldCheck } from "lucide-react";

export default function CollegeCard({ college }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/10 hover:ring-red-100">
      
      {/* Top subtle gradient line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        
        {/* Header: Logo + Names */}
        <div className="mb-6 flex items-center gap-4 sm:mb-8 sm:flex-col sm:items-center sm:text-center sm:gap-5">
          <div className="relative flex h-20 w-20 sm:h-28 sm:w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-100 bg-white p-2 shadow-sm transition-transform duration-300 group-hover:scale-105">
            {college.college_logo ? (
              <Image
                src={college.college_logo}
                alt={`${college.college_name} logo`}
                width={112}
                height={112}
                className="h-full w-full object-contain"
              />
            ) : (
              <Building2 size={32} className="text-slate-300" />
            )}
          </div>
          <div className="min-w-0 sm:w-full">
            <h3 className="truncate font-[family-name:var(--font-display)] text-xl sm:text-2xl lg:text-3xl leading-tight tracking-wide text-slate-900 transition-colors group-hover:text-red-600" title={college.college_name}>
              {college.college_name}
            </h3>
            <p className="mt-1 sm:mt-2 flex items-center gap-1.5 truncate text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-red-500 sm:justify-center" title={college.club_name}>
              <ShieldCheck size={14} className="shrink-0 hidden sm:block" />
              <span className="truncate">{college.club_name}</span>
            </p>
          </div>
        </div>

        {/* Footer: Details Box */}
        <div className="mt-auto space-y-3.5 rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-colors duration-300 group-hover:border-red-100 group-hover:bg-red-50/30">
          
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white shadow-sm transition-colors group-hover:border-red-100 group-hover:text-red-500 text-slate-400">
              <User size={14} />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {college.designation}
              </span>
              <span className="truncate text-[11px] sm:text-xs font-medium text-slate-700">
                {college.coordinator_name}
              </span>
            </div>
          </div>
          
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent transition-colors group-hover:via-red-100" />
          
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white shadow-sm transition-colors group-hover:border-red-100 group-hover:text-red-500 text-slate-400">
              <Mail size={14} />
            </div>
            <span className="truncate text-[11px] sm:text-xs font-medium text-slate-600" title={college.club_email}>
              {college.club_email}
            </span>
          </div>
          
        </div>
      </div>
    </div>
  );
}
