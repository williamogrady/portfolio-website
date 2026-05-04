function ProjectsItem({ project, isExpanded, onToggle }) {
  return (
    <article className={`project-item ${isExpanded ? "project-item--expanded" : ""}`}>
      <button className="project-item__header" onClick={onToggle}>
        <div>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
        </div>

        <span>{project.year}</span>
      </button>

      <div className="project-item__tags">
        {project.tags.map(tag => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      {isExpanded && (
        <div className="project-item__details">
          <p>{project.details}</p>
        </div>
      )}
    </article>
  );
}

export default ProjectsItem;