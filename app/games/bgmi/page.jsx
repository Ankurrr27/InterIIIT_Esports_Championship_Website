import EventStructure from "@/components/bgmi/eventStructure";
import EventSlider from "@/components/EventSlider";
import Navbar from "@/components/Navbar/Navbar";
import GameOrganizers from "@/components/GameOrganisers";
const bgmiSlides = [
  { image: "/bgmi/1.png" },
  { image: "/bgmi/22.png" },
  { image: "/bgmi/23.png" },
];

const organizers = [
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

    clubLogo: "/logos/clutch.png",
  },
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

      {/* Add the remaining BGMI sections below */}
      <GameOrganizers organizers={organizers}/>

      <EventStructure/>
    </>
  );
}