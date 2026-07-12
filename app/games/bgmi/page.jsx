import EventSlider from "@/components/EventSlider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import GameOverview from "@/components/GameOverview";
import GameMapSection from "@/components/GameMapSection";
import GameOrganizers from "@/components/GameOrganisers";
import GameLeaderboard from "@/components/GameLeaderboard";

const bgmiSlides = [
  { image: "/bgmi/1.png" },
  { image: "/bgmi/22.png" },
  { image: "/bgmi/23.png" },
];

const bgmiStats = [
  { label: "Squad Size", value: "4", note: "Four starters lock the squad. Substitutes only if approved." },
  { label: "Mode", value: "BR", note: "Battle royale pacing with room-based match flow." },
  { label: "Focus", value: "Survive", note: "Positioning, rotations, and late-game discipline matter most." },
  { label: "Rule Tone", value: "Strict", note: "No hacks, scripts, teaming, or account sharing." },
];

const bgmiHighlights = [
  "Each squad must register with exactly four starting players.",
  "Room entry and lobby timing are handled through official coordination.",
  "Performance is judged by placement points and match consistency.",
  "Every lobby is built for fair play, clean rotations, and decisive end zones.",
];

const bgmiSteps = [
  "Register the squad and confirm the roster.",
  "Complete verification before fixtures begin.",
  "Join the room and report on time.",
  "Fight through each circle toward the grand finals.",
];

const bgmiMaps = [
  { title: "Opening Drop", image: "/bgmi/1.png", badge: "Drop Zone", focus: "Landing", description: "Strong early positioning sets the pace for the match.", progress: "62%" },
  { title: "Mid-Game Shift", image: "/bgmi/22.png", badge: "Rotate", focus: "Control", description: "Rotations and compound control decide who survives the mid-game.", progress: "78%" },
  { title: "Final Circle", image: "/bgmi/23.png", badge: "End Zone", focus: "Finish", description: "Late-game awareness and calm execution close out the leaderboard.", progress: "90%" },
];

const bgmiOrganizers = [
  {
    club: "Clutch",
    college: "IIIT Kota",
    leader: "Rahul Tiwari",
    role: "Clutch Coordinator & BGMI Organiser",
    game: "BGMI",
    description:
      "Official BGMI organizing partner responsible for tournament operations, player coordination, scheduling and match management.",
    personImage: "/developers/rahul.jpg",
    networkLogo: "/logos/iiitians-network.png",
    clubLogo: "/logos/clutch.jpg",
  },
];

const bgmiLeaderboard = [
  { rank: "01", team: "To be announced", played: "-", points: "-" },
  { rank: "02", team: "To be announced", played: "-", points: "-" },
  { rank: "03", team: "To be announced", played: "-", points: "-" },
  { rank: "04", team: "To be announced", played: "-", points: "-" },
];

export default function BGMIPage() {
  return (
    <>
      <Navbar />
      <EventSlider
        slides={bgmiSlides}
        title="Battlegrounds Mobile"
        subtitle="India Championship"
        description="Drop into the battleground, outplay your opponents, and fight for the championship title. Squad up and compete against the best IIIT teams from across the nation."
        primaryBtn={{
          text: "Register Now",
          href: "/register",
        }}
        secondaryBtn={{
          text: "Rulebook",
          href: "/games/bgmi/rulebook",
        }}
      />
      <GameOverview
        eyebrow="BGMI"
        title="Battlefield Brief"
        description="A compact match overview for squads that want the key details without leaving the page."
        stats={bgmiStats}
        highlights={bgmiHighlights}
        steps={bgmiSteps}
        theme="amber"
      />
      <GameMapSection
        eyebrow="BGMI"
        title="Map Flow"
        description="A simple visual flow of how the battleground usually plays out from landing to the final circle."
        maps={bgmiMaps}
        theme="amber"
      />
      <GameOrganizers organizers={bgmiOrganizers} theme="amber" />
      <GameLeaderboard title="BGMI Leaderboard" rows={bgmiLeaderboard} theme="amber" />
      <Footer />
    </>
  );
}
