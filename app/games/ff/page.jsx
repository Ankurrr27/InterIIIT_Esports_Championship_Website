import EventSlider from "@/components/EventSlider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import GameOverview from "@/components/GameOverview";
import GameMapSection from "@/components/GameMapSection";
import GameOrganizers from "@/components/GameOrganisers";
import GameLeaderboard from "@/components/GameLeaderboard";

const ffSlides = [
  { image: "/ff/1.png" },
  { image: "/ff/11.png" },
];

const ffStats = [
  { label: "Squad Size", value: "4", note: "The active roster stays compact and easy to coordinate." },
  { label: "Match Style", value: "Fast", note: "Quick fights, quick resets, and constant pressure." },
  { label: "Scoring", value: "Points", note: "Placement and eliminations shape the leaderboard." },
  { label: "Execution", value: "Clean", note: "Every rotate and revive needs discipline." },
];

const ffHighlights = [
  "Teams must register with the required squad size before verification closes.",
  "Lobby timing and player names need to match the official registration.",
  "Unfair tools, modified clients, and account sharing are not allowed.",
  "The point system rewards placement and controlled aggression.",
];

const ffSteps = [
  "Register the squad and confirm the roster.",
  "Complete verification before the lobby window.",
  "Drop into the match and keep rotations tight.",
  "Push points through the bracket and final fight.",
];

const ffMaps = [
  { title: "Drop Pressure", image: "/ff/1.png", badge: "Early", focus: "Loot", description: "Fast landing decisions and first fights determine the tempo.", progress: "64%" },
  { title: "Zone Control", image: "/ff/11.png", badge: "Mid", focus: "Rotate", description: "Controlled rotates and survival keep the squad in the points race.", progress: "80%" },
  { title: "Showdown", image: "/ff/ourGamesFF.png", badge: "Late", focus: "Finish", description: "The last circle is all about timing, trades, and survival instinct.", progress: "92%" },
];

const ffOrganizers = [
  {
    club: "Sports Club IIIT Kalyani",
    college: "IIIT Kalyani",
    leader: "Advik Mukherjee",
    role: "Community Partner & Free Fire Organiser",
    game: "FF",
    description:
      "Responsible for Free Fire operations, player coordination, lobby flow and match-day support.",
    personImage: "/developers/Advik.jpeg",
    networkLogo: "/logos/iiitians-network.png",
    clubLogo: "/logos/SportsClubKalyani.jpg",
  },
];

const ffLeaderboard = [
  { rank: "01", team: "To be announced", played: "-", points: "-" },
  { rank: "02", team: "To be announced", played: "-", points: "-" },
  { rank: "03", team: "To be announced", played: "-", points: "-" },
  { rank: "04", team: "To be announced", played: "-", points: "-" },
];

export default function FFPage() {
  return (
    <>
      <Navbar />
      <EventSlider
        slides={ffSlides}
        title="Free Fire Max"
        subtitle="Championship"
        description="Drop into fast-paced squad battles, outplay your opponents, and fight for the championship title against the best IIIT teams."
        primaryBtn={{
          text: "Register Now",
          href: "/register",
        }}
        secondaryBtn={{
          text: "Rulebook",
          href: "/games/ff/rulebook",
        }}
      />
      <GameOverview
        eyebrow="FREE FIRE"
        title="Squad Brief"
        description="A fast, compact summary for a high-tempo battle royale page that still feels on-brand with the rest of the app."
        stats={ffStats}
        highlights={ffHighlights}
        steps={ffSteps}
        theme="blue"
      />
      <GameMapSection
        eyebrow="FREE FIRE"
        title="Zone Flow"
        description="Landing, rotating, and closing the last fight in a way that stays readable on mobile and desktop alike."
        maps={ffMaps}
        theme="blue"
      />
      <GameOrganizers organizers={ffOrganizers} theme="blue" />
      <GameLeaderboard title="Free Fire Leaderboard" rows={ffLeaderboard} theme="blue" />
      <Footer />
    </>
  );
}
