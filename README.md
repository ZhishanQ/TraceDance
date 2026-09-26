# TraceDance

**Automatically building agent behavior benchmarks from real-world deployment traces.**

Paper forthcoming. The repository is private and GitHub Pages is currently disabled.

TraceDance constructs targeted benchmarks for user-specified undesirable agent behaviors using real-world deployment traces. It combines Anchor-and-Confirm retrieval with specification synthesis and evaluates a model's next turn at a recorded decision point.

## Code availability

Code is currently under internal review. This repository currently hosts the project website. Source deployment traces are not released.

## Website development

The website uses plain HTML, CSS, and JavaScript. No build step is required.

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://localhost:8000/`. Publishing is currently disabled.

- `index.html`: research overview, authors, results, case study, and citation.
- `styles.css`: responsive page styles.
- `site.js`: result and case selectors, citation copying.
- `site-config.js`: public links. The code link remains empty until the system code is released.
- `assets/`: method figure and institution logos.

The chart reads its values from the HTML results table. When updating the paper, also check the website's statistics, case descriptions, and citation.
