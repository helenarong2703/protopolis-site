import "./Navbar.css";

const NAV_ITEMS = [
  { id: "about", label: "ABOUT" },
  { id: "pillars", label: "PILLARS" },
  { id: "initiative", label: "INITIATIVE" },
  { id: "team", label: "TEAM" },
  { id: "resources", label: "RESOURCES" },
  { id: "contact", label: "CONTACT" },
];

export default function Navbar({ activeSection, setActiveSection }) {
  const handleClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        PROTOPOLIS<span className="navbar__logo-dim">.LAB</span>
      </div>
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
    </nav>
  );
}
