# TraceDance website

Run the preview command below from the repository root.

The website uses plain HTML, CSS, and JavaScript. No build step is required.

```bash
python -m http.server 8000 --bind 127.0.0.1 --directory page
```

Open `http://localhost:8000/`. Publishing is currently disabled.

- `index.html`: research overview, results, case study, and citation.
- `styles.css`: responsive page styles.
- `site.js`: result and case selectors, citation copying.
- `site-config.js`: public links. The code link remains empty until the system code is released.
- `assets/`: method figure and institution logos.

The chart reads its values from the HTML results table. When updating the paper, also check the website's statistics, case descriptions, and citation.

## Deployment

Deploy only the contents of `page/` as the website root. GitHub Pages branch publishing supports only the repository root or `docs/`, so publishing `page/` requires a workflow that uploads that directory as the Pages artifact. Deployment remains disabled until explicitly authorized.

The project README lives at the repository root; keep website development instructions here. Paper files must not be added or published without explicit author approval.
