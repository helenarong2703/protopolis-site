import "./News.css";

export default function News() {
  return (
    <section className="news">
      <div className="news__label">TRANSMISSIONS</div>
      <h2 className="news__heading">News</h2>
      <div className="news__placeholder">
        <div className="news__placeholder-icon">
          {"\u25C7"} Signal incoming...
        </div>
        <div className="news__placeholder-text">
          Lab dispatches and field notes will appear here as the prototype
          evolves.
        </div>
      </div>
    </section>
  );
}
