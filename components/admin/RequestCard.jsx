import Image from "next/image";
import { format } from "date-fns";
import { Building2, User, Phone, Check, X, Eye, RotateCcw, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function RequestCard({ request, onViewDetails, onAction }) {
  const statusColors = {
    Pending: "border-amber-500/20 bg-amber-500/10 text-amber-500",
    Approved: "border-green-500/20 bg-green-500/10 text-green-500",
    Rejected: "border-red-500/20 bg-red-500/10 text-red-500",
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-white/20 hover:bg-white/10">
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-black/50 p-1">
            {request.college_logo ? (
              <Image
                src={request.college_logo}
                alt={`${request.college_name} logo`}
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            ) : (
              <Building2 size={20} className="text-gray-500" />
            )}
          </div>
          <Badge variant="outline" className={statusColors[request.status]}>
            {request.status}
          </Badge>
        </div>

        <div>
          <h3 className="font-semibold text-white line-clamp-1" title={request.college_name}>
            {request.college_name}
          </h3>
          <p className="text-sm text-gray-400">{request.club_name}</p>
        </div>

        <div className="mt-4 space-y-2 rounded-lg bg-black/20 p-3">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <User size={14} className="text-gray-500" />
            <span className="truncate">{request.coordinator_name}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Phone size={14} className="text-gray-500" />
            <span>{request.contact_number}</span>
          </div>
        </div>
        
        <div className="mt-4 text-[10px] text-gray-500 uppercase tracking-wider">
          Submitted {format(new Date(request.createdAt), "MMM d, yyyy")}
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-white/10 border-t border-white/10 bg-black/40 sm:grid-cols-4 sm:divide-y-0">
        <button
          onClick={() => onViewDetails(request)}
          className="flex items-center justify-center gap-1.5 py-3 text-xs font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white sm:col-span-1"
        >
          <Eye size={14} />
          <span className="sr-only sm:not-sr-only sm:hidden lg:inline">View</span>
        </button>

        {request.status === "Pending" && (
          <>
            <button
              onClick={() => onAction("approve", request)}
              className="flex items-center justify-center gap-1.5 py-3 text-xs font-medium text-green-500 transition-colors hover:bg-green-500/10 sm:col-span-1"
            >
              <Check size={14} />
              <span className="hidden sm:inline">Approve</span>
            </button>
            <button
              onClick={() => onAction("reject", request)}
              className="flex items-center justify-center gap-1.5 py-3 text-xs font-medium text-red-500 transition-colors hover:bg-red-500/10 sm:col-span-2"
            >
              <X size={14} />
              <span className="hidden sm:inline">Reject</span>
            </button>
          </>
        )}

        {request.status === "Approved" && (
          <>
            <button
              onClick={() => onAction("restore", request)}
              className="flex items-center justify-center gap-1.5 py-3 text-xs font-medium text-amber-500 transition-colors hover:bg-amber-500/10 sm:col-span-2"
            >
              <RotateCcw size={14} />
              <span className="hidden sm:inline">Remove Approval</span>
            </button>
            <button
              onClick={() => onAction("delete", request)}
              className="flex items-center justify-center gap-1.5 py-3 text-xs font-medium text-red-500 transition-colors hover:bg-red-500/10 sm:col-span-1"
            >
              <Trash2 size={14} />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </>
        )}

        {request.status === "Rejected" && (
          <>
            <button
              onClick={() => onAction("restore", request)}
              className="flex items-center justify-center gap-1.5 py-3 text-xs font-medium text-amber-500 transition-colors hover:bg-amber-500/10 sm:col-span-2"
            >
              <RotateCcw size={14} />
              <span className="hidden sm:inline">Restore</span>
            </button>
            <button
              onClick={() => onAction("delete", request)}
              className="flex items-center justify-center gap-1.5 py-3 text-xs font-medium text-red-500 transition-colors hover:bg-red-500/10 sm:col-span-1"
            >
              <Trash2 size={14} />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
