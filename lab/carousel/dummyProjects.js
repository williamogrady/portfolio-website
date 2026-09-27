function placeholderImage(label, color, variant) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" role="img">
      <rect width="960" height="540" fill="${color}" />
      <rect x="48" y="48" width="864" height="444" fill="rgba(255,255,255,0.18)" rx="28" />
      <text x="480" y="270" text-anchor="middle" fill="rgba(18,18,18,0.72)"
        font-family="system-ui, sans-serif" font-size="48" font-weight="600">
        ${label} · ${variant}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const dummyProjects = [
  {
    id: "project-a",
    name: "Project A",
    year: 2026,
    row: "top",
    accent: "#9d7bff",
    width: "min(28vw, 420px)",
    tags: ["prototype", "layout", "carousel"],
    summary:
      "Temporary stand-in for a case study. The right-hand panel is where the selected project's images, title, tags, and write-up will live.",
    images: [
      placeholderImage("Project A", "#9d7bff", "01"),
      placeholderImage("Project A", "#7a5ae6", "02"),
      placeholderImage("Project A", "#c4b0ff", "03"),
    ],
  },
  {
    id: "project-b",
    name: "Project B",
    year: 2025,
    row: "top",
    accent: "#ff7a59",
    width: "min(30vw, 480px)",
    tags: ["prototype", "navigation"],
    summary:
      "Another placeholder project. Switching items in the left list should update this panel and the URL without returning to the carousel.",
    images: [
      placeholderImage("Project B", "#ff7a59", "01"),
      placeholderImage("Project B", "#e45c3d", "02"),
    ],
  },
  {
    id: "project-c",
    name: "Project C",
    year: 2024,
    row: "top",
    accent: "#66d9c6",
    width: "min(25vw, 380px)",
    tags: ["prototype", "detail page"],
    summary:
      "Third dummy project so the carousel and the subpage list have more than one destination to move between.",
    images: [
      placeholderImage("Project C", "#66d9c6", "01"),
      placeholderImage("Project C", "#3fb9a6", "02"),
      placeholderImage("Project C", "#9aeee2", "03"),
    ],
  },
  {
    id: "project-d",
    name: "Project D",
    year: 2023,
    row: "bottom",
    accent: "#ffcb77",
    width: "min(27vw, 420px)",
    tags: ["prototype", "bottom row"],
    summary:
      "Placeholder kept on the lower marquee only, so a project never appears in both rows at once.",
    images: [
      placeholderImage("Project D", "#ffcb77", "01"),
      placeholderImage("Project D", "#e0a84a", "02"),
    ],
  },
  {
    id: "project-e",
    name: "Project E",
    year: 2022,
    row: "bottom",
    accent: "#7ec8ff",
    width: "min(32vw, 500px)",
    tags: ["prototype", "bottom row"],
    summary:
      "Another lower-row stand-in. Use the left list to move between every dummy project from this subpage.",
    images: [
      placeholderImage("Project E", "#7ec8ff", "01"),
      placeholderImage("Project E", "#4ea8e8", "02"),
      placeholderImage("Project E", "#b6e0ff", "03"),
    ],
  },
  {
    id: "project-f",
    name: "Project F",
    year: 2021,
    row: "bottom",
    accent: "#d0b3ff",
    width: "min(24vw, 360px)",
    tags: ["prototype", "bottom row"],
    summary:
      "Sixth placeholder, exclusive to the bottom track of the carousel lab.",
    images: [
      placeholderImage("Project F", "#d0b3ff", "01"),
      placeholderImage("Project F", "#b48ae6", "02"),
    ],
  },
  {
    id: "project-g",
    name: "Project G",
    year: 2020,
    row: "bottom",
    accent: "#f08ab4",
    width: "min(29vw, 440px)",
    tags: ["prototype", "bottom row"],
    summary:
      "Seventh placeholder, completing the lower row so both marquees can loop without sharing cards.",
    images: [
      placeholderImage("Project G", "#f08ab4", "01"),
      placeholderImage("Project G", "#d96a98", "02"),
      placeholderImage("Project G", "#ffc1d8", "03"),
    ],
  },
];

export const topRowProjects = dummyProjects.filter(project => project.row === "top");
export const bottomRowProjects = dummyProjects.filter(project => project.row === "bottom");

export default dummyProjects;
