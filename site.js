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
    const name = document.createElement("span"); name.className = "rank-name"; name.textContent = item.name;
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

const copyButton = document.querySelector("#copy-citation");
copyButton.hidden = false;
copyButton.addEventListener("click",async () => {
  const citation = document.querySelector("#bibtex");
  try {
    await navigator.clipboard.writeText(citation.textContent);
    document.querySelector("#copy-status").textContent = "Copied";
  } catch {
    const range = document.createRange(); range.selectNodeContents(citation);
    const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
    document.querySelector("#copy-status").textContent = "Selected; press Ctrl/Cmd+C";
  }
});
