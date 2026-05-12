import { useEffect, useRef, useState } from "react";

function HomeSlide() {
  const greetingRef = useRef(null);
  const [isOverClouds, setIsOverClouds] = useState(false);

  useEffect(() => {
    let animationFrame = 0;

    function updateTextContrast() {
      const greetingElement = greetingRef.current;

      if (!greetingElement) {
        return;
      }

      const greetingRect = greetingElement.getBoundingClientRect();
      const clouds = Array.from(document.querySelectorAll(".sky-lab__cloud"));
      const cloudOverlap = clouds.some(cloud => {
        const cloudRect = cloud.getBoundingClientRect();
        const overlapWidth = Math.max(
          0,
          Math.min(greetingRect.right, cloudRect.right) - Math.max(greetingRect.left, cloudRect.left)
        );
        const overlapHeight = Math.max(
          0,
          Math.min(greetingRect.bottom, cloudRect.bottom) - Math.max(greetingRect.top, cloudRect.top)
        );
        const overlapArea = overlapWidth * overlapHeight;
        const greetingArea = Math.max(1, greetingRect.width * greetingRect.height);

        return overlapArea / greetingArea > 0.18;
      });

      setIsOverClouds(current => current === cloudOverlap ? current : cloudOverlap);
      animationFrame = window.requestAnimationFrame(updateTextContrast);
    }

    animationFrame = window.requestAnimationFrame(updateTextContrast);

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className={`centered-slide home-slide${isOverClouds ? " home-slide--over-clouds" : ""}`}>
      <div className="home-slide__greeting" ref={greetingRef}>
        <h1 aria-label="William O'Grady">
          <span className="home-slide__name-part home-slide__name-part--first">William</span>
          <span className="home-slide__name-part home-slide__name-part--last">O'Grady</span>
        </h1>
        <p className="home-slide__subtitle">Web Portfolio</p>
      </div>
      <div className="home-slide__scroll-cue" aria-hidden="true" />
    </div>
  );
}

export default HomeSlide;
