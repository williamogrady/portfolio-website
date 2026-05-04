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

  return (
    <section className="projects-slide">
      <h1>Projects</h1>

      <ProjectsToolbar
        selectedTags={selectedTags}
        onTagChange={handleTagChange}
      />

      <ProjectsList
        projects={filteredProjects}
        expandedProjectId={expandedProjectId}
        onToggleProject={setExpandedProjectId}
      />
    </section>
  );

}