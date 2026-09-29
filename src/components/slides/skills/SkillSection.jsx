import { useState } from "react";

import SkillMethod from "./SkillMethod";
import SkillSlideshow from "./SkillSlideshow";

function SkillSection({ skill, isActive, sectionRef }) {
  const [expandedMethodId, setExpandedMethodId] = useState(skill.methods[0]?.id ?? null);

  function toggleMethod(methodId) {
    setExpandedMethodId(currentId => (currentId === methodId ? null : methodId));
  }

  return (
    <article
      ref={sectionRef}
      id={`skill-${skill.id}`}
      className={`skill-section${isActive ? " skill-section--active" : ""}`}
    >
      <div className="skill-section__column skill-section__column--media">
        <SkillSlideshow isActive={isActive} />
      </div>

      <div className="skill-section__column skill-section__column--content">
        <header className="skill-section__header">
          <h2 className="skill-section__title">{skill.title}</h2>
        </header>

        <div className="skill-section__methods">
          {skill.methods.map(method => (
            <SkillMethod
              key={method.id}
              method={method}
              isExpanded={expandedMethodId === method.id}
              onToggle={() => toggleMethod(method.id)}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export default SkillSection;
