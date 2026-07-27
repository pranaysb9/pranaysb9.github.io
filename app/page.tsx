import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import OpenSource from "@/components/sections/OpenSource";
import Experience from "@/components/sections/Experience";
import OtherExperiences from "@/components/sections/OtherExperiences";
import EngineeringNotes from "@/components/sections/EngineeringNotes";
import Achievements from "@/components/sections/Achievements";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects />
      <OpenSource />
      <Experience />
      <OtherExperiences />
      <EngineeringNotes />
      <Achievements />
      <Footer />
    </main>
  );
}
