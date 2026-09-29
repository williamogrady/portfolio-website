import allProjects from "../../data/projects";
import { getProjectPath, navigateToPath } from "../projectNavigation";

const LOOP_COPIES = 4;

function loopingGroup(projects) {
  return Array.from({ length: LOOP_COPIES }, () => projects).flat();
}

function ProjectCard({ project, variant, tabbable = true }) {
  const href = getProjectPath(project.id);
  const image = project.thumbnail || project.images?.[0] || "";
  const emphasis = Math.max(1, Number(project.emphasis) || 1);
  const widthFactor = 1 + (emphasis - 1) * 0.15;

  function handleClick(event) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    navigateToPath(`/projects/${encodeURIComponent(project.id)}`);
  }

  return (
    <a
      href={href}
      className={`project-card${variant === "dark" ? " project-card--dark" : ""}`}
      style={{
        "--project-accent": project.color || "#b8ad9f",
        "--project-width-factor": widthFactor,
      }}
      aria-label={`Open ${project.title}`}
      tabIndex={tabbable ? undefined : -1}
      onClick={handleClick}
    >
      <div className="project-card__art" aria-hidden="true">
        {image && <img className="project-card__image" src={image} alt="" />}
        <div className="project-card__overlay" />
      </div>
    </a>
  );
}

function MarqueeRow({ projects, variant, direction }) {
  const group = loopingGroup(projects);

  return (
    <div className={`project-marquee project-marquee--${direction}`}>
      <div className="project-marquee__track">
        <div className="project-marquee__group">
          {group.map((project, index) => (
            <ProjectCard
              key={`${project.id}-${direction}-${index}`}
              project={project}
              variant={variant}
            />
          ))}
        </div>
        <div className="project-marquee__group" aria-hidden="true">
          {group.map((project, index) => (
            <ProjectCard
              key={`${project.id}-${direction}-loop-${index}`}
              project={project}
              variant={variant}
              tabbable={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectCarousel({ projects = allProjects }) {
  const topProjects = [...projects].slice(0, Math.ceil(projects.length / 2));
  const bottomProjects = [...projects].slice(Math.ceil(projects.length / 2));
  // Temporary: until a real full-list page exists, send visitors to the newest project.
  const mostRecentProject = projects.reduce(
    (latest, project) => (!latest || (project.year || 0) > (latest.year || 0) ? project : latest),
    null
  );

  function handleCtaClick(event) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    navigateToPath(`/projects/${encodeURIComponent(mostRecentProject.id)}`);
  }

  return (
    <section className="project-showcase" aria-label="Project showcase carousel">
      <div className="project-showcase__heading">
        <h2 className="project-showcase__title">Projects</h2>
      </div>

      <div className="project-showcase__tracks">
        <MarqueeRow projects={topProjects} variant="light" direction="top" />
        <MarqueeRow projects={bottomProjects} variant="dark" direction="bottom" />
      </div>

      {mostRecentProject && (
        <div className="project-showcase__cta-row">
          <a
            href={getProjectPath(mostRecentProject.id)}
            className="project-showcase__cta"
            onClick={handleCtaClick}
          >
            Show full list of projects
          </a>
        </div>
      )}
    </section>
  );
}