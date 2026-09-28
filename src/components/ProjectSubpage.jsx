import { useEffect, useState } from "react";

import allProjects from "../../data/projects";
import { getHomePath, getProjectPath, navigateToPath } from "../projectNavigation";

export default function ProjectSubpage({ projectId, projects = allProjects }) {
  const project = projects.find(item => item.id === projectId);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [projectId]);

  if (!project) {
    return (
      <main className="project-detail-page">
        <ProjectPageHeader />
        <section className="project-subpage__missing">
          <h1>Project not found</h1>
        </section>
      </main>
    );
  }

  const imageCount = project.images?.length ?? 0;
  const currentImage = project.images?.[imageIndex] ?? project.images?.[0];

  function cycleImage(step) {
    setImageIndex(current => (current + step + imageCount) % imageCount);
  }

  function openProject(event, nextProjectId) {
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
    setImageIndex(0);
    navigateToPath(`/projects/${encodeURIComponent(nextProjectId)}`);
  }

  return (
    <main className="project-detail-page">
      <ProjectPageHeader />
      <section className="project-subpage">
        <aside className="project-subpage__index">
          <nav aria-label="Projects">
            <ul className="project-subpage__index-list">
              {projects.map(item => (
                <li key={item.id}>
                  <a
                    href={getProjectPath(item.id)}
                    aria-current={item.id === project.id ? "page" : undefined}
                    onClick={event => openProject(event, item.id)}
                  >
                    <span>{item.title}</span>
                    {item.year && <span className="project-subpage__year">{item.year}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="project-subpage__content">
          <div className="project-subpage__viewer">
            {currentImage && (
              <img
                className="project-subpage__image"
                src={currentImage}
                alt={`${project.title} image ${imageIndex + 1} of ${imageCount}`}
              />
            )}

            {imageCount > 1 && (
              <>
                <button
                  type="button"
                  className="project-subpage__cycle project-subpage__cycle--prev"
                  onClick={() => cycleImage(-1)}
                  aria-label="Show previous image"
                >
                  <span aria-hidden="true">‹</span>
                </button>
                <button
                  type="button"
                  className="project-subpage__cycle project-subpage__cycle--next"
                  onClick={() => cycleImage(1)}
                  aria-label="Show next image"
                >
                  <span aria-hidden="true">›</span>
                </button>
              </>
            )}
          </div>

          <div className="project-subpage__copy">
            <h1 className="project-subpage__title">{project.title}</h1>
            <div className="project-subpage__metadata">
              <p className="project-subpage__tagline">{project.tagline}</p>
              {project.year && <p className="project-subpage__year">{project.year}</p>}
            </div>
            <ul className="project-subpage__tags">
              {project.tags?.map(tag => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <div className="project-subpage__details">
              {project.details?.map(detail => (
                <p key={detail}>{detail}</p>
              ))}
            </div>
            {project.links?.length > 0 && (
              <nav className="project-subpage__links" aria-label={`${project.title} links`}>
                {project.links.map(link => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function ProjectPageHeader() {
  return (
    <header className="deck-header project-detail-header">
      <nav className="deck-navigation">
        <span
          className="deck-navigation__indicator project-detail-header__indicator"
          aria-hidden="true"
        />
        <a
          href={getHomePath()}
          data-highlighted="true"
          onClick={event => {
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
            navigateToPath("/home/");
          }}
        >
          Back Home
        </a>
      </nav>
    </header>
  );
}