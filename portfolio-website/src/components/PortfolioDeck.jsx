import { useEffect, useState } from "react";

import DeckBackground from "./DeckBackground";
import DeckNavigation from "./DeckNavigation";

import HomeSlide from "./slides/HomeSlide";
import AboutSlide from "./slides/AboutSlide";
import ProjectsSlide from "./slides/ProjectsSlide";

const slides = [
  { title: "Home", path: "/home/", component: <HomeSlide /> },
  { title: "About", path: "/about/", component: <AboutSlide /> },
  { title: "Projects", path: "/projects/", component: <ProjectsSlide /> },
];

function normalizePath(pathname) {
  return pathname.toLowerCase().replace(/\/+$/, "") || "/home";
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
      window.history.replaceState(null, "", slides[currentSlide].path);
    }
  }, [currentSlide]);

  function handleSlideChange(nextSlide) {
    if (nextSlide === currentSlide) {
      return;
    }

    setCurrentSlide(nextSlide);
    setPreviewSlide(null);
    window.history.pushState(null, "", slides[nextSlide].path);
  }

  const previousSlide = currentSlide > 0 ? currentSlide - 1 : null;
  const nextSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : null;

  return (
    <div className="portfolio-deck">
      <DeckBackground />

      <div className="deck-shell">
        <DeckNavigation
          slides={slides}
          currentSlide={currentSlide}
          previewSlide={previewSlide}
          onSlideChange={handleSlideChange}
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

          {slides[currentSlide].component}

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
