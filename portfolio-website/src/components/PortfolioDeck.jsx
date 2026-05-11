import { useEffect, useState } from "react";

import DeckBackground from "./DeckBackground";
import DeckNavigation from "./DeckNavigation";

import HomeSlide from "./slides/HomeSlide";
import AboutSlide from "./slides/AboutSlide";
import ProjectsSlide from "./slides/ProjectsSlide";

const slides = [
  { title: "Home", path: "/home/", key: "home", component: <HomeSlide /> },
  { title: "About", path: "/about/", key: "about", component: <AboutSlide /> },
  { title: "Projects", path: "/projects/", key: "projects", component: <ProjectsSlide /> },
];

const skyModes = [
  { id: "live", label: "Live" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

const basePath = import.meta.env.BASE_URL.replace(/\/+$/, "");

function normalizePath(pathname) {
  let normalizedPath = pathname.toLowerCase().replace(/\/+$/, "") || "/home";

  if (basePath && normalizedPath.startsWith(basePath.toLowerCase())) {
    normalizedPath = normalizedPath.slice(basePath.length) || "/home";
  }

  return normalizedPath;
}

function getRoutedPath(path) {
  const normalizedBase = import.meta.env.BASE_URL.replace(/\/+$/, "");
  return `${normalizedBase}${path}`;
}

function getSlideIndexFromPath(pathname) {
  const normalizedPath = normalizePath(pathname);
  const slideIndex = slides.findIndex(
    slide => normalizePath(slide.path) === normalizedPath
  );

  return slideIndex === -1 ? 0 : slideIndex;
}

export default function PortfolioDeck() {
  const [currentSlide, setCurrentSlide] = useState(() =>
    getSlideIndexFromPath(window.location.pathname)
  );
  const [previewSlide, setPreviewSlide] = useState(null);
  const [skyMode, setSkyMode] = useState("live");

  useEffect(() => {
    function handlePopState() {
      setCurrentSlide(getSlideIndexFromPath(window.location.pathname));
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const currentPath = normalizePath(window.location.pathname);
    const slidePath = normalizePath(slides[currentSlide].path);

    if (currentPath !== slidePath) {
      window.history.replaceState(null, "", getRoutedPath(slides[currentSlide].path));
    }
  }, [currentSlide]);

  function handleSlideChange(nextSlide) {
    if (nextSlide === currentSlide) {
      return;
    }

    setCurrentSlide(nextSlide);
    setPreviewSlide(null);
    window.history.pushState(null, "", getRoutedPath(slides[nextSlide].path));
  }

  const previousSlide = currentSlide > 0 ? currentSlide - 1 : null;
  const nextSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : null;
  const currentSlideKey = slides[currentSlide].key;

  return (
    <div className={`portfolio-deck portfolio-deck--${currentSlideKey}`}>
      <DeckBackground skyMode={skyMode} />

      <div className="deck-shell">
        <DeckNavigation
          slides={slides}
          currentSlide={currentSlide}
          previewSlide={previewSlide}
          onSlideChange={handleSlideChange}
          getRoutedPath={getRoutedPath}
        />

        <main className="deck-main">
          {previousSlide !== null && (
            <button
              className="deck-arrow deck-arrow--previous"
              type="button"
              aria-label={`Go to ${slides[previousSlide].title}`}
              onClick={() => handleSlideChange(previousSlide)}
              onMouseEnter={() => setPreviewSlide(previousSlide)}
              onMouseLeave={() => setPreviewSlide(null)}
              onFocus={() => setPreviewSlide(previousSlide)}
              onBlur={() => setPreviewSlide(null)}
            >
              <span aria-hidden="true">‹</span>
            </button>
          )}

          <div key={currentSlideKey} className="deck-slide">
            {slides[currentSlide].component}
          </div>

          {nextSlide !== null && (
            <button
              className="deck-arrow deck-arrow--next"
              type="button"
              aria-label={`Go to ${slides[nextSlide].title}`}
              onClick={() => handleSlideChange(nextSlide)}
              onMouseEnter={() => setPreviewSlide(nextSlide)}
              onMouseLeave={() => setPreviewSlide(null)}
              onFocus={() => setPreviewSlide(nextSlide)}
              onBlur={() => setPreviewSlide(null)}
            >
              <span aria-hidden="true">›</span>
            </button>
          )}
        </main>

        <footer className="deck-footer">
          <p>&copy; 2026 William O'Grady</p>
          <div className="deck-footer__sky-modes" aria-label="Sky theme mode">
            {skyModes.map(mode => (
              <button
                key={mode.id}
                className={`deck-footer__sky-mode deck-footer__sky-mode--${mode.id}`}
                type="button"
                aria-label={`Use ${mode.label.toLowerCase()} sky mode`}
                aria-pressed={skyMode === mode.id}
                title={mode.label}
                onClick={() => setSkyMode(mode.id)}
              >
                <span>{mode.label}</span>
              </button>
            ))}
          </div>
          <address>
            <a
              className="deck-footer__email"
              href="mailto:billy.ogrady2001@gmail.com"
              aria-label="Email William O'Grady"
            >
              <span aria-hidden="true" />
            </a>
          </address>
        </footer>
      </div>
    </div>
  );
}
