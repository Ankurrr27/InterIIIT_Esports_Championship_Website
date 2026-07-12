import Image from "next/image";
import { format } from "date-fns";
import { Building2, Mail, Phone, MessageCircle, Briefcase, User, MapPin, Globe, Calendar, CheckCircle } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function RequestDetailsModal({ isOpen, onClose, request }) {
  if (!request) return null;

  const statusColors = {
    Pending: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
    Approved: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    Rejected: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-white/10 bg-slate-950 text-white shadow-2xl sm:max-w-3xl">
        <DialogHeader className="mb-4">
          <div className="flex items-center justify-between pr-6">
            <DialogTitle className="text-2xl font-bold tracking-tight">
              Registration Details
            </DialogTitle>
            <Badge variant="outline" className={`border-0 ${statusColors[request.status]}`}>
              {request.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-8 pb-6">
          {/* Header section with logo and primary info */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/50">
              {request.college_logo ? (
                <Image
                  src={request.college_logo}
                  alt={request.college_name}
                  width={128}
                  height={128}
                  className="h-full w-full object-contain p-2"
                />
              ) : (
                <Building2 size={48} className="text-gray-500" />
              )}
            </div>
            
            <div className="flex-1 space-y-2">
              <h3 className="text-2xl font-[family-name:var(--font-display)] tracking-wide text-white">
                {request.college_name}
              </h3>
              <p className="flex items-center gap-2 text-lg font-medium text-red-400">
                <Briefcase size={18} />
                {request.club_name}
              </p>
              
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>Submitted: {format(new Date(request.createdAt), "MMM d, yyyy")}</span>
                </div>
                {request.approved_at && (
                  <div className="flex items-center gap-1.5 text-green-500/80">
                    <CheckCircle size={14} />
                    <span>Approved: {format(new Date(request.approved_at), "MMM d, yyyy")}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator className="bg-white/10" />

          {/* Details Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Coordinator Information
                </h4>
                <div className="space-y-3 rounded-lg border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex items-center gap-3 text-sm">
                    <User size={16} className="text-gray-400" />
                    <div>
                      <p className="font-medium text-white">{request.coordinator_name}</p>
                      <p className="text-xs text-gray-500">{request.designation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={16} className="text-gray-400" />
                    <span className="text-gray-300">{request.contact_number}</span>
                  </div>
                  {request.whatsapp_number && (
                    <div className="flex items-center gap-3 text-sm">
                      <MessageCircle size={16} className="text-green-500" />
                      <span className="text-gray-300">{request.whatsapp_number}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Club Contact
                </h4>
                <div className="space-y-3 rounded-lg border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-gray-300">{request.club_email}</span>
                  </div>
                  {request.club_instagram && (
                    <div className="flex items-center gap-3 text-sm">
                      <FaInstagram size={16} className="text-pink-500" />
                      <span className="text-gray-300">{request.club_instagram}</span>
                    </div>
                  )}
                  {request.college_website && (
                    <div className="flex items-center gap-3 text-sm">
                      <Globe size={16} className="text-blue-400" />
                      <a 
                        href={request.college_website} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {request.college_website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Club Description
                </h4>
                <div className="min-h-[100px] rounded-lg border border-white/5 bg-white/[0.02] p-4 text-sm text-gray-300 leading-relaxed">
                  {request.description || <span className="italic text-gray-600">No description provided</span>}
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Previous Experience
                </h4>
                <div className="min-h-[100px] rounded-lg border border-white/5 bg-white/[0.02] p-4 text-sm text-gray-300 leading-relaxed">
                  {request.experience || <span className="italic text-gray-600">No experience details provided</span>}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
