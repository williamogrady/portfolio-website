const tags = ["all", "school", "freelance", "design", "code", "energy"];

export default function ProjectsToolbar({ selectedTags, onTagChange }) {
  return (
    <div className="project-toolbar">
      {tags.map(tag => {
        const isSelected = selectedTags.includes(tag);

        return (
          <button
            key={tag}
            className={
              isSelected
                ? "tag-button tag-button--selected"
                : "tag-button"
            }
            onClick={() => onTagChange(tag)}
            aria-pressed={isSelected}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}