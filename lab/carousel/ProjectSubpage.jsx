import { useEffect, useState } from "react";

import dummyProjects from "./dummyProjects";
import { getLabPath, navigateLab } from "./labNavigation";

export default function ProjectSubpage({ projectId }) {
  const project = dummyProjects.find(item => item.id === projectId);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
  }, [projectId]);

  if (!project) {
    return (
      <section className="project-subpage__missing">
        <h1>Project not found</h1>
        <a className="project-subpage__back" href={getLabPath("/carousel")}>
          Back to carousel
        </a>
      </section>
    );
  }

  const imageCount = project.images.length;
  const currentImage = project.images[imageIndex] ?? project.images[0];

  function goToProject(event, id) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    setImageIndex(0);
    navigateLab(`/carousel/${id}`);
  }

  function cycleImage(step) {
    setImageIndex(current => (current + step + imageCount) % imageCount);
  }

  return (
    <section className="project-subpage">
      <aside className="project-subpage__nav">
        <a
          className="project-subpage__back"
          href={getLabPath("/carousel")}
          onClick={event => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
              return;
            }

            event.preventDefault();
            navigateLab("/carousel");
          }}
        >
          ← Carousel
        </a>
        <nav aria-label="Projects">
          <ul className="project-subpage__nav-list">
            {dummyProjects.map(item => (
              <li key={item.id}>
                <a
                  href={getLabPath(`/carousel/${item.id}`)}
                  aria-current={item.id === project.id ? "page" : undefined}
                  onClick={event => goToProject(event, item.id)}
                >
                  <span>{item.name}</span>
                  <span className="project-subpage__year">{item.year}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="project-subpage__stage">
        <div className="project-subpage__viewer">
          <img
            className="project-subpage__image"
            src={currentImage}
            alt={`${project.name} image ${imageIndex + 1} of ${imageCount}`}
          />
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

        <h1 className="project-subpage__header">{project.name}</h1>
        <ul className="project-subpage__tags">
          {project.tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <p className="project-subpage__summary">{project.summary}</p>
      </div>
    </section>
  );
}
