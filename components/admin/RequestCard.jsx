import Image from "next/image";
import { format } from "date-fns";
import { Building2, User, Phone, Check, X, Eye, RotateCcw, Trash2 } from "lucide-react";

export default function RequestCard({ request, onViewDetails, onAction }) {
  const statusStyles = {
    Pending:  "bg-amber-50 text-amber-700 border-amber-200",
    Approved: "bg-green-50 text-green-700 border-green-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-1 flex-col p-4">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-1">
            {request.college_logo ? (
              <Image
                src={request.college_logo}
                alt={`${request.college_name} logo`}
                width={32}
                height={32}
                className="h-full w-full object-contain"
              />
            ) : (
              <Building2 size={16} className="text-gray-400" />
            )}
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${statusStyles[request.status]}`}>
            {request.status}
          </span>
        </div>

        {/* Name */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 line-clamp-1" title={request.college_name}>
            {request.college_name}
          </h3>
          <p className="text-xs text-gray-500">{request.club_name}</p>
        </div>

        {/* Info */}
        <div className="mt-3 space-y-1.5 rounded-lg bg-gray-50 border border-gray-100 p-2">
          <div className="flex items-center gap-2 text-[11px] text-gray-600">
            <User size={12} className="text-gray-400" />
            <span className="truncate">{request.coordinator_name}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-gray-600">
            <Phone size={12} className="text-gray-400" />
            <span>{request.contact_number}</span>
          </div>
        </div>

        <div className="mt-3 text-[9px] text-gray-400 uppercase tracking-wider">
          Submitted {format(new Date(request.createdAt), "MMM d, yyyy")}
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 divide-x divide-gray-100 border-t border-gray-100 bg-gray-50 sm:grid-cols-4 sm:divide-y-0">
        <button
          onClick={() => onViewDetails(request)}
          className="flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold text-gray-500 transition-colors hover:bg-gray-100 hover:text-slate-900 sm:col-span-1"
        >
          <Eye size={13} />
          <span className="sr-only sm:not-sr-only sm:hidden lg:inline">View</span>
        </button>

        {request.status === "Pending" && (
          <>
            <button onClick={() => onAction("approve", request)} className="flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold text-green-600 hover:bg-green-50 sm:col-span-1">
              <Check size={12} /><span className="hidden sm:inline">Approve</span>
            </button>
            <button onClick={() => onAction("reject", request)} className="flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold text-red-600 hover:bg-red-50 sm:col-span-2">
              <X size={12} /><span className="hidden sm:inline">Reject</span>
            </button>
          </>
        )}
        {request.status === "Approved" && (
          <>
            <button onClick={() => onAction("restore", request)} className="flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold text-amber-600 hover:bg-amber-50 sm:col-span-2">
              <RotateCcw size={12} /><span className="hidden sm:inline">Remove Approval</span>
            </button>
            <button onClick={() => onAction("delete", request)} className="flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold text-red-600 hover:bg-red-50 sm:col-span-1">
              <Trash2 size={12} /><span className="hidden sm:inline">Delete</span>
            </button>
          </>
        )}
        {request.status === "Rejected" && (
          <>
            <button onClick={() => onAction("restore", request)} className="flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold text-amber-600 hover:bg-amber-50 sm:col-span-2">
              <RotateCcw size={12} /><span className="hidden sm:inline">Restore</span>
            </button>
            <button onClick={() => onAction("delete", request)} className="flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold text-red-600 hover:bg-red-50 sm:col-span-1">
              <Trash2 size={12} /><span className="hidden sm:inline">Delete</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
