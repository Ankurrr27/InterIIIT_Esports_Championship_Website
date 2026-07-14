"use client";
import { useState, useEffect } from "react";
import TeamActions from "./TeamActions";

export default function TeamClientWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <>
      {!isLoggedIn && children}
      <TeamActions />
    </>
  );
}
