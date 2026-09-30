import { useLayoutEffect, useRef, useState } from "react";

function SkillsMenu({ skills, progress, activeIndex }) {
  const rowRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState(null);

  useLayoutEffect(() => {
    function updateIndicator() {
      const rows = rowRefs.current;
      const firstIndex = Math.max(0, Math.min(rows.length - 1, Math.floor(progress)));
      const secondIndex = Math.max(0, Math.min(rows.length - 1, Math.ceil(progress)));
      const firstRow = rows[firstIndex];
      const secondRow = rows[secondIndex] ?? firstRow;

      if (!firstRow || !secondRow) {
        return;
      }

      const localProgress = firstIndex === secondIndex ? 0 : progress - firstIndex;
      const firstTop = firstRow.offsetTop;
      const secondTop = secondRow.offsetTop;
      const firstHeight = firstRow.offsetHeight;
      const secondHeight = secondRow.offsetHeight;

      setIndicatorStyle({
        height: `${firstHeight + ((secondHeight - firstHeight) * localProgress)}px`,
        transform: `translate3d(0, ${firstTop + ((secondTop - firstTop) * localProgress)}px, 0)`,
      });
    }

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [progress, skills.length]);

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
