import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./ProjectPage.css";

export default function ProjectPage({ project, theme, setTheme }) {
  return (
    <>
      <Navbar activeSection="" setActiveSection={() => {}} theme={theme} setTheme={setTheme} showNav={false} />
      <article className="project-page">
        <Link to="/" className="project-page__back">
          {"\u2190"} Back to Protopolis
        </Link>

        <div className="project-page__pillar-tag">
          PILLAR [{String(project.pillar).padStart(2, "0")}]
        </div>

        <h1 className="project-page__title">{project.title}</h1>

        <div className="project-page__authors">
          {project.authors.map((a, i) => (
            <div key={i} className="project-page__author">
              <span className="project-page__author-name">{a.name}</span>
              <span className="project-page__author-affiliation">
                {a.affiliation}
              </span>
            </div>
          ))}
        </div>

        <div className="project-page__meta">
          {project.date && (
            <span className="project-page__meta-item">{project.date}</span>
          )}
          {project.venue && (
            <span className="project-page__meta-item">{project.venue}</span>
          )}
        </div>

        {project.keywords && (
          <div className="project-page__keywords">
            {project.keywords.map((kw, i) => (
              <span key={i} className="project-page__keyword">
                {kw}
              </span>
            ))}
          </div>
        )}

        {/* Hero image */}
        {project.heroImage && (
          <div className="project-page__hero-image">
            <img src={project.heroImage} alt={project.heroImageAlt || project.title} />
          </div>
        )}

        {/* Abstract */}
        <div className="project-page__section">
          <div className="project-page__section-label">ABSTRACT</div>
          <p className="project-page__abstract">{project.abstract}</p>
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-page__link project-page__link--inline"
            >
              View on SSRN {"\u2197"}
            </a>
          )}
        </div>

        {/* Podcast */}
        {project.podcast && (
          <div className="project-page__section">
            <div className="project-page__section-label">PODCAST</div>
            <a
              href={project.podcast.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-page__podcast"
            >
              <img
                src={project.podcast.image}
                alt={project.podcast.title}
                className="project-page__podcast-image"
              />
              <div className="project-page__podcast-info">
                <div className="project-page__podcast-show">{project.podcast.show}</div>
                <div className="project-page__podcast-title">{project.podcast.title}</div>
                <div className="project-page__podcast-meta">{project.podcast.description}</div>
                <div className="project-page__podcast-cta">Listen on Spotify {"\u2197"}</div>
              </div>
            </a>
          </div>
        )}

        {/* Fieldwork gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="project-page__section">
            <div className="project-page__section-label">FIELDWORK</div>
            <div className="project-page__gallery">
              {project.gallery.map((img, i) => (
                <div key={i} className="project-page__gallery-item">
                  <img src={img.src} alt={img.caption || `Photo ${i + 1}`} />
                  {img.caption && (
                    <div className="project-page__image-caption">{img.caption}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
