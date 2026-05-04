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
    window.history.pushState(null, "", slides[nextSlide].path);
  }

  return (
    <div className="portfolio-deck">
      <DeckBackground />

      <div className="deck-shell">
        <DeckNavigation
          slides={slides}
          currentSlide={currentSlide}
          onSlideChange={handleSlideChange}
        />

        <main className="deck-main">
          {slides[currentSlide].component}
        </main>

        <footer className="deck-footer">
          <p>&copy; 2026 William O'Grady</p>
          <address>
            <a href="mailto:billy.ogrady2001@gmail.com">billy.ogrady2001@gmail.com</a>
            <a href="tel:+46720315317">+46 72 031 53 17</a>
          </address>
        </footer>
      </div>
    </div>
  );
}
