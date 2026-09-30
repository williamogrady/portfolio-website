function SkillsDetail({ skills, activeIndex }) {
  return (
    <div className="skills-detail-list">
      {skills.map((skill, index) => (
        <div
          key={skill.id}
          className={`skills-detail${index === activeIndex ? " skills-detail--active" : ""}`}
          aria-hidden={index !== activeIndex}
        >
          {skill.image && (
            <div className="skills-detail__media">
              <img src={skill.image} alt="" aria-hidden="true" />
            </div>
          )}
          <p className="skills-detail__paragraph">{skill.paragraph}</p>
          {skill.tags.length > 0 && (
            <ul className="skills-detail__tags">
              {skill.tags.map(tag => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default SkillsDetail;
