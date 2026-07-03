import EventStructure from "@/components/bgmi/eventStructure";
import EventSlider from "@/components/EventSlider";
import Navbar from "@/components/Navbar/Navbar";
import GameOrganizers from "@/components/GameOrganisers";
const bgmiSlides = [
  { image: "/ff/1.png" },
  { image: "/ff/11.png" },
 
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
        title="Free Fire Max"
        subtitle="Championship"
        description="Drop into the battleground, outplay your opponents, and fight for the championship title. Squad up and compete against the best IIIT teams from across the nation."
        primaryBtn={{
          text: "Register Now",
          href: "/register",
        }}
        secondaryBtn={{
          text: "Rulebook",
          href: "/games/ff/rulebook",
        }}
      />

      {/* Add the remaining BGMI sections below */}
      <GameOrganizers organizers={organizers}/>

      <EventStructure/>
    </>
  );
}