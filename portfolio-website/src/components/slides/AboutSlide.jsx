import { useEffect, useRef, useState } from "react";

import slides from "../../../data/slides";

function AboutSlide() {
  const { title, image, description, contactMethods, actions, copyIcon, checkIcon } = slides.about;
  const [intro] = description;
  const [copiedValue, setCopiedValue] = useState(null);
  const copiedTimer = useRef(0);

  useEffect(() => {
    return () => window.clearTimeout(copiedTimer.current);
  }, []);

  function copyToClipboard(value) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value);
    }

    window.clearTimeout(copiedTimer.current);
    setCopiedValue(value);
    copiedTimer.current = window.setTimeout(() => {
      setCopiedValue(null);
    }, 1400);
  }

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

          <div className="about-slide__actions" aria-label="Copy contact details">
            {contactMethods.map(method => (
              <button
                key={method.value}
                className={`about-slide__button about-slide__button--copy${copiedValue === method.value ? " about-slide__button--copied" : ""}`}
                type="button"
                onClick={() => copyToClipboard(method.value)}
                aria-label={`Copy ${method.label} to clipboard`}
              >
                <img
                  className="about-slide__button-icon"
                  src={method.iconSrc}
                  alt=""
                  aria-hidden="true"
                />
                <span className="about-slide__button-label">{method.label}</span>
                <span className="about-slide__copy-status" aria-hidden="true">
                  <img src={copiedValue === method.value ? checkIcon : copyIcon} alt="" />
                </span>
                <span className="about-slide__copied-message" role="status">
                  {copiedValue === method.value ? "Copied to clipboard" : ""}
                </span>
              </button>
            ))}
          </div>

          <div className="about-slide__divider" aria-hidden="true" />

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
