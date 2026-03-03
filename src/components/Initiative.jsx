import { useState } from "react";
import { initiative } from "../data/initiative";
import "./Initiative.css";

export default function Initiative() {
  const [showWorks, setShowWorks] = useState(false);

  return (
    <section id="initiative" className="initiative">
      <div className="initiative__label">RESEARCH INITIATIVE</div>
      <h2 className="initiative__heading">{initiative.title}</h2>
      <p className="initiative__desc">{initiative.description}</p>
      <div className="initiative__keywords">
        {initiative.keywords.map((kw, i) => (
          <span key={i} className="initiative__keyword">
            {kw}
          </span>
        ))}
      </div>
      <div
        className="initiative__toggle"
        onClick={() => setShowWorks(!showWorks)}
      >
        {showWorks ? "\u25BE HIDE WORKS" : "\u25B8 SHOW WORKS"}
      </div>
      {showWorks && (
        <div className="initiative__works">
          {initiative.works.map((w, i) => (
            <div key={i} className="initiative__work">
              <div className="initiative__work-title">{w.t}</div>
              <div className="initiative__work-meta">{w.a}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
