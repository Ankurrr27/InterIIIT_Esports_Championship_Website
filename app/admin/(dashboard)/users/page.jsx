"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Search, Users as UsersIcon, Loader2, Shield, User, Mail, Gamepad2, Building2, Pencil, Trash2, X } from "lucide-react";

export default function UsersPage() {
  const [token, setToken] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) { 
        setToken(storedToken); 
        fetchUsers(storedToken); 
    }
  }, []);

  const fetchUsers = async (currentToken) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", { 
          headers: { Authorization: `Bearer ${currentToken}` } 
      });
      const data = await res.json();
      if (data.success) {
          setUsers(data.users);
      } else {
          toast.error("Failed to load users");
      }
    } catch { 
        toast.error("An error occurred"); 
    } finally { 
        setLoading(false); 
    }
  };

  const deleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user permanently?")) return;
    try {
      const res = await fetch(`/api/admin/users?userId=${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        toast.success("User deleted successfully");
        fetchUsers(token);
      } else {
        toast.error(data.message || "Failed to delete user");
      }
    } catch {
      toast.error("An error occurred while deleting");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name || "",
      email: user.email || "",
      collegeEmail: user.collegeEmail || "",
      college: user.college || "",
      game: user.game || ""
    });
  };

  const handleSaveEdit = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId: editingUser._id, ...editForm })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("User updated successfully");
        setEditingUser(null);
        fetchUsers(token);
      } else {
        toast.error(data.message || "Failed to update user");
      }
    } catch {
      toast.error("An error occurred while updating");
    } finally {
      setSaving(false);
    }
  };

  const filteredUsers = users.filter(u => {
    const searchStr = searchQuery.toLowerCase();
    return (
        (u.name && u.name.toLowerCase().includes(searchStr)) ||
        (u.email && u.email.toLowerCase().includes(searchStr)) ||
        (u.collegeEmail && u.collegeEmail.toLowerCase().includes(searchStr)) ||
        (u.college && u.college.toLowerCase().includes(searchStr))
    );
  });

  const totalUsers = users.length;
  const withTeams = users.filter(u => u.teamId).length;
  const withoutTeams = totalUsers - withTeams;

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Users Directory</h2>
          <p className="text-xs text-gray-500 mt-0.5">View and search all registered users</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users, emails, or colleges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-gray-200 bg-white py-1.5 pl-8 pr-4 text-xs text-slate-900 outline-none transition-colors focus:border-red-500 placeholder:text-gray-400 shadow-sm"
          />
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Users", value: totalUsers, color: "text-slate-900" },
          { label: "In a Team", value: withTeams, color: "text-emerald-600" },
          { label: "Without Team", value: withoutTeams, color: "text-orange-600" },
        ].map(stat => (
          <div key={stat.label} className="rounded-lg border border-gray-200 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-500 min-w-[800px]">
          <thead className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-400 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2.5 font-semibold">User details</th>
              <th className="px-4 py-2.5 font-semibold">Emails</th>
              <th className="px-4 py-2.5 font-semibold">College</th>
              <th className="px-4 py-2.5 font-semibold">Game</th>
              <th className="px-4 py-2.5 font-semibold">Team Status</th>
              <th className="px-4 py-2.5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && (
              <tr>
                <td colSpan="5" className="py-12 text-center">
                  <Loader2 className="animate-spin mx-auto text-red-500 mb-2" size={20} />
                  <p className="text-gray-400 text-xs">Loading users...</p>
                </td>
              </tr>
            )}
            {!loading && filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="py-16 text-center">
                  <UsersIcon size={32} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-400 text-sm font-medium">No users found</p>
                  <p className="text-gray-300 text-xs mt-1">Users will appear here once they register</p>
                </td>
              </tr>
            )}
            {filteredUsers.map((user) => (
              <tr key={user._id} className="transition-colors hover:bg-gray-50 group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center shrink-0">
                      <User size={14} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{user.name}</p>
                      <p className="text-[10px] font-mono text-gray-400 mt-0.5">ID: {user._id.substring(18)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-1">
                    <p className="flex items-center gap-1.5 text-xs text-slate-600 truncate max-w-[200px]" title={user.collegeEmail}>
                      <Shield size={11} className="text-emerald-500 shrink-0" />
                      {user.collegeEmail || "N/A"}
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-gray-400 truncate max-w-[200px]" title={user.email}>
                      <Mail size={11} className="shrink-0" />
                      {user.email || "N/A"}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <Building2 size={12} className="text-gray-400 shrink-0" />
                    <span className="truncate max-w-[150px]">{user.college || "N/A"}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 rounded bg-gray-100 border border-gray-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    <Gamepad2 size={10} className="text-gray-400" />
                    {user.game || "N/A"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {user.teamId ? (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-slate-800">
                        {user.teamId.name}
                      </span>
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${user.teamId.isRegistered ? "text-emerald-500" : "text-orange-500"}`}>
                        {user.teamId.isRegistered ? "Registered" : "Pending"}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 italic">No team</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="p-1.5 text-gray-400 hover:text-slate-900 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
                      title="Edit User"
                    >
                      <Pencil size={12} />
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="p-1.5 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded border border-red-200 transition-colors"
                      title="Delete User"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Edit User</h3>
              <button onClick={() => setEditingUser(null)} className="text-gray-400 hover:text-slate-900">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Personal Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wider">College Email</label>
                <input
                  type="email"
                  value={editForm.collegeEmail}
                  onChange={(e) => setEditForm({ ...editForm, collegeEmail: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wider">College</label>
                  <input
                    type="text"
                    value={editForm.college}
                    onChange={(e) => setEditForm({ ...editForm, college: e.target.value })}
                    disabled={!!editingUser.teamId}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 disabled:bg-gray-100 disabled:text-gray-500"
                    title={editingUser.teamId ? "Cannot change college while in a team" : ""}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wider">Game</label>
                  <select
                    value={editForm.game}
                    onChange={(e) => setEditForm({ ...editForm, game: e.target.value })}
                    disabled={!!editingUser.teamId}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    <option value="">Select</option>
                    <option value="BGMI">BGMI</option>
                    <option value="VALORANT">VALORANT</option>
                    <option value="FREEFIRE">FREEFIRE</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setEditingUser(null)}
                className="rounded-md px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={saving}
                className="rounded-md bg-red-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-red-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
