function SkillMethod({ method, isExpanded, onToggle }) {
  return (
    <div
      className={`skill-method${isExpanded ? " skill-method--expanded" : ""}`}
      role="button"
      tabIndex="0"
      aria-expanded={isExpanded}
      onClick={onToggle}
      onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggle();
        }
      }}
    >
      <div className="skill-method__row">
        <h3 className="skill-method__title">{method.title}</h3>
        <span className="skill-method__icon" aria-hidden="true">
          <span className="skill-method__icon-bar skill-method__icon-bar--horizontal" />
          <span className="skill-method__icon-bar skill-method__icon-bar--vertical" />
        </span>
      </div>

      <div className="skill-method__panel">
        <p className="skill-method__description">{method.description}</p>
      </div>
    </div>
  );
}

export default SkillMethod;
