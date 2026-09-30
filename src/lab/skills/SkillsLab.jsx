import { useState } from "react";

import skills from "../../../data/skills";
import "./skillsLab.css";

function SkillsLab() {
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  const selectedSkill = skills.find(skill => skill.id === selectedSkillId) ?? null;

  function toggleSkill(skillId) {
    setSelectedSkillId(currentId => (currentId === skillId ? null : skillId));
  }

  return (
    <div className="skills-lab">
      {skills.map(skill => {
        const isSelected = skill.id === selectedSkillId;
        const isRevealed = Boolean(selectedSkill) && !isSelected;

        return (
          <div
            key={skill.id}
            className={`skills-lab__cell${isSelected ? " skills-lab__cell--selected" : ""}${
              isRevealed ? " skills-lab__cell--revealed" : ""
            }`}
            role="button"
            tabIndex={0}
            onClick={() => toggleSkill(skill.id)}
            onKeyDown={event => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleSkill(skill.id);
              }
            }}
          >
            {isRevealed ? (
              <div className="skills-lab__method">
                <h3 className="skills-lab__method-title">{selectedSkill.label}</h3>
                <p className="skills-lab__method-text">{selectedSkill.paragraph}</p>
              </div>
            ) : null}

            <span className="skills-lab__label" aria-hidden="true">
              {skill.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default SkillsLab;
