import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Header from "@/components/sections/Header";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Projects from "@/components/sections/Projects";
import OpenSource from "@/components/sections/OpenSource";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import EngineeringNotes from "@/components/sections/EngineeringNotes";
import GitHubActivity from "@/components/sections/GitHubActivity";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Header />
      <About />
      <Contact />
      <Projects />
      <OpenSource />
      <Experience />
      <Skills />
      <EngineeringNotes />
      <GitHubActivity />
      <Footer />
    </main>
  );
}
