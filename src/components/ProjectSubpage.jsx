import { useEffect, useMemo, useRef, useState } from "react";

import allProjects from "../../data/projects";
import { getHomePath, getProjectPath, navigateToPath } from "../projectNavigation";
import ProjectContentBlocks from "./ProjectContentBlocks";
import SiteFooter from "./SiteFooter";

const SORT_FIELDS = {
  year: {
    label: "Year",
    compare: (a, b) => (a.year ?? 0) - (b.year ?? 0),
  },
  name: {
    label: "Name",
    compare: (a, b) => a.title.localeCompare(b.title),
  },
};

const DEFAULT_SORT_FIELD = "year";
const DEFAULT_SORT_DIRECTION = "desc";

const THEME_MODES = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];


// Best-effort content blocks for projects that haven't been migrated to the `content` template yet.
function buildFallbackContent(project) {
  const images = project.thumbnail
    ? [project.thumbnail, ...(project.images ?? []).filter(image => image !== project.thumbnail)]
    : project.images ?? [];

  const blocks = [];
  if (images[0]) {
    blocks.push({ type: "media", size: "big", src: images[0] });
  }

  project.details?.forEach(detail => {
    blocks.push({ type: "text", size: "full", body: detail });
  });

  images.slice(1).forEach(image => {
    blocks.push({ type: "media", size: "small", src: image });
  });

  return blocks;
}

export default function ProjectSubpage({ projectId, projects = allProjects }) {
  const project = projects.find(item => item.id === projectId);
  const [sortField, setSortField] = useState(DEFAULT_SORT_FIELD);
  const [sortDirection, setSortDirection] = useState(DEFAULT_SORT_DIRECTION);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [footerVisibility, setFooterVisibility] = useState(0);
  const sortMenuRef = useRef(null);

  const sortedProjects = useMemo(() => {
    const directionMultiplier = sortDirection === "desc" ? -1 : 1;
    return [...projects].sort(
      (a, b) => SORT_FIELDS[sortField].compare(a, b) * directionMultiplier
    );
  }, [projects, sortField, sortDirection]);

  useEffect(() => {
    if (!isSortMenuOpen) {
      return undefined;
    }

    function handleClickOutside(event) {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setIsSortMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSortMenuOpen]);

  useEffect(() => {
    document.body.classList.toggle("theme-dark", theme === "dark");
    document.body.classList.toggle("theme-light", theme === "light");

    return () => {
      document.body.classList.remove("theme-dark", "theme-light");
    };
  }, [theme]);

  useEffect(() => {
    let animationFrame = 0;

    function updateFooterVisibility() {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const distanceToBottom = Math.max(0, documentHeight - window.scrollY);
      const nextVisibility = distanceToBottom < 180 ? 1 - distanceToBottom / 180 : 0;

      setFooterVisibility(currentVisibility =>
        Math.abs(currentVisibility - nextVisibility) < 0.01 ? currentVisibility : nextVisibility
      );
    }

    function scheduleFooterVisibility() {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateFooterVisibility);
    }

    updateFooterVisibility();
    window.addEventListener("scroll", scheduleFooterVisibility, { passive: true });
    window.addEventListener("resize", scheduleFooterVisibility);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleFooterVisibility);
      window.removeEventListener("resize", scheduleFooterVisibility);
    };
  }, [projectId]);

  useEffect(() => {
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
    navigateToPath(`/projects/${encodeURIComponent(nextProjectId)}`);
  }

  const contentBlocks = project.content?.length > 0 ? project.content : buildFallbackContent(project);

  return (
    <main className="project-detail-page">
      <ProjectPageHeader />
      <section className="project-subpage">
        <div className="project-showcase__heading project-subpage__heading">
          <h2 className="project-showcase__title">Projects</h2>
        </div>
        <div className="project-subpage__divider" aria-hidden="true" />
        <aside className="project-subpage__index">
          <div className="project-subpage__sort" ref={sortMenuRef}>
            <span className="project-subpage__sort-static-label">Sort</span>
            <div className="project-subpage__sort-control">
              <button
                type="button"
                className="project-subpage__sort-label"
                aria-haspopup="listbox"
                aria-expanded={isSortMenuOpen}
                onClick={() => setIsSortMenuOpen(open => !open)}
              >
                By {SORT_FIELDS[sortField].label}
              </button>
              <button
                type="button"
                className="project-subpage__sort-direction"
                aria-label={sortDirection === "desc" ? "Sort ascending" : "Sort descending"}
                onClick={() => setSortDirection(direction => (direction === "desc" ? "asc" : "desc"))}
              >
                <svg
                  className={`project-subpage__sort-arrow${
                    sortDirection === "desc" ? " project-subpage__sort-arrow--down" : ""
                  }`}
                  viewBox="0 0 384 512"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
              </button>

              {isSortMenuOpen && (
                <ul className="project-subpage__sort-menu" role="listbox">
                  {Object.entries(SORT_FIELDS)
                    .filter(([key]) => key !== sortField)
                    .map(([key, field]) => (
                      <li key={key}>
                        <button
                          type="button"
                          role="option"
                          aria-selected="false"
                          onClick={() => {
                            setSortField(key);
                            setIsSortMenuOpen(false);
                          }}
                        >
                          By {field.label}
                        </button>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
          <nav aria-label="Projects">
            <ul className="project-subpage__index-list">
              {sortedProjects.map(item => (
                <li key={item.id}>
                  <a
                    href={getProjectPath(item.id)}
                    aria-current={item.id === project.id ? "page" : undefined}
                    onClick={event => openProject(event, item.id)}
                  >
                    <span className="project-subpage__index-title">{item.title}</span>
                    {item.year && <span className="project-subpage__year">{item.year}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="project-subpage__content">
          <h1 className="project-subpage__title">{project.title}</h1>
          <div className="project-subpage__metadata">
            <p className="project-subpage__tagline">{project.tagline}</p>
            {project.year && <p className="project-subpage__year">{project.year}</p>}
          </div>

          <ProjectContentBlocks blocks={contentBlocks} projectTitle={project.title} />

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
      </section>

      <SiteFooter
        modes={THEME_MODES}
        activeMode={theme}
        onModeChange={setTheme}
        visibility={footerVisibility}
        modeGroupLabel="Theme mode"
      />
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