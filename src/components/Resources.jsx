import { resources } from "../data/resources";
import "./Resources.css";

export default function Resources() {
  return (
    <section id="resources" className="resources">
      <div className="resources__label">OPEN PROTOCOLS</div>
      <h2 className="resources__heading">Resources & Toolkits</h2>
      <p className="resources__desc">
        Building open-source civic toolkits, governance playbooks, and protocol
        libraries {"\u2014"} resources that empower communities to co-create
        more resilient ways of living together.
      </p>
      <div className="resources__grid">
        {resources.map((r, i) => (
          <div key={i} className="resource-card">
            <div>
              <h3 className="resource-card__title">{r.title}</h3>
              <p className="resource-card__desc">{r.desc}</p>
            </div>
            <div className="resource-card__footer">
              <span
                className="resource-card__status"
                style={{
                  color: r.statusColor,
                  borderColor: r.borderColor,
                }}
              >
                {r.status}
              </span>
              {r.link && (
                <a
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-card__link"
                >
                  VISIT {"\u2192"}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
