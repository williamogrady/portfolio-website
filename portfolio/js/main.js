const stage = document.getElementById("stage");
const tabs = Array.from(document.querySelectorAll(".tab"));

let activeTab = "intro";
let DATA = null;

// ---- Load content from /data/content.json ----
init();

async function init() {
  try {
    const res = await fetch("./data/content.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load content.json (${res.status})`);
    DATA = await res.json();

    wireTabs();
    render();
  } catch (err) {
    showError(err);
  }
}

function wireTabs() {
  tabs.forEach((btn) => btn.addEventListener("click", () => setActiveTab(btn.dataset.tab)));

  // Optional: keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (e.key === "1") setActiveTab("intro");
    if (e.key === "2") setActiveTab("about");
    if (e.key === "3") setActiveTab("work");
  });
}

function setActiveTab(tab) {
  activeTab = tab;
  tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === tab));
  render();
}

function render() {
  if (!DATA) return;

  stage.innerHTML = "";

  if (activeTab === "intro") renderIntro(DATA.intro);
  if (activeTab === "about") renderAbout(DATA.about);
  if (activeTab === "work") renderWork(DATA.work);
}

// -------- Views --------

function renderIntro(intro) {
  const text = document.createElement("div");
  text.className = "big-text";
  text.textContent = intro?.text ?? "";
  stage.appendChild(text);
}

function renderAbout(about) {
  const cols = document.createElement("div");
  cols.className = "columns";

  // LEFT: Skills
  const left = document.createElement("div");
  left.className = "column";
  left.appendChild(sectionTitle("Skills"));

  left.appendChild(sectionBlock("Areas", (about?.skills?.areas ?? []).map(toItem)));
  left.appendChild(sectionBlock("Programming", (about?.skills?.programming ?? []).map(toItem)));

  // RIGHT: Experience + Languages
  const right = document.createElement("div");
  right.className = "column";
  right.appendChild(sectionTitle("Experience"));

  right.appendChild(sectionBlock("Education", (about?.experience?.education ?? []).map(toItemMeta)));
  right.appendChild(sectionBlock("Languages", (about?.skills?.languages ?? []).map(toItem)));

  cols.append(left, right);
  stage.appendChild(cols);
}

function renderWork(work) {
  const list = document.createElement("div");
  list.className = "work-list";

  (work ?? []).forEach((item) => list.appendChild(createWorkItem(item)));

  stage.appendChild(list);
}

// -------- Components / helpers --------

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
    <div class="about-item-title">${escapeHtml(x?.title ?? "")}</div>
    <div class="about-item-detail">${escapeHtml(x?.detail ?? "")}</div>
  `;
  return el;
}

function toItemMeta(x) {
  const el = document.createElement("div");
  el.className = "about-item";
  el.innerHTML = `
    <div class="about-item-title">${escapeHtml(x?.title ?? "")}</div>
    <div class="about-item-meta">${escapeHtml(x?.meta ?? "")}</div>
    <div class="about-item-detail">${escapeHtml(x?.detail ?? "")}</div>
  `;
  return el;
}

function createWorkItem(item) {
  const el = document.createElement("article");
  el.className = "work-item";

  const title = document.createElement("div");
  title.className = "work-title";
  title.textContent = item?.title ?? "";

  const date = document.createElement("div");
  date.className = "work-date";
  date.textContent = item?.date ?? "";

  const desc = document.createElement("div");
  desc.className = "work-desc";
  desc.textContent = item?.desc ?? "";

  el.append(title, date, desc);
  return el;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showError(err) {
  stage.innerHTML = "";
  const msg = document.createElement("div");
  msg.className = "big-text";
  msg.textContent =
    "Could not load /data/content.json.\n" +
    "Check that the file exists and Live Server is running from the /portfolio folder.\n\n" +
    String(err);
  stage.appendChild(msg);
}
