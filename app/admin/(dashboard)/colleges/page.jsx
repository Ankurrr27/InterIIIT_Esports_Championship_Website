"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCards from "@/components/admin/StatsCards";
import RequestCard from "@/components/admin/RequestCard";
import RequestDetailsModal from "@/components/admin/RequestDetailsModal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function CollegesPage() {
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [stats, setStats] = useState({});
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [draggedRequestId, setDraggedRequestId] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const router = useRouter();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    action: null,
    request: null,
    loading: false,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchData(storedToken);
      
      // Fetch user role for edit permission
      fetch("/api/user/me", { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(res => res.json())
        .then(data => {
          if (data.success) setCurrentUser(data.user);
        });
    }
  }, []);

  const fetchData = async (currentToken) => {
    setLoading(true);
    try {
      const statsRes = await fetch("/api/college-requests/stats", {
        headers: { Authorization: `Bearer ${currentToken}` },
        cache: "no-store",
      });
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.data);

      const reqRes = await fetch("/api/college-requests?limit=100", {
        headers: { Authorization: `Bearer ${currentToken}` },
        cache: "no-store",
      });
      const reqData = await reqRes.json();
      if (reqData.success) setRequests(reqData.data);
    } catch (err) {
      toast.error("Failed to fetch college requests");
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (action, request) => {
    setConfirmDialog({ isOpen: true, action, request, loading: false });
  };

  const executeAction = async () => {
    const { action, request } = confirmDialog;
    setConfirmDialog((prev) => ({ ...prev, loading: true }));

    try {
      let res;
      if (action === "delete") {
        res = await fetch(`/api/college-requests/${request._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        let status = "Pending";
        if (action === "approve") status = "Approved";
        if (action === "reject") status = "Rejected";

        res = await fetch(`/api/college-requests/${request._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success(
        action === "delete"
          ? "Request permanently deleted"
          : `Request marked as ${action === "restore" ? "Pending" : action === "approve" ? "Approved" : "Rejected"}`
      );

      fetchData(token);
      if (isDetailsOpen) setIsDetailsOpen(false);
    } catch (err) {
      toast.error(err.message || "Action failed");
    } finally {
      setConfirmDialog({ isOpen: false, action: null, request: null, loading: false });
    }
  };

  const getConfirmDialogContent = () => {
    const { action, request } = confirmDialog;
    if (!request) return {};
    switch (action) {
      case "approve": return { title: "Approve Registration", description: `Approve ${request.college_name}?`, confirmText: "Approve", isDestructive: false };
      case "reject": return { title: "Reject Registration", description: `Reject ${request.college_name}?`, confirmText: "Reject", isDestructive: true };
      case "restore": return { title: "Restore to Pending", description: `Restore ${request.college_name}?`, confirmText: "Restore", isDestructive: false };
      case "delete": return { title: "Permanently Delete", description: `Delete ${request.college_name}?`, confirmText: "Delete", isDestructive: true };
      default: return {};
    }
  };

  const handleReorderDrop = (targetRequest) => {
    if (!draggedRequestId || !targetRequest) return;

    if (draggedRequestId === targetRequest._id) {
      setDraggedRequestId(null);
      return;
    }

    setRequests((prev) => {
      const approved = prev.filter((req) => req.status === "Approved");
      const other = prev.filter((req) => req.status !== "Approved");
      const nextApproved = [...approved];
      const fromIndex = nextApproved.findIndex((req) => req._id === draggedRequestId);
      const toIndex = nextApproved.findIndex((req) => req._id === targetRequest._id);

      if (fromIndex === -1 || toIndex === -1) return prev;

      const [moved] = nextApproved.splice(fromIndex, 1);
      nextApproved.splice(toIndex, 0, moved);
      return [...other, ...nextApproved.map((req, index) => ({ ...req, order: index }))];
    });
    setDraggedRequestId(null);
  };

  const saveCollegeOrder = async () => {
    setSavingOrder(true);
    try {
      const approvedRequests = requests.filter((req) => req.status === "Approved");
      await Promise.all(
        approvedRequests.map((req, index) =>
          fetch(`/api/college-requests/${req._id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ order: index }),
          })
        )
      );
      toast.success("College order updated");
      router.refresh();
      fetchData(token);
    } catch {
      toast.error("Failed to update college order");
    } finally {
      setSavingOrder(false);
    }
  };

  const filteredRequests = [...requests]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .filter((req) => {
      const matchesSearch =
        req.college_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.club_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.coordinator_name.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
      if (activeTab === "pending") return req.status === "Pending";
      if (activeTab === "approved") return req.status === "Approved";
      if (activeTab === "rejected") return req.status === "Rejected";
      return true;
    });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">College Requests</h2>
          <p className="text-xs text-gray-500 mt-0.5">Manage and review college registrations</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-64">
          <div className="relative w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search colleges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-gray-200 bg-white py-1.5 pl-8 pr-4 text-xs text-slate-900 outline-none transition-colors focus:border-red-500 placeholder:text-gray-400 shadow-sm"
            />
          </div>
          <button
            onClick={() => setIsReordering((prev) => !prev)}
            className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 transition-colors hover:border-red-300 hover:text-red-600"
          >
            {isReordering ? "Cancel Reorder" : "Reorder Approved"}
          </button>
        </div>
      </div>

      {/* Summary strip */}
      <div className="mb-2">
        <StatsCards stats={stats} />
      </div>

      {isReordering && (
        <div className="flex items-center justify-between rounded-lg border border-dashed border-red-200 bg-red-50/70 px-3 py-2">
          <p className="text-xs font-semibold text-red-700">Drag approved colleges to change the public display order.</p>
          <button
            onClick={saveCollegeOrder}
            disabled={savingOrder}
            className="rounded-md bg-red-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white disabled:opacity-50"
          >
            {savingOrder ? "Saving..." : "Save Order"}
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex overflow-hidden rounded-lg border border-gray-200 bg-gray-50/50 shadow-sm p-1 w-fit">
        {["overview","pending","approved","rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-xs font-bold capitalize rounded-md transition-all ${
              activeTab === tab
                ? "bg-white text-slate-900 shadow-sm ring-1 ring-gray-200/50"
                : "text-gray-500 hover:text-slate-900 hover:bg-gray-100/50"
            }`}
          >
            {tab === "overview" ? "All Requests" : tab}
          </button>
        ))}
      </div>

      {filteredRequests.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50">
          <p className="text-gray-400 text-sm">No requests found for this category.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRequests.map((request) => (
            <div
              key={request._id}
              draggable={isReordering && request.status === "Approved"}
              onDragStart={() => setDraggedRequestId(request._id)}
              onDragOver={(e) => isReordering && request.status === "Approved" && e.preventDefault()}
              onDrop={() => handleReorderDrop(request)}
              className={isReordering && request.status === "Approved" ? "cursor-grab" : ""}
            >
              <RequestCard
                request={request}
                onViewDetails={(req) => { setSelectedRequest(req); setIsDetailsOpen(true); }}
                onAction={handleActionClick}
              />
            </div>
          ))}
        </div>
      )}

      <RequestDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        request={selectedRequest}
        currentUser={currentUser}
        onUpdate={() => fetchData(token)}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, action: null, request: null, loading: false })}
        onConfirm={executeAction}
        loading={confirmDialog.loading}
        {...getConfirmDialogContent()}
      />
    </div>
  );
}
