import EventSlider from "@/components/EventSlider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import GameOverview from "@/components/GameOverview";
import GameMapSection from "@/components/GameMapSection";
import GameOrganizers from "@/components/GameOrganisers";
import GameLeaderboard from "@/components/GameLeaderboard";

const valoSlides = [
  { image: "/valo/1.png" },
  { image: "/valo/33.png" },
];

const valoStats = [
  { label: "Team Size", value: "5", note: "Five agents make the core roster for every match." },
  { label: "Core Flow", value: "Veto", note: "Map veto and side choice set the tone early." },
  { label: "Win Condition", value: "Rounds", note: "Round control and clutch moments decide the bracket." },
  { label: "Tempo", value: "Sharp", note: "Fast resets, discipline, and communication stay central." },
];

const valoHighlights = [
  "Each roster must register five starting players and allowed substitutes.",
  "Players use registered Riot IDs and join the custom lobby on time.",
  "Map veto, overtime, and pause rules follow the official briefing.",
  "Fair play and clean comms keep the bracket moving smoothly.",
];

const valoSteps = [
  "Lock the five-player roster.",
  "Finish verification before the bracket starts.",
  "Complete map veto and lobby setup.",
  "Play the knockouts and push toward finals.",
];

const valoMaps = [
  { title: "Attack Plan", image: "/valo/1.png", badge: "Entry", focus: "Openers", description: "Fast utility and clean entries set up the round win.", progress: "68%" },
  { title: "Control Map", image: "/valo/33.png", badge: "Utility", focus: "Space", description: "Mid-round discipline and space control force the enemy off angles.", progress: "84%" },
];

const valoOrganizers = [
  {
    club: "Clutch",
    college: "IIIT Kota",
    leader: "Rahul Tiwari",
    role: "Clutch Coordinator & Valorant Organiser",
    game: "VALO",
    description:
      "Official Valorant organizing partner handling match rooms, brackets, player coordination and dispute support.",
    personImage: "/developers/rahul.jpg",
    networkLogo: "/logos/iiitians-network.png",
    clubLogo: "/logos/clutch.jpg",
  },
];

const valoLeaderboard = [
  { rank: "01", team: "To be announced", played: "-", points: "-" },
  { rank: "02", team: "To be announced", played: "-", points: "-" },
  { rank: "03", team: "To be announced", played: "-", points: "-" },
  { rank: "04", team: "To be announced", played: "-", points: "-" },
];

export default function ValorantPage() {
  return (
    <>
      <Navbar />
      <EventSlider
        slides={valoSlides}
        title="Valorant PC"
        subtitle="Championship"
        description="Enter tactical five-versus-five matches where coordination, precision, and clutch decision-making decide the championship."
        primaryBtn={{
          text: "Register Now",
          href: "/register",
        }}
        secondaryBtn={{
          text: "Rulebook",
          href: "/games/valo/rulebook",
        }}
      />
      <GameOverview
        eyebrow="VALORANT"
        title="Tactical Brief"
        description="The essentials for a sharp 5v5 bracket, laid out in the same dark competitive tone as the rest of the site."
        stats={valoStats}
        highlights={valoHighlights}
        steps={valoSteps}
        theme="red"
      />
      <GameMapSection
        eyebrow="VALORANT"
        title="Map Pool"
        description="A compact view of the tactical map flow and what each round usually asks of the team."
        maps={valoMaps}
        theme="red"
      />
      <GameOrganizers organizers={valoOrganizers} theme="red" />
      <GameLeaderboard title="Valorant Leaderboard" rows={valoLeaderboard} theme="red" />
      <Footer />
    </>
  );
}
