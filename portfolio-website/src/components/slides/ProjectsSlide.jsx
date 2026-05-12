import { useEffect, useState } from "react";

import ProjectsToolbar from "./projects/ProjectsToolbar";
import ProjectsList from "./projects/ProjectsList";
import ProjectOverlay from "./projects/ProjectOverlay";
import projects from "../../../data/projects";

export default function ProjectsSlide() {
  const [selectedTags, setSelectedTags] = useState(["all"]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const expandedProject = projects.find(project => project.id === expandedProjectId);

  useEffect(() => {
    if (!expandedProject) {
      return undefined;
    }

    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const originalOverscrollBehavior = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      document.documentElement.style.overscrollBehavior = originalOverscrollBehavior;
      window.scrollTo(0, scrollY);
    };
  }, [expandedProject]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setExpandedProjectId(null);
      }
    }

    if (expandedProject) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => window.removeEventListener("keydown", handleEscape);
  }, [expandedProject]);

  function handleTagChange(tag) {
    setExpandedProjectId(null);

    if (tag === "all") {
      setSelectedTags(["all"]);
      return;
    }

    setSelectedTags(prev => {
      const withoutAll = prev.filter(t => t !== "all");

      if (withoutAll.includes(tag)) {
        const nextTags = withoutAll.filter(t => t !== tag);
        return nextTags.length > 0 ? nextTags : ["all"];
      }

      return [...withoutAll, tag];
    });
  }

  const filteredProjects = selectedTags.includes("all")
  ? projects
  : projects.filter(p =>
      selectedTags.some(tag => p.tags.includes(tag))
    );
  const sortedProjects = [...filteredProjects].sort((projectA, projectB) => {
    if (sortOrder === "oldest") {
      return projectA.year - projectB.year;
    }

    if (sortOrder === "az") {
      return projectA.title.localeCompare(projectB.title);
    }

    return projectB.year - projectA.year;
  });

  return (
    <section className="projects-slide">
      <div className="projects-slide__intro">
        <p>Selected Work</p>
        <h1>Projects</h1>
      </div>

      <ProjectsToolbar
        selectedTags={selectedTags}
        onTagChange={handleTagChange}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />

      <div className="projects-slide__layout">
        <ProjectsList
          projects={sortedProjects}
          expandedProjectId={expandedProjectId}
          onToggleProject={projectId =>
            setExpandedProjectId(currentId =>
              currentId === projectId ? null : projectId
            )
          }
        />

        {sortedProjects.length === 0 && (
          <p className="projects-slide__empty">No projects match the current filters.</p>
        )}
      </div>

      {expandedProject && (
        <ProjectOverlay
          project={expandedProject}
          onClose={() => setExpandedProjectId(null)}
        />
      )}
    </section>
  );

}
