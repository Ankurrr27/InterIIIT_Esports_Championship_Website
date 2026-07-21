"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogOut, RefreshCcw } from "lucide-react";

export default function AdminNavbar({ currentUser, onLogout, onRefresh, refreshing }) {
  const pathname = usePathname();

  const navLinks = [
    { name: "College Requests", href: "/admin/colleges", roles: ["ADMIN", "MODERATOR"] },
    { name: "Users", href: "/admin/users", roles: ["ADMIN"] },
    { name: "Teams", href: "/admin/teams", roles: ["ADMIN"] },
    { name: "Leaderboard", href: "/admin/leaderboard", roles: ["ADMIN"] },
    { name: "IEC Team", href: "/admin/iec-team", roles: ["ADMIN"] },
    { name: "Staff", href: "/admin/staff", roles: ["ADMIN"] },
  ];

  const visibleLinks = navLinks.filter(link => link.roles.includes(currentUser?.role));

  return (
    <header className="sticky top-0 z-30 bg-black border-b border-white/10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-14 sm:h-14 sm:px-6 lg:px-8">
        {/* Logo + Nav */}
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/logos/iiitians-network.png"
              alt="IIITians Network"
              width={120}
              height={48}
              className="h-5 w-auto opacity-95 sm:h-9"
              priority
            />
            <span className="text-white opacity-50">|</span>
            <Image
              src="/logos/IEC LOGO Black.png"
              alt="IEC"
              width={88}
              height={88}
              className="h-9 w-auto invert opacity-95 sm:h-11"
              priority
            />
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold tracking-[0.1em] text-white">
                INTER IIIT
              </h1>
              <p className="text-[10px] text-slate-100">Esports Championship</p>
            </div>
            <span className="ml-2 hidden lg:inline-block rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
              Admin
            </span>
          </Link>

          <nav className="hidden md:flex items-center h-full">
            {visibleLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center h-14 px-3 text-xs font-semibold tracking-wide transition-colors ${
                    isActive
                      ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-red-500"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="text-[11px] text-white/40 hidden sm:block">
            {currentUser?.name}
            <span className="ml-2 px-1.5 py-0.5 rounded bg-white/10 text-white/70 font-bold uppercase tracking-wider text-[9px]">
              {currentUser?.role}
            </span>
          </div>

          <div className="h-4 w-px bg-white/10" />

          <button
            onClick={onRefresh}
            className="flex items-center gap-1.5 text-[11px] font-medium text-white/40 hover:text-white transition-colors"
          >
            <RefreshCcw size={13} className={refreshing ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <div className="h-4 w-px bg-white/10" />

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-[11px] font-medium text-red-500 hover:text-red-400 transition-colors"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
