"use client";

import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import LoginCard from "@/components/LoginCard";

export default function LoginPage() {
  return (
    <main className="h-screen">
      <StarsBackground className="h-full w-full">
        <div className="relative z-10 flex h-full items-center justify-center">
          <LoginCard />
        </div>
      </StarsBackground>
    </main>
  );
}