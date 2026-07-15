import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import TeamSection from "@/components/TeamSection";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "IEC Team | IEC Esports",
  description: "Meet the IEC team behind the Inter IIIT Esports Championship.",
};

export default function IecTeamPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <Navbar />

      <TeamSection />

      <Footer />
    </main>
  );
}