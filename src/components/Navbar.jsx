import { Link } from "react-router-dom";
import "./Navbar.css";

const NAV_ITEMS = [
  { id: "about", label: "ABOUT" },
  { id: "pillars", label: "PILLARS" },
  { id: "initiative", label: "INITIATIVE" },
  { id: "team", label: "TEAM" },
  { id: "resources", label: "RESOURCES" },
  { id: "contact", label: "CONTACT" },
];

export default function Navbar({ activeSection, setActiveSection, theme, setTheme, showNav = true }) {
  const handleClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        PROTOPOLIS<span className="navbar__logo-dim">.LAB</span>
      </Link>
      <div className="navbar__right">
        {showNav && (
          <div className="navbar__links">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`navbar__link ${activeSection === item.id ? "navbar__link--active" : ""}`}
                onClick={(e) => handleClick(e, item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? "\u2600" : "\u263D"}
        </button>
      </div>
    </nav>
  );
}
