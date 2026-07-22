import { Navbar } from "@/layout/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/sections/Hero";
import { Stats } from "@/sections/Stats";
import { About } from "@/sections/About";
import { MissionVision } from "@/sections/MissionVision";
import { DevStack } from "@/sections/DevStack";
import { Volunteering } from "@/sections/Volunteering";
import { Experience } from "@/sections/Experience";
import { EducationRecognition } from "@/sections/EducationRecognition";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ScrollProgress />
      <main>
        <Hero />
        <About />
        <MissionVision />
        <DevStack />
        <Volunteering />
        <Experience />
        <EducationRecognition />
        <Stats />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}

export default App;
