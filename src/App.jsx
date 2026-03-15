import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
import ProjectPage from "./components/ProjectPage";
import { projects } from "./data/projects";

function HomePage({ theme, setTheme }) {
  const [activePillar, setActivePillar] = useState(null);
  const [activeSection, setActiveSection] = useState("about");

  return (
    <>
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} theme={theme} setTheme={setTheme} />
      <Hero />
      <Pillars activePillar={activePillar} setActivePillar={setActivePillar} />
      <Initiative />
      <Team />
      <Resources />
      <News />
      <Contact />
    </>
  );
}

export default function App() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
      return saved;
    }
    return "dark";
  });

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
      <Routes>
        <Route path="/" element={<HomePage theme={theme} setTheme={setTheme} />} />
        {projects.map((p) => (
          <Route
            key={p.slug}
            path={`/${p.slug}`}
            element={<ProjectPage project={p} theme={theme} setTheme={setTheme} />}
          />
        ))}
      </Routes>
    </div>
  );
}
