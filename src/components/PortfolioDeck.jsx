import { useEffect, useState } from "react";

import DeckBackground from "./DeckBackground";
import DeckNavigation from "./DeckNavigation";
import SiteFooter from "./SiteFooter";

import HomeSlide from "./slides/HomeSlide";
import AboutSlide from "./slides/AboutSlide";
import ProjectsSlide from "./slides/ProjectsSlide";
import SkillsSlide from "./slides/SkillsSlide";

const slides = [
  { title: "Home", path: "/home/", key: "home", component: <HomeSlide /> },
  { title: "Projects", path: "/projects/", key: "projects", component: <ProjectsSlide /> },
  { title: "Skills", path: "/skills/", key: "skills", component: <SkillsSlide /> },
  { title: "About", path: "/about/", key: "about", component: <AboutSlide /> },
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

function scrollToSlide(slideIndex, behavior = "smooth") {
  document
    .getElementById(`slide-${slides[slideIndex].key}`)
    ?.scrollIntoView({ behavior, block: "start" });
}

function DeckSlide({ slide }) {
  return (
    <section
      id={`slide-${slide.key}`}
      className={`deck-slide deck-slide--${slide.key}`}
      aria-label={slide.title}
    >
      {slide.component}
    </section>
  );
}

export default function PortfolioDeck() {
  const [currentSlide, setCurrentSlide] = useState(() =>
    getSlideIndexFromPath(window.location.pathname)
  );
  const [slidePosition, setSlidePosition] = useState(() =>
    getSlideIndexFromPath(window.location.pathname)
  );
  const [skyMode, setSkyMode] = useState("live");
  const [skyScrollProgress, setSkyScrollProgress] = useState(0);
  const [footerVisibility, setFooterVisibility] = useState(1);

  useEffect(() => {
    document.body.classList.toggle("theme-dark", skyMode === "dark");
    document.body.classList.toggle("theme-light", skyMode === "light");

    return () => {
      document.body.classList.remove("theme-dark", "theme-light");
    };
  }, [skyMode]);

  useEffect(() => {
    const initialSlide = getSlideIndexFromPath(window.location.pathname);

    window.requestAnimationFrame(() => {
      scrollToSlide(initialSlide, "auto");
    });
  }, []);

  useEffect(() => {
    function handlePopState() {
      const nextSlide = getSlideIndexFromPath(window.location.pathname);
      setCurrentSlide(nextSlide);
      setSlidePosition(nextSlide);
      scrollToSlide(nextSlide);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visibleEntry = entries
          .filter(entry => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0];

        if (!visibleEntry) {
          return;
        }

        const nextSlide = slides.findIndex(
          slide => visibleEntry.target.id === `slide-${slide.key}`
        );

        if (nextSlide === -1) {
          return;
        }

        setCurrentSlide(current => {
          if (current === nextSlide) {
            return current;
          }

          window.history.replaceState(null, "", getRoutedPath(slides[nextSlide].path));
          return nextSlide;
        });
      },
      {
        root: null,
        rootMargin: "-34% 0px -46% 0px",
        threshold: [0.12, 0.35, 0.6],
      }
    );

    slides.forEach(slide => {
      const slideElement = document.getElementById(`slide-${slide.key}`);

      if (slideElement) {
        observer.observe(slideElement);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    function updateScrollProgress() {
      const projectsSlide = document.getElementById("slide-projects");

      if (!projectsSlide) {
        return;
      }

      const projectsTop = projectsSlide.offsetTop || window.innerHeight;
      const fadeDistance = Math.max(projectsTop * 0.92, window.innerHeight);
      const nextProgress = Math.min(1, Math.max(0, window.scrollY / fadeDistance));

      setSkyScrollProgress(currentProgress =>
        Math.abs(currentProgress - nextProgress) < 0.005 ? currentProgress : nextProgress
      );

      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const distanceToBottom = Math.max(0, documentHeight - window.scrollY);
      const introVisibility = 1 - Math.min(1, window.scrollY / 120);
      const bottomVisibility = distanceToBottom < 180 ? 1 - (distanceToBottom / 180) : 0;
      const nextFooterVisibility = Math.max(introVisibility, bottomVisibility);

      setFooterVisibility(currentVisibility =>
        Math.abs(currentVisibility - nextFooterVisibility) < 0.01
          ? currentVisibility
          : nextFooterVisibility
      );

      const slideTops = slides.map(slide =>
        document.getElementById(`slide-${slide.key}`)?.offsetTop ?? 0
      );
      const scrollPosition = window.scrollY;
      const lastSlideIndex = slides.length - 1;
      let nextSlidePosition = lastSlideIndex;

      for (let slideIndex = 0; slideIndex < lastSlideIndex; slideIndex += 1) {
        const currentTop = slideTops[slideIndex];
        const nextTop = slideTops[slideIndex + 1];

        if (scrollPosition <= nextTop) {
          const slideDistance = Math.max(1, nextTop - currentTop);
          const slideProgress = (scrollPosition - currentTop) / slideDistance;

          nextSlidePosition = slideIndex + Math.min(1, Math.max(0, slideProgress));
          break;
        }
      }

      setSlidePosition(currentPosition =>
        Math.abs(currentPosition - nextSlidePosition) < 0.003 ? currentPosition : nextSlidePosition
      );
    }

    function scheduleScrollProgress() {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateScrollProgress);
    }

    updateScrollProgress();
    window.addEventListener("scroll", scheduleScrollProgress, { passive: true });
    window.addEventListener("resize", scheduleScrollProgress);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleScrollProgress);
      window.removeEventListener("resize", scheduleScrollProgress);
    };
  }, []);

  function handleSlideChange(nextSlide) {
    setCurrentSlide(nextSlide);
    window.history.pushState(null, "", getRoutedPath(slides[nextSlide].path));
    scrollToSlide(nextSlide);
  }

  const currentSlideKey = slides[currentSlide].key;

  return (
    <div className={`portfolio-deck portfolio-deck--${currentSlideKey} portfolio-deck--sky-${skyMode}`}>
      <DeckBackground skyMode={skyMode} scrollProgress={skyScrollProgress} />

      <div className="deck-shell">
        <DeckNavigation
          slides={slides}
          currentSlide={currentSlide}
          slidePosition={slidePosition}
          onSlideChange={handleSlideChange}
          getRoutedPath={getRoutedPath}
        />

        <main className="deck-main">
          {slides.map(slide => <DeckSlide key={slide.key} slide={slide} />)}
        </main>

        <SiteFooter
          modes={skyModes}
          activeMode={skyMode}
          onModeChange={setSkyMode}
          visibility={footerVisibility}
          modeGroupLabel="Sky theme mode"
        />
      </div>
    </div>
  );
}
