import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import EventSlider from "@/components/EventSlider";
import Stats from "@/components/Stats/Stats";
import GameSection from "@/components/GameSection";
import DeveloperSection from "@/components/DeveloperSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-slate-950 text-white">
      <Navbar />
      {/* <Hero /> */}
      <EventSlider />
      <Stats />
      <GameSection />
      <DeveloperSection />
      <Footer />
    </main>
  );
}