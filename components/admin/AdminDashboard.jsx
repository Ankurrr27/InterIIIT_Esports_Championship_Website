"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { LogOut, RefreshCcw, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCards from "./StatsCards";
import RequestCard from "./RequestCard";
import RequestDetailsModal from "./RequestDetailsModal";
import ConfirmDialog from "./ConfirmDialog";

export default function AdminDashboard({ token, onLogout }) {
  const [stats, setStats] = useState({});
  const [requests, setRequests] = useState([]);
  const [adminTeams, setAdminTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    action: null,
    request: null,
    loading: false,
  });

  const fetchData = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      // Fetch stats
      const statsRes = await fetch("/api/college-requests/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.data);

      // Fetch requests
      const reqRes = await fetch("/api/college-requests?limit=100", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const reqData = await reqRes.json();
      if (reqData.success) setRequests(reqData.data);

      // Fetch teams
      const teamRes = await fetch("/api/admin/teams", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const teamData = await teamRes.json();
      if (teamData.success) setAdminTeams(teamData.teams);

    } catch (err) {
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleActionClick = (action, request) => {
    setConfirmDialog({
      isOpen: true,
      action,
      request,
      loading: false,
    });
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
        // PATCH for approve, reject, restore
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

      // Refresh data
      fetchData();
      
      // Close details modal if open
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
      case "approve":
        return {
          title: "Approve College Registration",
          description: `Are you sure you want to approve ${request.college_name}? They will appear publicly on the participating colleges list.`,
          confirmText: "Approve",
          isDestructive: false,
        };
      case "reject":
        return {
          title: "Reject Registration",
          description: `Are you sure you want to reject the registration for ${request.college_name}?`,
          confirmText: "Reject",
          isDestructive: true,
        };
      case "restore":
        return {
          title: "Restore to Pending",
          description: `Move ${request.college_name} back to pending status? This will remove them from the public list if currently approved.`,
          confirmText: "Restore",
          isDestructive: false,
        };
      case "delete":
        return {
          title: "Permanently Delete",
          description: `Are you sure you want to permanently delete the registration for ${request.college_name}? This action cannot be undone.`,
          confirmText: "Delete",
          isDestructive: true,
        };
      default:
        return {};
    }
  };

  // Filter requests based on tab and search
  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.college_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.club_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.coordinator_name.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === "pending") return req.status === "Pending";
    if (activeTab === "approved") return req.status === "Approved";
    if (activeTab === "rejected") return req.status === "Rejected";
    return true; // "overview" shows all
  });

  if (loading && !stats.total) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">IEC Admin</h1>
            <p className="text-xs text-gray-400">Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => fetchData(true)}
              className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors"
            >
              <RefreshCcw size={14} className={refreshing ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <div className="h-4 w-px bg-white/20" />
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <Tabs defaultValue="colleges" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/5 border border-white/10 p-1 mb-8">
            <TabsTrigger value="colleges">College Requests</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
          </TabsList>

          <TabsContent value="colleges">
            <div className="mb-8">
              <StatsCards stats={stats} />
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full lg:w-auto">
                <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10 p-1 lg:w-auto lg:inline-flex">
                  <TabsTrigger value="overview">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="relative w-full lg:w-72">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search colleges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-sm text-white outline-none transition-colors focus:border-red-500"
                />
              </div>
            </div>

            {filteredRequests.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5">
                <p className="text-gray-400">No requests found for this category.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredRequests.map((request) => (
                  <RequestCard
                    key={request._id}
                    request={request}
                    onViewDetails={(req) => {
                      setSelectedRequest(req);
                      setIsDetailsOpen(true);
                    }}
                    onAction={handleActionClick}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="teams">
             <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <table className="w-full text-left text-sm text-slate-400">
                  <thead className="bg-black/40 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-semibold tracking-wider">Team Name</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">College</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Game</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Members</th>
                      <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                      <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {adminTeams.map((team) => (
                      <tr key={team._id} className="transition-colors hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-medium text-white">{team.name}</td>
                        <td className="px-6 py-4 text-slate-300">{team.college}</td>
                        <td className="px-6 py-4 text-slate-500">{team.game}</td>
                        <td className="px-6 py-4 text-slate-500">{team.members?.length || 0} / {team.maxPlayers}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${team.isRegistered ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
                            {team.isRegistered ? "Registered" : "Pending"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button 
                            onClick={async () => {
                              if(confirm('Are you sure you want to delete this team?')) {
                                try {
                                  const res = await fetch(`/api/admin/teams?teamId=${team._id}`, {
                                    method: 'DELETE',
                                    headers: { Authorization: `Bearer ${token}` }
                                  });
                                  const data = await res.json();
                                  if(data.success) {
                                    toast.success("Team deleted");
                                    fetchData();
                                  } else {
                                    toast.error(data.message);
                                  }
                                } catch(err) {
                                  toast.error("Failed to delete team");
                                }
                              }
                            }}
                            className="text-xs font-semibold text-red-500 hover:text-red-400 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {adminTeams.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                          No teams found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
          </TabsContent>
        </Tabs>
      </main>

      <RequestDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        request={selectedRequest}
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
