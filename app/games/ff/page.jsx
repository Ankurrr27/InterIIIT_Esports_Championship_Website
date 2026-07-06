import EventSlider from "@/components/EventSlider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

const ffSlides = [
  { image: "/ff/1.png" },
  { image: "/ff/11.png" },
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
      <Footer />
    </>
  );
}
