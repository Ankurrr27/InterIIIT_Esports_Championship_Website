import EventSlider from "@/components/EventSlider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

const bgmiSlides = [
  { image: "/bgmi/1.png" },
  { image: "/bgmi/22.png" },
  { image: "/bgmi/23.png" },
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
      <Footer />
    </>
  );
}
