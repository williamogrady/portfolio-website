import { useEffect, useRef, useState } from "react";

import skills from "../../../data/skills";
import SkillsMenu from "./skills/SkillsMenu";
import SkillsDetail from "./skills/SkillsDetail";

const skillCount = skills.length;

function SkillsSlide() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame = 0;

    function updateProgress() {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const scrollableHeight = containerRect.height - window.innerHeight;

      if (scrollableHeight <= 0) {
        setProgress(currentProgress => (currentProgress === 0 ? currentProgress : 0));
        return;
      }

      const scrolled = Math.min(Math.max(-containerRect.top, 0), scrollableHeight);
      const nextProgress = (scrolled / scrollableHeight) * (skillCount - 1);

      setProgress(currentProgress =>
        Math.abs(currentProgress - nextProgress) < 0.003 ? currentProgress : nextProgress
      );
    }

    function scheduleUpdate() {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateProgress);
    }

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const activeIndex = Math.min(skillCount - 1, Math.max(0, Math.round(progress)));

  return (
    <div className="skills-slide" ref={containerRef} style={{ "--skill-count": skillCount }}>
      <div className="skills-slide__stage">
        <div className="skills-slide__heading">
          <h2 className="skills-slide__title">Skills</h2>
        </div>

        <div className="skills-slide__panel">
          <SkillsMenu skills={skills} progress={progress} activeIndex={activeIndex} />
          <SkillsDetail skills={skills} activeIndex={activeIndex} />
        </div>
      </div>
    </div>
  );
}

export default SkillsSlide;
