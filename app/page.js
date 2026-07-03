import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero"
import Stats from "@/components/Stats/Stats"
import GameSection from "@/components/GameSection";
import DeveloperSection from "@/components/DeveloperSection";
import Footer from "@/components/Footer";

import { ST } from "next/dist/shared/lib/utils";
export default function Home() {
    return (
        <main>
        <Navbar />
        <Hero />
        <Stats />
        <GameSection />
        <DeveloperSection />
        <Footer />
        </main>
    );
}