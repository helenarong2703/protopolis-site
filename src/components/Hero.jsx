import { useState, useEffect } from "react";
import NetworkGraph from "./NetworkGraph";
import "./Hero.css";

const OUTPUTS = [
  "research papers",
  "digital prototypes",
  "open-source toolkits",
  "datasets",
  "AV storytelling",
  "exhibitions & installations",
  "participatory workshops",
  "curriculum",
];

export default function Hero() {
  const [glitchText, setGlitchText] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const iv = setInterval(
      () => {
        setGlitchText(true);
        setTimeout(() => setGlitchText(false), 150);
      },
      4000 + Math.random() * 3000
    );
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="about" className="hero">
      <div className="hero__scanline" />
      <div className="hero__top">
        <div className="hero__text">
          <div className="hero__status">
            {"\u25C9"} SYSTEMS ONLINE {"\u2014"} v0.{"\u221E"}
          </div>
          <h1
            className={`hero__title ${glitchText ? "hero__title--glitch" : ""}`}
          >
            Protopolis
          </h1>
          <div className="hero__tagline">
            /pro-TOP-uh-lis/ {"\u2014"} {"\u201C"}Perpetual beta for collective
            life.{"\u201D"}
          </div>
          <p className="hero__intro hero__intro--colored">
            Protopolis studies, diagnoses, and builds protocols for collective life
            in a world of <strong>humans, institutions, and autonomous systems</strong>. We work
            toward forms of coordination that remain <strong>open, emergent, and legible</strong>,
            to enable shared worlds to flourish in tomorrow{"\u2019"}s polis,
            networks, and habitats.
          </p>
        </div>
        <NetworkGraph />
      </div>
      <div
        className="hero__readmore"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "\u25B4 LESS" : "\u25BE READ MORE"}
      </div>
      {expanded && (
        <div className="hero__expanded">
          <p className="hero__body">
            {"\u201C"}Protopolis{"\u201D"} fuses {"\u201C"}proto{"\u201D"} and{" "}
            {"\u201C"}polis,{"\u201D"} evoking the iterative prototyping of civic
            protocols within the city-as-commons{"\u2014"}a public realm of
            governance, reciprocity, and collective imagination. The physical and
            digital are increasingly collapsing into a single, responsive fabric. In
            an era of self-writing code, multiple accelerating intelligences, eroding
            institutional trust, and cascading shocks - from global pandemics to
            climate risks - our coordination mechanisms must evolve as quickly as the
            crises they address. Guided by classical notions of the polis alongside
            contemporary philosophies of distributed agency, co-constitution of
            nature and artifice, and solarpunk imaginaries of commoning, the Lab
            treats the polis as a living prototype whose rules are adapted and
            written in an open-ended way.
          </p>
          <p className="hero__body">
            Unconstrained by any single discipline, Protopolis Lab operates in an
            omnidisciplinary mode, fluent in the vocabularies of designers,
            engineers, scientists, philosophers, artists, and social scientists
            alike. Through a blend of rigorous inquiry of both big data and small
            data, on-the-ground experimentation, and speculative design, the Lab
            catalogs and interprets emerging phenomena in the protocolized polis
            while also building civic toolkits, governance playbooks, and
            open-source protocol libraries{"\u2014"}resources that empower
            communities to co-create more resilient ways of living together. Beyond
            academic papers and conference talks, Protopolis Lab is dedicated to
            producing a range of other outputs, including digital and physical
            prototypes, open-source toolkits and datasets, audio-visual
            storytelling, exhibitions and installations, participatory workshops, and
            curriculum development.
          </p>
        </div>
      )}
      <div className="hero__outputs">
        <div className="hero__outputs-label">OUTPUTS {"\u2192"}</div>
        <div className="hero__outputs-list">
          {OUTPUTS.map((o, i) => (
            <span key={i} className="hero__output-tag">
              {o}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
