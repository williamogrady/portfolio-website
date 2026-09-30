import { useLayoutEffect, useRef, useState } from "react";

function SkillsMenu({ skills, activeIndex }) {
  const rowRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState(null);

  useLayoutEffect(() => {
    function updateIndicator() {
      const activeRow = rowRefs.current[activeIndex];

      if (!activeRow) {
        return;
      }

      setIndicatorStyle({
        height: `${activeRow.offsetHeight}px`,
        transform: `translate3d(0, ${activeRow.offsetTop}px, 0)`,
      });
    }

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeIndex, skills.length]);

  return (
    <nav className="skills-menu" aria-label="Skills">
      {indicatorStyle && (
        <span className="skills-menu__indicator" style={indicatorStyle} aria-hidden="true" />
      )}
      {skills.map((skill, index) => (
        <div
          key={skill.id}
          ref={element => {
            rowRefs.current[index] = element;
          }}
          className={`skills-menu__item${index === activeIndex ? " skills-menu__item--active" : ""}`}
          aria-current={index === activeIndex ? "true" : undefined}
        >
          {skill.label}
        </div>
      ))}
    </nav>
  );
}

export default SkillsMenu;
