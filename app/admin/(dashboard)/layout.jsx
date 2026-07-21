"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminNavbar from "@/components/admin/AdminNavbar";
import { Loader2 } from "lucide-react";

export default function AdminDashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Optional global refresh state if needed

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    // Validate token and fetch user
    fetch("/api/user/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && (data.user.role === "ADMIN" || data.user.role === "MODERATOR")) {
          setCurrentUser(data.user);
          setLoading(false);
        } else {
          localStorage.removeItem("token");
          document.cookie = "adminAuth=; path=/; max-age=0";
          router.push("/admin/login");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        document.cookie = "adminAuth=; path=/; max-age=0";
        router.push("/admin/login");
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "adminAuth=; path=/; max-age=0";
    router.push("/admin/login");
  };

  if (!mounted || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <AdminNavbar 
        currentUser={currentUser} 
        onLogout={handleLogout} 
        onRefresh={() => setRefreshTrigger(prev => prev + 1)}
        refreshing={false} // Would need context/props to wire this perfectly, for now basic implementation
      />
      
      {/* Pass token and user via React Context or just render children if children are client components handling their own fetching */}
      <main className="flex-1 mx-auto max-w-7xl p-4 w-full">
        {/* We can inject props into children if they are valid elements, or better yet, just use Context. For now, since children are server/client mixed in Next.js layouts, we can't easily pass props to children. 
        Instead, individual pages will read localStorage("token") themselves on mount. */}
        {children}
      </main>
    </div>
  );
}
