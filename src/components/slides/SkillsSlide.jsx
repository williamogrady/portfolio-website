import { useEffect, useRef, useState } from "react";

import skills from "../../../data/skills";
import SkillsMenu from "./skills/SkillsMenu";
import SkillsDetail from "./skills/SkillsDetail";

const skillCount = skills.length;

function SkillsSlide() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let animationFrame = 0;

    function updateActiveIndex() {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const scrollableHeight = containerRect.height - window.innerHeight;

      if (scrollableHeight <= 0) {
        setActiveIndex(currentIndex => (currentIndex === 0 ? currentIndex : 0));
        return;
      }

      const scrolled = Math.min(Math.max(-containerRect.top, 0), scrollableHeight);
      const fraction = scrolled / scrollableHeight;
      const nextIndex = Math.min(
        skillCount - 1,
        Math.max(0, Math.round(fraction * (skillCount - 1)))
      );

      setActiveIndex(currentIndex => (currentIndex === nextIndex ? currentIndex : nextIndex));
    }

    function scheduleUpdate() {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveIndex);
    }

    updateActiveIndex();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <div className="skills-slide" ref={containerRef} style={{ "--skill-count": skillCount }}>
      <div className="skills-slide__stage">
        <div className="skills-slide__heading">
          <h2 className="skills-slide__title">Skills</h2>
        </div>

        <div className="skills-slide__panel">
          <SkillsMenu skills={skills} activeIndex={activeIndex} />
          <SkillsDetail skills={skills} activeIndex={activeIndex} />
        </div>
      </div>
    </div>
  );
}

export default SkillsSlide;
