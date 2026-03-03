import { team } from "../data/team";
import "./Team.css";

function TeamMember({ name, role, affiliation }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="team-member">
      <div className="team-member__avatar">{initials}</div>
      <div className="team-member__name">{name}</div>
      <div className="team-member__role">{role}</div>
      {affiliation && (
        <div className="team-member__affiliation">{affiliation}</div>
      )}
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="team">
      <div className="team__label">COLLECTIVE</div>
      <h2 className="team__heading">Team</h2>
      <div className="team__grid">
        {team.map((m, i) => (
          <TeamMember key={i} {...m} />
        ))}
      </div>
    </section>
  );
}
