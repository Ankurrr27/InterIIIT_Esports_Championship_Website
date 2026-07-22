import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import TeamClientWrapper from "./components/TeamClientWrapper";

const stats = [
  { label: "Team Modes", value: "03", detail: "BGMI, Valorant, Free Fire" },
  { label: "Roster Lock", value: "1", detail: "One verified squad per player" },
  { label: "Support", value: "Live", detail: "Help for invites and team issues" },
];

const steps = [
  {
    number: "01",
    title: "Create or Join",
    copy: "Captains can create squads while players can enter invite codes to join their team.",
  },
  {
    number: "02",
    title: "Verify Roster",
    copy: "Keep names, college details, and game choice clean before the bracket is locked.",
  },
  {
    number: "03",
    title: "Compete Together",
    copy: "Use the team dashboard to track members and stay ready for match-day instructions.",
  },
];

export const metadata = {
  title: "Teams | IEC Esports",
  description: "Create, join, and manage your IEC esports squad.",
};

export default function UserTeamPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      <TeamClientWrapper>
     


      </TeamClientWrapper>

      <Footer />
    </main>
  );
}
