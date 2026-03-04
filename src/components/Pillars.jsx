import { pillars } from "../data/pillars";
import "./Pillars.css";

function PillarCard({ number, title, keywords, description, works, isActive, onClick }) {
  return (
    <div
      className={`pillar-card ${isActive ? "pillar-card--active" : ""}`}
      onClick={onClick}
    >
      <div className={`pillar-card__number ${isActive ? "pillar-card__number--active" : ""}`}>
        [{String(number).padStart(2, "0")}]
      </div>
      <h3 className={`pillar-card__title ${isActive ? "pillar-card__title--active" : ""}`}>
        {title}
      </h3>
      <div className={`pillar-card__keywords ${isActive ? "pillar-card__keywords--expanded" : ""}`}>
        {keywords.map((kw, i) => (
          <span key={i} className="pillar-card__keyword">
            {kw}
          </span>
        ))}
      </div>
      {isActive && description && (
        <p className="pillar-card__description">{description}</p>
      )}
      {isActive && works && (
        <div className="pillar-card__works">
          <div className="pillar-card__works-label">Selected Works</div>
          {works.map((w, i) => (
            <div key={i} className="pillar-card__work">
              <div className="pillar-card__work-title">{w.t}</div>
              <div className={`pillar-card__work-meta ${w.v ? "pillar-card__work-meta--italic" : ""}`}>
                {w.a}
                {w.v ? ` \u2014 ${w.v}` : ""}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Pillars({ activePillar, setActivePillar }) {
  return (
    <section id="pillars" className="pillars">
      <div className="pillars__label">RESEARCH ARCHITECTURE</div>
      <h2 className="pillars__heading">Four Work Pillars</h2>
      <div className="pillars__grid">
        {pillars.map((p) => (
          <PillarCard
            key={p.number}
            {...p}
            isActive={activePillar === p.number}
            onClick={() =>
              setActivePillar(activePillar === p.number ? null : p.number)
            }
          />
        ))}
      </div>
    </section>
  );
}
