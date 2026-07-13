"use client";

import { useState, useEffect } from "react";
import StaffManagementTab from "@/components/admin/StaffManagementTab";

export default function StaffPage() {
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetch("/api/user/me", { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(res => res.json())
        .then(data => {
          if (data.success) setCurrentUser(data.user);
        });
    }
  }, []);

  if (!currentUser) return null;

  return (
    <div>
      <StaffManagementTab token={token} currentUser={currentUser} />
    </div>
  );
}
