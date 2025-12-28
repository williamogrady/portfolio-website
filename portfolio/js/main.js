// main.js
const stage = document.getElementById("stage");
const tabs = Array.from(document.querySelectorAll(".tab"));

let activeTab = "intro";

const DATA = {
  intro: {
    text:
      "I design calm interfaces for complex systems.\n" +
      "My focus is interaction design + data visualization.\n" +
      "Currently building and evaluating an interactive power-grid prototype."
  },
 about: {
  skills: {
    areas: [
      {
        title: "Interaction Design",
        detail: "Information hierarchy, layout systems, affordances, usability."
      },
      {
        title: "Data Visualization",
        detail: "Designing visual encodings for state, constraints, and trade-offs."
      },
      {
        title: "User Studies",
        detail: "Study design, think-aloud sessions, surveys, mixed-method analysis."
      }
    ],
    programming: [
      {
        title: "JavaScript / TypeScript",
        detail: "D3.js, DOM/SVG, interaction patterns, state-driven rendering."
      },
      {
        title: "Python",
        detail: "Data processing, simulation tooling, small backend scripts."
      },
      {
        title: "HTML / CSS",
        detail: "Component layout, typographic rhythm, responsive constraints."
      }
    ],
    languages: [
      { title: "English", detail: "Native" },
      { title: "Swedish", detail: "Native" },
      { title: "German", detail: "B Level Proficiency" },
      { title: "Japanese", detail: "A Level Proficiency" },
      { title: "Dutch, Italian", detail: "Basic Understanding"}
    ]
  },

  experience: {
    education: [
      {
        title: "KTH Royal Institute of Technology",
        meta: "M.Sc., Interactive Media Technology",
        detail: "2020-2025"
      },
      {
        title: "Technische Universiteit Delft",
        meta: "Exchange, Computer Science",
        detail: "Spring 2024"
      }
    ]
  }
},

  work: [
    { title: "Power Grid System — Map vs List Interfaces", date: "2025", desc: "Designed and evaluated two opposing visualization layouts for decision-making under constraints." },
    { title: "Scenario Design + Scoring System", date: "2025", desc: "Built scenarios, goals, and feedback to support consistent tasks and comparable results." },
    { title: "D3 Topology Rendering (IEEE-style)", date: "2025", desc: "Recreated network topology in SVG with state-driven overlays for system stress visibility." },
    { title: "User Study Flow + Result Capture", date: "2025", desc: "Structured onboarding, task sequencing, and exported metrics to support analysis." }
  ]
};

// Self-diagnose whether CSS loaded
(function cssDiagnostics() {
  const cssOk = getComputedStyle(document.documentElement).getPropertyValue("--css-ok").trim();
  if (cssOk !== "1") {
    const banner = document.createElement("div");
    banner.textContent = "CSS NOT LOADED — check file location/path";
    banner.style.position = "fixed";
    banner.style.top = "12px";
    banner.style.left = "12px";
    banner.style.padding = "10px 12px";
    banner.style.background = "black";
    banner.style.color = "white";
    banner.style.fontSize = "14px";
    banner.style.zIndex = "9999";
    document.body.appendChild(banner);
  }
})();

// Tabs
tabs.forEach((btn) => btn.addEventListener("click", () => setActiveTab(btn.dataset.tab)));

function setActiveTab(tab) {
  activeTab = tab;
  tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === tab));
  render();
}

function render() {
  stage.innerHTML = "";
  if (activeTab === "intro") renderIntro();
  if (activeTab === "about") renderAbout();
  if (activeTab === "work") renderWork();
}

function renderIntro() {
  const text = document.createElement("div");
  text.className = "big-text";
  text.textContent = DATA.intro.text;
  stage.appendChild(text);
}

function renderAbout() {
  const cols = document.createElement("div");
  cols.className = "columns";

  // LEFT: Skills
  const left = document.createElement("div");
  left.className = "column";
  left.appendChild(sectionTitle("Skills"));

  left.appendChild(
    sectionBlock("Areas", DATA.about.skills.areas.map(toItem))
  );
  left.appendChild(
    sectionBlock("Programming", DATA.about.skills.programming.map(toItem))
  );

  // RIGHT: Experience
  const right = document.createElement("div");
  right.className = "column";
  right.appendChild(sectionTitle("Experience"));

  right.appendChild(
    sectionBlock("Education", DATA.about.experience.education.map(toItemMeta))
  );
  right.appendChild(
    sectionBlock("Languages", DATA.about.skills.languages.map(toItem))
  );

  cols.append(left, right);
  stage.appendChild(cols);
}

function sectionTitle(text) {
  const h = document.createElement("h3");
  h.textContent = text;
  return h;
}

function sectionBlock(label, items) {
  const wrap = document.createElement("section");
  wrap.className = "about-section";

  const head = document.createElement("div");
  head.className = "about-section-title";
  head.textContent = label;

  const list = document.createElement("div");
  list.className = "about-list";
  items.forEach((el) => list.appendChild(el));

  wrap.append(head, list);
  return wrap;
}

function toItem(x) {
  const el = document.createElement("div");
  el.className = "about-item";
  el.innerHTML = `
    <div class="about-item-title">${escapeHtml(x.title)}</div>
    <div class="about-item-detail">${escapeHtml(x.detail)}</div>
  `;
  return el;
}

function toItemMeta(x) {
  const el = document.createElement("div");
  el.className = "about-item";
  el.innerHTML = `
    <div class="about-item-title">${escapeHtml(x.title)}</div>
    <div class="about-item-meta">${escapeHtml(x.meta)}</div>
    <div class="about-item-detail">${escapeHtml(x.detail)}</div>
  `;
  return el;
}


function renderWork() {
  const list = document.createElement("div");
  list.className = "work-list";

  DATA.work.forEach((item) => list.appendChild(createWorkItem(item)));
  stage.appendChild(list);
}

function createWorkItem(item) {
  const el = document.createElement("article");
  el.className = "work-item";

  const title = document.createElement("div");
  title.className = "work-title";
  title.textContent = item.title;

  const date = document.createElement("div");
  date.className = "work-date";
  date.textContent = item.date;

  const desc = document.createElement("div");
  desc.className = "work-desc";
  desc.textContent = item.desc;

  el.append(title, date, desc);
  return el;
}

function renderList(items) {
  const li = items.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
  return `<ul>${li}</ul>`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

render();
