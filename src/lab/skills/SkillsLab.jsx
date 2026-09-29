import { useState } from "react";

import skills from "../../../data/skills";
import SkillSlideshow from "../../components/slides/skills/SkillSlideshow";
import "./skillsLab.css";

// Each section autoplays at its own pace so the grid never syncs up.
const speedsMs = [1800, 2600, 3400, 4400];

function SkillsLab() {
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  const selectedSkill = skills.find(skill => skill.id === selectedSkillId) ?? null;
  // Methods of the selected skill are handed out to the other three cells, in grid order.
  const otherIndexes = selectedSkill
    ? skills.map((_, index) => index).filter(index => skills[index].id !== selectedSkillId)
    : [];

  function toggleSkill(skillId) {
    setSelectedSkillId(currentId => (currentId === skillId ? null : skillId));
  }

  return (
    <div className="skills-lab">
      {skills.map((skill, index) => {
        const isSelected = skill.id === selectedSkillId;
        const isRevealed = Boolean(selectedSkill) && !isSelected;
        const method = isRevealed ? selectedSkill.methods[otherIndexes.indexOf(index)] : null;

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
                <h3 className="skills-lab__method-title">{method?.title}</h3>
                <p className="skills-lab__method-text">{method?.description}</p>
              </div>
            ) : (
              <SkillSlideshow isActive intervalMs={speedsMs[index % speedsMs.length]} />
            )}

            <span className="skills-lab__label" aria-hidden="true">
              {skill.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default SkillsLab;
