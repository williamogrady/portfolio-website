import slides from "../../../data/slides";

function AboutSlide() {
  const { title, image, description, actions } = slides.about;

  return (
    <section className="about-slide">
      <div className="about-slide__content">
        <figure className="about-slide__frame">
          <img src={image.src} alt={image.alt} />
        </figure>

        <div className="about-slide__text">
          <h1>{title}</h1>

          <div className="about-slide__description">
            {description.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="about-slide__actions" aria-label="About links">
        {actions.map(action => (
          <a
            key={action.href}
            className="about-slide__button"
            href={action.href}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noreferrer" : undefined}
          >
            {action.label}
          </a>
        ))}
      </div>
    </section>
  );
}

export default AboutSlide;
