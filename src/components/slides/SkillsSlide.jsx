import skills from "../../../data/skills";

function SkillsSlide() {
  return (
    <div className="skills-slide">
      <h2 className="skills-slide__title">Skills</h2>

      <div className="skills-rows">
        {skills.map((skill, index) => (
          <section
            key={skill.id}
            className={`skills-row${index % 2 === 1 ? " skills-row--flip" : ""}`}
          >
            <div className="skills-row__media">
              <img src={skill.image} alt="" aria-hidden="true" loading="lazy" />
            </div>
            <div className="skills-row__body">
              <h3 className="skills-row__label">{skill.label}</h3>
              <p className="skills-row__paragraph">{skill.paragraph}</p>
              {skill.tags.length > 0 && (
                <ul className="skills-row__tags">
                  {skill.tags.map(tag => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default SkillsSlide;
