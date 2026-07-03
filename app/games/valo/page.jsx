import EventStructure from "@/components/bgmi/eventStructure";
import EventSlider from "@/components/EventSlider";
import Navbar from "@/components/Navbar/Navbar";
import GameOrganizers from "@/components/GameOrganisers";
const bgmiSlides = [
  { image: "/valo/1.png" },
  { image: "/valo/33.png" },
  
];

const organizers = [
  {
    club: "Clutch",
    college: "IIIT Kota",
    leader: "Rahul Tiwari",
    role: "Clutch Coordinator & BGMI Organiser",
    logo: "/logos/clutch.png",
    personImage: "/developers/rahul.jpg",
  },
  
];


export default function BGMIPage() {
  return (
    <>
     <Navbar />
      <EventSlider
        slides={bgmiSlides}
        title="Valorant PC"
        subtitle="Championship"
        description="Drop into the battleground, outplay your opponents, and fight for the championship title. Squad up and compete against the best IIIT teams from across the nation."
        primaryBtn={{
          text: "Register Now",
          href: "/register",
        }}
        secondaryBtn={{
          text: "Rulebook",
          href: "/games/valo/rulebook",
        }}
      />

      {/* Add the remaining BGMI sections below */}
      <GameOrganizers organizers={organizers}/>

      <EventStructure/>
    </>
  );
}