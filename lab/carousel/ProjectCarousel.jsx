import { bottomRowProjects, topRowProjects } from "./dummyProjects";
import { getLabPath, navigateLab } from "./labNavigation";

const LOOP_COPIES = 4;

function loopingGroup(projects) {
  return Array.from({ length: LOOP_COPIES }, () => projects).flat();
}

function ProjectCard({ project, variant, tabbable = true }) {
  const href = getLabPath(`/carousel/${project.id}`);

  function handleClick(event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    navigateLab(`/carousel/${project.id}`);
  }

  return (
    <a
      href={href}
      className={`project-card${variant === "dark" ? " project-card--dark" : ""}`}
      style={{
        width: project.width,
        "--project-accent": project.accent,
      }}
      aria-label={`Open ${project.name}`}
      tabIndex={tabbable ? undefined : -1}
      onClick={handleClick}
    >
      <div className="project-card__art" aria-hidden="true">
        <div className="project-card__shape" />
        <span className="project-card__label">{project.name}</span>
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

export default function ProjectCarousel() {
  return (
    <section className="project-showcase" aria-label="Project showcase carousel">
      <div className="project-showcase__heading">
        <p className="project-showcase__eyebrow">Selected work</p>
        <h2 className="project-showcase__title">Projects</h2>
      </div>

      <div className="project-showcase__tracks">
        <MarqueeRow projects={topRowProjects} variant="light" direction="top" />
        <MarqueeRow projects={bottomRowProjects} variant="dark" direction="bottom" />
      </div>
    </section>
  );
}
