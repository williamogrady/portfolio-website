import { useState } from "react";

import ProjectsToolbar from "./projects/ProjectsToolbar";
import ProjectsList from "./projects/ProjectsList";
import projects from "../../../data/projects";

export default function ProjectsSlide() {
  const [selectedTags, setSelectedTags] = useState(["all"]);
  const [expandedProjectId, setExpandedProjectId] = useState(null);

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
  const featuredProject = filteredProjects[0] ?? null;

  return (
    <section className="projects-slide">
      <div className="projects-slide__intro">
        <p>Selected Work</p>
        <h1>Projects</h1>
      </div>

      <ProjectsToolbar
        selectedTags={selectedTags}
        onTagChange={handleTagChange}
      />

      <div className="projects-slide__layout">
        <aside className="projects-slide__feature" aria-label="Featured project">
          {featuredProject ? (
            <>
              <span>{featuredProject.year}</span>
              <h2>{featuredProject.title}</h2>
              <p>{featuredProject.summary}</p>
              <div>
                {featuredProject.tags.slice(0, 3).map(tag => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </>
          ) : (
            <p>No projects match the current filters.</p>
          )}
        </aside>

        <ProjectsList
          projects={filteredProjects}
          expandedProjectId={expandedProjectId}
          onToggleProject={setExpandedProjectId}
        />
      </div>
    </section>
  );

}
