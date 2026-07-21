"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import LoginCard from "@/components/LoginCard";
import AuthPageWrapper from "@/components/AuthPageWrapper";
import { FaInstagram, FaDiscord, FaYoutube } from "react-icons/fa";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src="/register.png"
          alt="IEC esports background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/40 to-black/90" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <Navbar />

        <div className="flex flex-1 items-center justify-center px-4 py-6 sm:px-6 lg:justify-end lg:px-24">
          <AuthPageWrapper>
            <LoginCard />
          </AuthPageWrapper>
        </div>

          <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2 text-white sm:bottom-8 sm:left-8 lg:left-24">
            <span className="text-xs font-semibold tracking-widest text-gray-300 sm:text-sm">FOLLOW US</span>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/interiiit_esports" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-red-500"><FaInstagram size={20} /></a>
              <a href="https://discord.gg/iiitiansnetwork" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-red-500"><FaDiscord size={22} /></a>
              <a href="https://www.youtube.com/@iiitiansnetwork" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-red-500"><FaYoutube size={22} /></a>
            </div>
          </div>
      </div>
    </main>
  );
}