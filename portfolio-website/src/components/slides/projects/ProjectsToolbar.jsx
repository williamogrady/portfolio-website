const tags = ["all", "school", "freelance", "design", "code", "user research", "business"];
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "az", label: "A-Z" },
];

export default function ProjectsToolbar({
  selectedTags,
  onTagChange,
  sortOrder,
  onSortOrderChange,
}) {
  return (
    <div className="project-toolbar">
      <div className="project-toolbar__tags" aria-label="Filter projects by tag">
        {tags.map(tag => {
          const isSelected = selectedTags.includes(tag);

          return (
            <button
              key={tag}
              className={isSelected ? "tag-button tag-button--selected" : "tag-button"}
              type="button"
              onClick={() => onTagChange(tag)}
              aria-pressed={isSelected}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <label className="project-toolbar__sort">
        <span>Sort</span>
        <select
          value={sortOrder}
          onChange={event => onSortOrderChange(event.target.value)}
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
