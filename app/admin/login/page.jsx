"use client";

import { useRouter } from "next/navigation";
import AdminLogin from "@/components/admin/AdminLogin";
import { useEffect, useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // If already logged in, redirect to dashboard
    if (localStorage.getItem("token")) {
      router.push("/admin/colleges");
    }
  }, [router]);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    document.cookie = "adminAuth=true; path=/; max-age=86400"; // Expires in 1 day
    router.push("/admin/colleges");
  };

  if (!mounted) return null;

  return <AdminLogin onLogin={handleLogin} />;
}
