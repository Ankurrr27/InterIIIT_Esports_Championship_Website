import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

import Hero from "./components/Hero";
import SupportCategories from "./components/SupportCategories";
import ContactSection from "./components/ContactSection";
import DeveloperSection from "@/components/DeveloperSection";

export const metadata = {
  title: "Support | IEC Esports",
  description: "Get help and support for Inter IIIT Esports Championship.",
};

export default function SupportPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-white text-slate-900 flex flex-col">
      <Navbar />

      <div className="relative flex-grow w-full">
        <Hero />
        <SupportCategories />
        <ContactSection />
        {/* <DeveloperSection /> */}
      </div>

      <Footer />
    </main>
  );
}
