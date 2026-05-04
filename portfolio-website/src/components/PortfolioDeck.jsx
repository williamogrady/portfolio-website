import { useState } from "react";

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
    <div>
      <DeckNavigation
        slides={slides}
        currentSlide={currentSlide}
        onSlideChange={setCurrentSlide}
      />

      <main>
        {slides[currentSlide].component}
      </main>
    </div>
  );
}