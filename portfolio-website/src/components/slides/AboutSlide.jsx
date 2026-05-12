import slides from "../../../data/slides";

function AboutSlide() {
  const { title, image, description, actions } = slides.about;
  const [intro] = description;

  return (
    <section className="about-slide">
      <article className="about-slide__card">
        <div className="about-slide__frame">
          <img src={image.src} alt={image.alt} />
        </div>

        <div className="about-slide__text">
          <h1>{title}</h1>
          <p className="about-slide__role">Design Engineer</p>

          <div className="about-slide__description">
            <p>{intro}</p>
          </div>
        </div>

        <div className="about-slide__contact">
          <p>Interested in working together? Say hello.</p>

          <div className="about-slide__actions" aria-label="About links">
            {actions.map(action => (
              <a
                key={action.href}
                className="about-slide__button"
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noreferrer" : undefined}
              >
                {action.iconSrc ? (
                  <img
                    className="about-slide__button-icon"
                    src={action.iconSrc}
                    alt=""
                    aria-hidden="true"
                  />
                ) : (
                  <span
                    className={`about-slide__button-icon about-slide__button-icon--${action.icon}`}
                    aria-hidden="true"
                  />
                )}
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}

export default AboutSlide;
