import { useEffect, useRef, useState } from "react";

const slideColors = ["blue", "red", "green"];
const autoplayInterval = 3200;

function SkillSlideshow({ isActive }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(0);

  useEffect(() => {
    if (!isActive) {
      window.clearInterval(intervalRef.current);
      return undefined;
    }

    intervalRef.current = window.setInterval(() => {
      setActiveIndex(currentIndex => (currentIndex + 1) % slideColors.length);
    }, autoplayInterval);

    return () => window.clearInterval(intervalRef.current);
  }, [isActive]);

  return (
    <div className={`skill-slideshow${isActive ? " skill-slideshow--active" : ""}`}>
      {slideColors.map((color, index) => (
        <div
          key={color}
          className={`skill-slideshow__frame skill-slideshow__frame--${color}${
            index === activeIndex ? " skill-slideshow__frame--visible" : ""
          }`}
          aria-hidden={index !== activeIndex}
        />
      ))}

      <div className="skill-slideshow__dots" aria-hidden="true">
        {slideColors.map((color, index) => (
          <span
            key={color}
            className={`skill-slideshow__dot${index === activeIndex ? " skill-slideshow__dot--active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

export default SkillSlideshow;
