"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { UserPlus, Key, Shield, ShieldAlert, Loader2, Users } from "lucide-react";

export default function StaffManagementTab({ token, currentUser }) {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [addForm, setAddForm] = useState({ name: "", email: "", password: "", role: "MODERATOR" });
  const [passwordForm, setPasswordForm] = useState({ newPassword: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchStaff(); }, [token]);

  const fetchStaff = async () => {
    try {
      const res = await fetch("/api/admin/staff", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setStaff(data.staff);
    } catch { toast.error("Failed to load staff"); }
    finally { setLoading(false); }
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(addForm)
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Staff member created!");
        setShowAddModal(false);
        setAddForm({ name: "", email: "", password: "", role: "MODERATOR" });
        fetchStaff();
      } else toast.error(data.error || "Failed to create staff");
    } catch { toast.error("An error occurred"); }
    finally { setSubmitting(false); }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/staff/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: selectedUser._id, newPassword: passwordForm.newPassword })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Password changed!");
        setShowPasswordModal(false);
        setPasswordForm({ newPassword: "" });
      } else toast.error(data.error || "Failed to change password");
    } catch { toast.error("An error occurred"); }
    finally { setSubmitting(false); }
  };

  const inputCls = "w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm text-slate-900 placeholder:text-gray-400 focus:border-red-500 focus:outline-none shadow-sm";
  const labelCls = "text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1 block";

  const admins = staff.filter(s => s.role === "ADMIN").length;
  const mods = staff.filter(s => s.role === "MODERATOR").length;

  if (loading) return <div className="flex justify-center py-16"><Loader2 className="animate-spin text-red-500" size={24} /></div>;

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Staff Management</h2>
          <p className="text-xs text-gray-500 mt-0.5">Admins and Moderators with portal access</p>
        </div>
        {currentUser?.role === "ADMIN" && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <UserPlus size={13} /> Add Staff
          </button>
        )}
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Staff", value: staff.length, color: "text-slate-900" },
          { label: "Admins", value: admins, color: "text-red-600" },
          { label: "Moderators", value: mods, color: "text-blue-600" },
        ].map(stat => (
          <div key={stat.label} className="rounded-lg border border-gray-200 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-gray-500">
          <thead className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-400 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2.5 font-semibold">Name</th>
              <th className="px-4 py-2.5 font-semibold hidden sm:table-cell">Email</th>
              <th className="px-4 py-2.5 font-semibold">Role</th>
              <th className="px-4 py-2.5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {staff.length === 0 && (
              <tr>
                <td colSpan="4" className="py-16 text-center">
                  <Users size={32} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-400 text-sm font-medium">No staff members</p>
                  <p className="text-gray-400 text-xs mt-1">Add the first admin or moderator above</p>
                </td>
              </tr>
            )}
            {staff.map((member) => (
              <tr key={member._id} className="transition-colors hover:bg-gray-50 group">
                <td className="px-4 py-2.5">
                  <p className="font-semibold text-slate-900 text-xs">{member.name}</p>
                  <p className="text-[10px] text-gray-400 sm:hidden mt-0.5 truncate">{member.email}</p>
                </td>
                <td className="px-4 py-2.5 text-gray-500 hidden sm:table-cell truncate max-w-[200px]">{member.email}</td>
                <td className="px-4 py-2.5">
                  <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${member.role === "ADMIN" ? "bg-red-50 text-red-700 border-red-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}>
                    {member.role === "ADMIN" ? <ShieldAlert size={9} /> : <Shield size={9} />}
                    {member.role}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  {(currentUser?.role === "ADMIN" || currentUser?.id === member._id) && (
                    <button
                      onClick={() => { setSelectedUser(member); setShowPasswordModal(true); }}
                      className="inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 border border-gray-200 bg-gray-50 hover:bg-gray-100 hover:text-slate-900 transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
                    >
                      <Key size={10} /> Change Password
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Add Staff Member</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-slate-900 text-xs">✕ Close</button>
            </div>
            <form onSubmit={handleAddStaff} className="space-y-3">
              <div><label className={labelCls}>Name *</label><input required type="text" placeholder="Full name" value={addForm.name} onChange={e => setAddForm({...addForm, name: e.target.value})} className={inputCls} /></div>
              <div><label className={labelCls}>Email *</label><input required type="email" placeholder="email@example.com" value={addForm.email} onChange={e => setAddForm({...addForm, email: e.target.value})} className={inputCls} /></div>
              <div><label className={labelCls}>Password *</label><input required type="text" placeholder="Set a password" value={addForm.password} onChange={e => setAddForm({...addForm, password: e.target.value})} className={inputCls} /></div>
              <div>
                <label className={labelCls}>Role *</label>
                <select value={addForm.role} onChange={e => setAddForm({...addForm, role: e.target.value})} className={inputCls}>
                  <option value="MODERATOR">Moderator</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 mt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-3 py-1.5 text-xs text-gray-500 hover:text-slate-900 transition-colors">Cancel</button>
                <button type="submit" disabled={submitting} className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-md text-xs font-bold uppercase tracking-wider disabled:opacity-50 transition-colors">
                  {submitting ? "Saving..." : "Save Staff"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Change Password</h3>
              <button onClick={() => setShowPasswordModal(false)} className="text-gray-400 hover:text-slate-900 text-xs">✕</button>
            </div>
            <p className="text-[10px] text-gray-400 mb-5 uppercase tracking-wider">For: {selectedUser?.email}</p>
            <form onSubmit={handleChangePassword} className="space-y-3">
              <div><label className={labelCls}>New Password *</label><input required type="text" placeholder="New password" value={passwordForm.newPassword} onChange={e => setPasswordForm({newPassword: e.target.value})} className={inputCls} /></div>
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 mt-4">
                <button type="button" onClick={() => setShowPasswordModal(false)} className="px-3 py-1.5 text-xs text-gray-500 hover:text-slate-900 transition-colors">Cancel</button>
                <button type="submit" disabled={submitting} className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-md text-xs font-bold uppercase tracking-wider disabled:opacity-50 transition-colors">
                  {submitting ? "Saving..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
