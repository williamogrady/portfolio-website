import { useState } from "react";
import { createPortal } from "react-dom";

function ProjectOverlay({ project, onClose }) {
  const details = Array.isArray(project.details) ? project.details : [project.details];
  const images = project.images?.length > 0 ? project.images : [project.color];
  const documents = project.documents ?? [];
  const skills = project.skills ?? [];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const hasMultipleImages = images.length > 1;
  const activeImage = images[activeImageIndex];
  const activeImageStyle = typeof activeImage === "string" && activeImage.startsWith("#")
    ? { "--project-card-color": activeImage }
    : { "--project-image": `url(${typeof activeImage === "string" ? activeImage : activeImage.src})` };

  function showPreviousImage() {
    setActiveImageIndex(currentIndex =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1
    );
  }

  function showNextImage() {
    setActiveImageIndex(currentIndex =>
      currentIndex === images.length - 1 ? 0 : currentIndex + 1
    );
  }

  return createPortal(
    <div className="project-overlay" role="presentation" onClick={onClose}>
      <article
        className="project-overlay__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-${project.id}-title`}
        onClick={event => event.stopPropagation()}
      >
        <button
          className="project-overlay__close"
          type="button"
          aria-label={`Close ${project.title}`}
          onClick={onClose}
        >
          Close
        </button>

        <div className="project-overlay__gallery" aria-label={`${project.title} images`}>
          <div
            className="project-overlay__image"
            style={activeImageStyle}
            aria-hidden="true"
          />

          {hasMultipleImages && (
            <>
              <button
                className="project-overlay__image-button project-overlay__image-button--previous"
                type="button"
                aria-label="Show previous project image"
                onClick={showPreviousImage}
              >
                Previous
              </button>
              <button
                className="project-overlay__image-button project-overlay__image-button--next"
                type="button"
                aria-label="Show next project image"
                onClick={showNextImage}
              >
                Next
              </button>
              <p className="project-overlay__image-count">
                {activeImageIndex + 1} / {images.length}
              </p>
            </>
          )}
        </div>

        <div className="project-overlay__body">
          <header className="project-overlay__header">
            <p>{project.year}</p>
            <h2 id={`project-${project.id}-title`}>{project.title}</h2>
            <p>{project.tagline}</p>
          </header>

          <div className="project-overlay__details">
            {details.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <section className="project-overlay__section" aria-label="Tags">
            <h3>Tags</h3>
            <div className="project-overlay__chips">
              {project.tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>

          {skills.length > 0 && (
            <section className="project-overlay__section" aria-label="Skills">
              <h3>Skills</h3>
              <div className="project-overlay__chips">
                {skills.map(skill => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </section>
          )}

          {project.links?.length > 0 && (
            <section className="project-overlay__section" aria-label="Links">
              <h3>Links</h3>
              <div className="project-overlay__links">
                {project.links.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </section>
          )}

          {documents.length > 0 && (
            <section className="project-overlay__section" aria-label="Documents">
              <h3>Documents</h3>
              <div className="project-overlay__links">
                {documents.map(document => (
                  <a
                    key={document.href}
                    href={document.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {document.label}
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </div>,
    document.body
  );
}

export default ProjectOverlay;
