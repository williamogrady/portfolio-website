import { useEffect, useRef, useState } from "react";

import skills from "../../../data/skills";
import SkillSection from "./skills/SkillSection";

function SkillsSlide() {
  const [activeSkillId, setActiveSkillId] = useState(skills[0]?.id ?? null);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visibleEntry = entries
          .filter(entry => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0];

        if (!visibleEntry) {
          return;
        }

        setActiveSkillId(visibleEntry.target.dataset.skillId ?? null);
      },
      {
        root: null,
        rootMargin: "-30% 0px -30% 0px",
        threshold: [0.2, 0.45, 0.7],
      }
    );

    Object.values(sectionRefs.current).forEach(sectionElement => {
      if (sectionElement) {
        observer.observe(sectionElement);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="skills-slide">
      <div className="skills-slide__heading">
        <h2 className="skills-slide__title">Skills</h2>
      </div>
      {skills.map(skill => (
        <SkillSection
          key={skill.id}
          skill={skill}
          isActive={activeSkillId === skill.id}
          sectionRef={element => {
            sectionRefs.current[skill.id] = element;
            if (element) {
              element.dataset.skillId = skill.id;
            }
          }}
        />
      ))}
    </div>
  );
}

export default SkillsSlide;
