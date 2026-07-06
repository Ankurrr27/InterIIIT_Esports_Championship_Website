import Hero_event from "@/components/Hero/Hero_event"
import Navbar from "@/components/Navbar/Navbar";
import About from "./About";
import Campuses from "./Campuses";
import Timeline from "./Timeline";
import Footer from "@/components/Footer";

export default function EventDetailsPage() {
  return (
    <main className="overflow-x-hidden bg-slate-950 text-white">
      <Navbar />
      <Hero_event />
      <About />
     
      <Timeline />
       <Campuses />
      <Footer />
    </main>
  );
}
