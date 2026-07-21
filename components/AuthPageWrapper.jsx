"use client";

import { useState, useEffect } from "react";
import AlreadyLoggedInCard from "./AlreadyLoggedInCard";

export default function AuthPageWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setChecking(false);
      return;
    }

    fetch("/api/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsLoggedIn(true);
        }
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div className="z-10 my-2 flex w-full max-w-[430px] justify-center px-4 sm:px-0 lg:my-0">
        <div className="flex h-[590px] max-h-[calc(100svh-7rem)] min-h-[520px] w-full items-center justify-center rounded-lg border border-white/10 bg-black/55 shadow-2xl backdrop-blur-xl">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-red-500" />
        </div>
      </div>
    );
  }

  if (isLoggedIn) {
    return <AlreadyLoggedInCard />;
  }

  return children;
}
