function ProjectsItem({ project, isExpanded, onToggle }) {
  const details = Array.isArray(project.details) ? project.details : [project.details];
  const images = project.images?.length > 0 ? project.images : [project.color];

  function handleProjectClick(event) {
    if (isExpanded || event.target.closest("a, button")) {
      return;
    }

    onToggle();
  }

  function handleProjectKeyDown(event) {
    if (isExpanded || event.target.closest("a, button")) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  }

  return (
    <article
      className={`project-item ${isExpanded ? "project-item--expanded" : ""}`}
      role={isExpanded ? undefined : "button"}
      tabIndex={isExpanded ? undefined : "0"}
      aria-expanded={isExpanded}
      onClick={handleProjectClick}
      onKeyDown={handleProjectKeyDown}
    >
      <div className="project-item__meta">
        <span>{project.year}</span>
      </div>

      <div className="project-item__content">
        {isExpanded && (
          <div className="project-item__gallery" aria-label={`${project.title} images`}>
            {images.map((color, index) => (
              <div
                key={`${color}-${index}`}
                className="project-item__gallery-image"
                style={{ "--project-card-color": color }}
                aria-hidden="true"
              />
            ))}
          </div>
        )}

        <header className="project-item__header">
          <div className="project-item__title">
            <h2>{project.title}</h2>
            {isExpanded && (
              <button
                className="project-item__close"
                type="button"
                aria-label={`Close ${project.title}`}
                onClick={onToggle}
              >
                Close
              </button>
            )}
          </div>

          {isExpanded && (
            <div className="project-item__tags">
              {project.tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </header>

        <p className="project-item__tagline">{project.tagline}</p>

        {isExpanded && (
          <div className="project-item__details">
            {details.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}

        {isExpanded && project.links?.length > 0 && (
          <div className="project-item__links">
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
        )}
      </div>

      {!isExpanded && (
        <div className="project-item__tags project-item__tags--column">
          {project.tags.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}

      {!isExpanded && (
        <div
          className="project-item__preview"
          style={{ "--project-card-color": project.color }}
          aria-hidden="true"
        />
      )}
    </article>
  );
}

export default ProjectsItem;
