"use strict";

const links = window.TRACEDANCE_LINKS || {};
function safeHttps(value) {
  try { const url = new URL(value); return url.protocol === "https:" ? url.href : ""; }
  catch { return ""; }
}
const codeUrl = safeHttps(links.code);
if (codeUrl) {
  document.querySelectorAll("[data-code-link]").forEach(link => {
    link.href = codeUrl;
    link.hidden = false;
  });
  document.querySelectorAll("[data-code-pending]").forEach(el => { el.hidden = true; });
}
const websiteUrl = safeHttps(links.website);
if (websiteUrl) {
  const canonical = document.createElement("link");
  canonical.rel = "canonical";
  canonical.href = websiteUrl;
  document.head.append(canonical);
}
const arxivUrl = safeHttps(links.arxiv);
if (arxivUrl) {
  const link = document.createElement("a");
  link.className = "button";
  link.href = arxivUrl;
  link.textContent = "arXiv ↗";
  document.querySelector(".actions").append(link);
}

// Both independent charts read the existing table; no joint frame/harness scores are inferred.
const rows = [...document.querySelectorAll("#model-results tbody tr")].map(row => [...row.children].map(cell => cell.textContent));
const modelLogos = [
  ["Claude", "claude"], ["DeepSeek", "deepseek"], ["GLM", "zai"], ["GPT", "openai"],
  ["Doubao", "doubao"], ["MiniMax", "minimax"], ["Kimi", "kimi"], ["Qwen", "qwen"]
];
function logoFor(name) {
  const match = modelLogos.find(([prefix]) => name.startsWith(prefix));
  if (!match) return null;
  const img = document.createElement("img");
  img.src = `assets/models/${match[1]}.png`;
  img.alt = "";
  img.width = 16; img.height = 16;
  img.className = "rank-logo";
  return img;
}
function renderRanking(metric, ranking) {
  const index = Number(metric.value);
  const sorted = rows.map(row => ({name: row[0], score: Number(row[index])})).sort((a,b) => b.score - a.score);
  const label = metric.selectedOptions[0].textContent;
  ranking.replaceChildren();
  const axis = document.createElement("div");
  axis.className = "rank-axis";
  for (const value of [0,25,50,75,100]) { const tick = document.createElement("span"); tick.textContent = `${value}%`; axis.append(tick); }
  ranking.append(axis);
  for (const item of sorted) {
    const row = document.createElement("div"); row.className = "rank-row";
    const name = document.createElement("span"); name.className = "rank-name";
    const logo = logoFor(item.name);
    if (logo) name.append(logo);
    name.append(item.name);
    const track = document.createElement("span"); track.className = "rank-track"; track.style.setProperty("--value",`${item.score}%`);
    const value = document.createElement("span"); value.className = "rank-value"; value.textContent = item.score.toFixed(1);
    row.append(name,track,value); ranking.append(row);
  }
  ranking.setAttribute("aria-label",`${label} pass rates: ${sorted.map(item => `${item.name} ${item.score}%`).join(", ")}`);
}
document.querySelector(".result-charts").hidden = false;
document.querySelector(".table-details").open = false;
for (const [selectId, chartId] of [["metric", "ranking"], ["harness", "harness-ranking"]]) {
  const select = document.getElementById(selectId);
  const chart = document.getElementById(chartId);
  select.addEventListener("change", () => renderRanking(select, chart));
  renderRanking(select, chart);
}

const caseButtons = [...document.querySelectorAll("[data-case]")];
document.querySelector(".case-switch").hidden = false;
function showCase(name) {
  for (const button of caseButtons) {
    const selected = button.dataset.case === name;
    button.setAttribute("aria-pressed",String(selected));
    document.querySelector(`#case-${button.dataset.case}`).hidden = !selected;
  }
}
caseButtons.forEach(button => button.addEventListener("click",() => showCase(button.dataset.case)));
showCase("kimi");

// Figure previews stay on this page. Native dialog handles Escape and background inertness.
const viewer = document.getElementById("figure-viewer");
const viewerImage = document.getElementById("figure-viewer-image");
const viewerBody = viewer.querySelector(".viewer-body");
const zoomToggle = document.getElementById("figure-zoom-toggle");
let figureTrigger = null;
function setFigureZoom(zoomed) {
  viewer.classList.toggle("is-zoomed", zoomed);
  zoomToggle.setAttribute("aria-pressed", String(zoomed));
  zoomToggle.textContent = zoomed ? "Fit to screen" : "Zoom in";
  viewerBody.scrollTo(0, 0);
}
for (const trigger of document.querySelectorAll(".figure-zoom")) {
  trigger.disabled = false;
  trigger.addEventListener("click", () => {
    const source = trigger.querySelector("img");
    figureTrigger = trigger;
    viewerImage.src = source.currentSrc || source.src;
    viewerImage.alt = source.alt;
    document.getElementById("figure-viewer-title").textContent = trigger.dataset.figureTitle;
    document.getElementById("figure-viewer-caption").textContent = trigger.closest("figure").querySelector("figcaption").textContent;
    setFigureZoom(false);
    viewer.showModal();
    document.documentElement.classList.add("modal-open");
  });
}
zoomToggle.addEventListener("click", () => setFigureZoom(!viewer.classList.contains("is-zoomed")));
document.getElementById("figure-close").addEventListener("click", () => viewer.close());
viewer.addEventListener("keydown", event => {
  if (event.key !== "Tab") return;
  const controls = [...viewer.querySelectorAll('button:not([disabled]), [tabindex="0"]')];
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
let backdropPress = false;
viewer.addEventListener("pointerdown", event => { backdropPress = event.target === viewer; });
viewer.addEventListener("click", event => {
  if (backdropPress && event.target === viewer) viewer.close();
  backdropPress = false;
});
viewer.addEventListener("close", () => {
  document.documentElement.classList.remove("modal-open");
  setFigureZoom(false);
  figureTrigger?.focus({preventScroll: true});
});
