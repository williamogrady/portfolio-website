const VIDEO_EXTENSIONS = new Set(["mp4", "webm", "mov"]);

function getFileExtension(src) {
  const clean = src.split("?")[0].split("#")[0];
  const match = /\.([a-z0-9]+)$/i.exec(clean);
  return match ? match[1].toLowerCase() : "";
}

// Naming convention: [filename]-b.[format] = big frame, [filename]-s.[format] = small frame.
function getMediaSizeFromFilename(src) {
  const filename = src.split("/").pop() ?? "";
  const base = filename.replace(/\.[^.]+$/, "");
  if (/-s$/i.test(base)) return "small";
  if (/-b$/i.test(base)) return "big";
  return null;
}

export default function ProjectContentBlocks({ blocks, projectTitle }) {
  return (
    <div className="project-content">
      {blocks.map((block, index) => (
        <ProjectContentBlock key={index} block={block} projectTitle={projectTitle} />
      ))}
    </div>
  );
}

function ProjectContentBlock({ block, projectTitle }) {
  if (block.type === "media") {
    const size = block.size ?? getMediaSizeFromFilename(block.src) ?? "big";
    const isFull = size === "big";
    const isVideo = VIDEO_EXTENSIONS.has(getFileExtension(block.src));
    const blockClassName = [
      "project-content__block",
      "project-content__media",
      `project-content__media--${size}`,
      isFull ? "project-content__block--full" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <figure className={blockClassName}>
        {isVideo ? (
          <video src={block.src} autoPlay loop muted playsInline />
        ) : (
          <img src={block.src} alt={block.alt ?? projectTitle} loading="lazy" />
        )}
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
  }

  if (block.type === "specifics") {
    const blockClassName = [
      "project-content__block",
      "project-content__specifics",
      block.size === "full" ? "project-content__block--full" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={blockClassName}>
        {block.body && <p>{block.body}</p>}
        {block.items?.length > 0 && (
          <ul className="project-content__specifics-list">
            {block.items.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  const blockClassName = [
    "project-content__block",
    "project-content__text",
    block.size === "full" ? "project-content__block--full" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return <p className={blockClassName}>{block.body}</p>;
}
