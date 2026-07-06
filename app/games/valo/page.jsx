import EventSlider from "@/components/EventSlider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

const valoSlides = [
  { image: "/valo/1.png" },
  { image: "/valo/33.png" },
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
      <Footer />
    </>
  );
}
