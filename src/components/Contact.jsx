import "./Contact.css";

export default function Contact() {
  return (
    <>
      <section id="contact" className="contact">
        <div className="contact__label">HANDSHAKE</div>
        <h2 className="contact__heading">Connect</h2>
        <p className="contact__desc">
          Protopolis Lab welcomes collaborators, practitioners, and curious minds
          working at the intersection of governance, technology, and collective
          life.
        </p>
        <div className="contact__links">
          <a href="mailto:hr2703@nyu.edu" className="contact__link contact__link--primary">
            hr2703@nyu.edu
          </a>
          <a
            href="https://tx.design"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link contact__link--secondary"
          >
            tx.design {"\u2192"}
          </a>
        </div>
      </section>
      <footer className="footer">
        <div className="footer__left">
          PROTOPOLIS LAB {"\u2014"} NYU SHANGHAI
        </div>
        <div className="footer__right">
          perpetual beta {"\u2014"} {new Date().getFullYear()}
        </div>
      </footer>
    </>
  );
}
