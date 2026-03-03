import { useState, useEffect } from "react";
import NoiseCanvas from "./components/NoiseCanvas";
import FloatingGlyphs from "./components/FloatingGlyphs";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Pillars from "./components/Pillars";
import Initiative from "./components/Initiative";
import Team from "./components/Team";
import Resources from "./components/Resources";
import News from "./components/News";
import Contact from "./components/Contact";

export default function App() {
  const [activePillar, setActivePillar] = useState(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const t = setInterval(() => {
      setLoadProgress((p) => {
        if (p >= 100) {
          clearInterval(t);
          setTimeout(() => setLoaded(true), 300);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 80);
    return () => clearInterval(t);
  }, []);

  if (!loaded) {
    return (
      <div className="loading-screen">
        <div className="loading-screen__label">INITIALIZING PROTOPOLIS</div>
        <div className="loading-screen__bar-bg">
          <div
            className="loading-screen__bar-fill"
            style={{ width: `${Math.min(loadProgress, 100)}%` }}
          />
        </div>
        <div className="loading-screen__progress">
          {Math.min(Math.floor(loadProgress), 100)}% {"\u2014"} compiling
          protocols
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <NoiseCanvas />
      <FloatingGlyphs />
      <div className="scanline" />
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      <Pillars activePillar={activePillar} setActivePillar={setActivePillar} />
      <Initiative />
      <Team />
      <Resources />
      <News />
      <Contact />
    </div>
  );
}
