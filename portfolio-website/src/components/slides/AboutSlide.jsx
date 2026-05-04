function AboutSlide() {
  return (
    <section className="about-slide">
      <div className="about-slide__content">
        <figure className="about-slide__frame">
          <img src="/profile.jpg" alt="William O'Grady" />
        </figure>

        <p className="about-slide__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          vitae libero nec arcu porttitor tincidunt. Donec sed sem at massa
          faucibus luctus. Vivamus fermentum, justo vitae bibendum facilisis,
          lectus risus viverra nibh, vitae gravida nibh neque in risus.
        </p>
      </div>

      <div className="about-slide__actions" aria-label="About links">
        <a className="about-slide__button" href="/resume.pdf">
          Resume
        </a>
        <a className="about-slide__button" href="mailto:billy.ogrady2001@gmail.com">
          Email
        </a>
        <a
          className="about-slide__button"
          href="https://www.linkedin.com/in/william-ogrady"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}

export default AboutSlide;
