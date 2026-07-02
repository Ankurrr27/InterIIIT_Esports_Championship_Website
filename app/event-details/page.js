import Hero_event from "@/components/Hero/Hero_event"
import Navbar from "@/components/Navbar/Navbar";
import About from "./About"
import Timeline from "./Timeline";
import FAQ from "./FAQ"
import Footer from "@/components/Footer";

export default function EventDetailsPage() {
  return (
    <main>
      <Navbar />
      <Hero_event />
      <About />
      <Timeline />
      <FAQ />
      <Footer />
    </main>
  );
}
