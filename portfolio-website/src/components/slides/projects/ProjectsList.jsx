import ProjectsItem from "./ProjectsItem";

function ProjectsList({
 projects,
  expandedProjectId,
  onToggleProject,
}) {
  return (
    <div className="project-list">
      {projects.map(project => (
        <ProjectsItem
          key={project.id}
          project={project}
          isExpanded={expandedProjectId === project.id}
          onToggle={() =>
            onToggleProject(
              expandedProjectId === project.id ? null : project.id
            )
          }
        />
      ))}
    </div>
  );
}

export default ProjectsList;



