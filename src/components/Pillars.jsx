import { Link } from "react-router-dom";
import { pillars } from "../data/pillars";
import "./Pillars.css";

function PillarCard({ number, title, summary, keywords, description, works, isActive, onClick }) {
  return (
    <div
      className={`pillar-card ${isActive ? "pillar-card--active" : ""}`}
      onClick={onClick}
    >
      <div className="pillar-card__header">
        <div className="pillar-card__header-left">
          <div className="pillar-card__header-top">
            <div className={`pillar-card__number ${isActive ? "pillar-card__number--active" : ""}`}>
              [{String(number).padStart(2, "0")}]
            </div>
            <h3 className={`pillar-card__title ${isActive ? "pillar-card__title--active" : ""}`}>
              {title}
            </h3>
          </div>
          {summary && (
            <p className="pillar-card__summary">{summary}</p>
          )}
          <div className="pillar-card__keywords">
            {keywords.map((kw, i) => (
              <span key={i} className="pillar-card__keyword">
                {kw}
              </span>
            ))}
          </div>
        </div>
        <div className={`pillar-card__chevron ${isActive ? "pillar-card__chevron--active" : ""}`}>
          {isActive ? "\u25B4" : "\u25BE"}
        </div>
      </div>
      {isActive && (
        <div className="pillar-card__body">
          {description && (
            <p className="pillar-card__description">{description}</p>
          )}
          {works && (
            <div className="pillar-card__works">
              <div className="pillar-card__works-label">Selected Works</div>
              <div className="pillar-card__works-grid">
                {works.map((w, i) => (
                  <div key={i} className="pillar-card__work" onClick={w.slug ? (e) => e.stopPropagation() : undefined}>
                    <div className="pillar-card__work-title">
                      {w.slug ? (
                        <Link to={`/${w.slug}`} className="pillar-card__work-link">
                          {w.t} {"\u2197"}
                        </Link>
                      ) : (
                        w.t
                      )}
                    </div>
                    <div className={`pillar-card__work-meta ${w.v ? "pillar-card__work-meta--italic" : ""}`}>
                      {w.a}
                      {w.v ? ` \u2014 ${w.v}` : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
