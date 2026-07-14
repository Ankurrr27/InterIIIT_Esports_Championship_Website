import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { dbConnect } from "@/lib/mongodb";
import IECTeamMember from "@/lib/models/IECTeamMember";
import DeveloperSection from "@/components/DeveloperSection";
import TeamSection from "@/components/TeamSection";

const crewStats = [
  { value: "03", label: "Core Members" },
  { value: "24/7", label: "Event Support" },
  { value: "IEC", label: "Championship Crew" },
];

export const metadata = {
  title: "IEC Team | IEC Esports",
  description: "Meet the IEC team behind the Inter IIIT Esports Championship.",
};

export default async function IecTeamPage() {
  await dbConnect();
  
  // Fetch team members from database directly in the Server Component
  const teamMembers = await IECTeamMember.find({}).sort({ order: 1, createdAt: 1 }).lean();

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <Navbar />

      

      <TeamSection />

      

      <Footer />
    </main>
  );
}
