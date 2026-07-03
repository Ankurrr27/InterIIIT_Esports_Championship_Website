"use client";

import Link from "next/link";
import { Menu, Search, User, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "ABOUT", href: "/" },
    { name: "EVENTS", href: "/event-details" },
    { name: "REGISTRATION", href: "/register" },
    { name: "RULEBOOK", href: "/rules" },
    { name: "CONTACT", href: "/support" },
  ];

  return (
    <nav className="sticky top-0 z-50 h-16 border-b border-white/10 bg-[#0d0d0d]">
      <div className="flex h-full">

        {/* Left Logo Block */}
        <div className="relative flex w-[320px] items-center bg-[#111] px-6">

          <div
            className="absolute right-[-32px] top-0 h-full w-10 bg-[#111]"
            style={{
              clipPath: "polygon(0 0,100% 0,60% 100%,0 100%)",
            }}
          />

          <Link href="/" className="flex items-center gap-3">

            <img
              src="/IIITians-Network-Logo-Light.png"
              className="h-8"
            />

            <img
              src="/IEC LOGO Black.png"
              className="h-15 invert"
            />

            <div>
              <h1 className="text-sm font-bold text-white">
                INTER IIIT
              </h1>

              <p className="text-[11px] uppercase tracking-wider text-zinc-400">
                ESPORTS CHAMPIONSHIP
              </p>
            </div>

          </Link>
        </div>

        {/* Desktop */}
        <div className="hidden flex-1 items-center justify-between px-10 lg:flex">

          <div className="flex items-center gap-9">

            {links.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-[12px] font-semibold tracking-[0.15em] text-zinc-300 transition hover:text-white after:absolute after:-bottom-[22px] after:left-0 after:h-[2px] after:w-0 after:bg-red-500 after:transition-all hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}

          </div>

          <div className="flex items-center gap-5">

            <Search
              size={18}
              className="cursor-pointer text-zinc-300 hover:text-white"
            />

            <User
              size={18}
              className="cursor-pointer text-zinc-300 hover:text-white"
            />

            <Link
              href="/register"
              className="bg-red-600 px-6 py-2 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-red-500"
            >
              Register
            </Link>

          </div>
        </div>

        {/* Mobile */}
        <div className="ml-auto flex items-center px-5 lg:hidden">

          <button
            onClick={() => setOpen(!open)}
            className="text-white"
          >
            {open ? <X /> : <Menu />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}

      <div
        className={`overflow-hidden bg-[#111] transition-all duration-300 ${
          open ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col p-6">

          {links.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-4 text-sm font-semibold tracking-wider text-white"
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/register"
            className="mt-5 bg-red-600 py-3 text-center font-bold uppercase tracking-wider text-white"
          >
            Register
          </Link>

        </div>
      </div>
    </nav>
  );
}