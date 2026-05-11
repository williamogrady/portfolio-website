function ProjectsItem({ project, isExpanded, onToggle }) {
  return (
    <article className={`project-item ${isExpanded ? "project-item--expanded" : ""}`}>
      <button
        className="project-item__header"
        type="button"
        aria-expanded={isExpanded}
        onClick={onToggle}
      >
        <div>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
        </div>

        <span className="project-item__year">{project.year}</span>
      </button>

      <div className="project-item__tags">
        {project.tags.map(tag => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="project-item__details" aria-hidden={!isExpanded}>
        <div className="project-item__details-inner">
          <p>{project.details}</p>
          {project.links?.length > 0 && (
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
      </div>
    </article>
  );
}

export default ProjectsItem;
