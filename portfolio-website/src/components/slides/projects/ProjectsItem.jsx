function ProjectsItem({ project, isExpanded, onToggle }) {
  const previewImage = project.images?.[0] ?? project.color;
  const previewStyle = typeof previewImage === "string" && previewImage.startsWith("#")
    ? { "--project-card-color": previewImage }
    : { "--project-image": `url(${typeof previewImage === "string" ? previewImage : previewImage.src})` };

  function handleProjectClick(event) {
    if (event.target.closest("a, button")) {
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
      className="project-item"
      role="button"
      tabIndex="0"
      aria-expanded={isExpanded}
      onClick={handleProjectClick}
      onKeyDown={handleProjectKeyDown}
    >
      <div
        className="project-item__preview"
        style={previewStyle}
        aria-hidden="true"
      >
        <span className="project-item__preview-glow" />
      </div>

      <div className="project-item__content">
        <div className="project-item__meta">
          <span>{project.year}</span>
          <span>{project.tags[0]}</span>
        </div>

        <header className="project-item__header">
          <h2>{project.title}</h2>
          <p className="project-item__tagline">{project.tagline}</p>
        </header>
      </div>
    </article>
  );
}

export default ProjectsItem;
