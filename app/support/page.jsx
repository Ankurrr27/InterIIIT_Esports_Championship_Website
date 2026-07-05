"use client";

import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

import Hero from "./components/Hero";
import SupportCategories from "./components/SupportCategories";
import ContactForm from "./components/ContactForm";
import ContactCards from "./components/ContactCards";
import EmergencyHelp from "./components/EmergencyHelp";

// import Footer from "@/components/Footer";

export default function SupportPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      <StarsBackground className="absolute inset-0 z-0 h-full w-full" />
      <div className="relative z-10 h-full w-full">
        <Hero />
        <SupportCategories />
        <ContactForm />
        <ContactCards />
        <EmergencyHelp />
        {/* <Footer /> */}
      </div>
    </main>
  );
}