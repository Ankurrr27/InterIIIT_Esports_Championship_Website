"use client";

import { useState, useEffect } from "react";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only access localStorage on the client side
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setMounted(true);
  }, []);

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Don't render until client-side hydration is complete
  if (!mounted) return null;

  if (!token) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard token={token} onLogout={handleLogout} />;
}
