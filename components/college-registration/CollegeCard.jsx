import Image from "next/image";
import { Building2, User, Mail } from "lucide-react";

export default function CollegeCard({ college }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-md hover:bg-gray-50">
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-50 p-1">
            {college.college_logo ? (
              <Image
                src={college.college_logo}
                alt={`${college.college_name} logo`}
                width={64}
                height={64}
                className="h-full w-full object-contain"
              />
            ) : (
              <Building2 size={24} className="text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-xl tracking-wide text-slate-900 group-hover:text-red-600 transition-colors">
              {college.college_name}
            </h3>
            <p className="text-sm font-medium text-red-600">{college.club_name}</p>
          </div>
        </div>

        <div className="mt-auto space-y-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <User size={16} className="text-gray-400" />
            <span className="truncate">{college.coordinator_name}</span>
            <span className="ml-auto rounded-full bg-gray-200 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gray-600 font-semibold">
              {college.designation}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Mail size={16} className="text-gray-400" />
            <span className="truncate">{college.club_email}</span>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient effect on hover */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}
