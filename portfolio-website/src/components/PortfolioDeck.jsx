import { useState } from "react";

import DeckBackground from "./DeckBackground";
import DeckNavigation from "./DeckNavigation";

import HomeSlide from "./slides/HomeSlide";
import AboutSlide from "./slides/AboutSlide";
import ProjectsSlide from "./slides/ProjectsSlide";

export default function PortfolioDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: "Home", component: <HomeSlide /> },
    { title: "About", component: <AboutSlide /> },
    { title: "Projects", component: <ProjectsSlide /> },
  ];

  return (
    <div className="portfolio-deck">
      <DeckBackground />

      <div className="deck-shell">
        <DeckNavigation
          slides={slides}
          currentSlide={currentSlide}
          onSlideChange={setCurrentSlide}
        />

        <main className="deck-main">
          {slides[currentSlide].component}
        </main>

        <footer className="deck-footer">
          <p>&copy; 2026 William O'Grady</p>
          <address>
            <a href="mailto:ogrady@kth.se">ogrady@kth.se</a>
            <a href="tel:+46720315317">+46 72 031 53 17</a>
          </address>
        </footer>
      </div>
    </div>
  );
}
