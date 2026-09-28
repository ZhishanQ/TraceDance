# TraceDance website

Run the preview command below from the repository root.

The website uses plain HTML, CSS, and JavaScript. No build step is required.

```bash
python -m http.server 8000 --bind 127.0.0.1 --directory page
```

Open `http://localhost:8000/`.

- `index.html`: research overview, results, case study, and citation.
- `styles.css`: responsive page styles.
- `site.js`: result and case selectors, and an in-page figure viewer with close and zoom controls.
- `site-config.js`: public links. The Code button links to the GitHub repository; the arXiv link remains empty until the paper is released.
- `assets/`: method and result figures, plus institution logos. The website uses SVG figures exported from the original paper PDFs so they stay sharp when enlarged; the project README uses the PNG copies. `assets/models/` holds the small model logos shown next to each model in the result charts.

The page uses one font family and a shared type scale. Figure previews open in a dialog without navigating away. The close button, Escape key, or backdrop click closes the dialog and restores focus to the preview. The citation entry is intentionally empty until the author supplies the final BibTeX.

The chart reads its values from the HTML results table. When updating the paper, also check the website's statistics, case descriptions, and citation.

The case study shows the two recorded `exec` calls from Appendix E.2, including their command and timeout fields. Workspace paths use the paper's `[WORKSPACE]` placeholder; reasoning blocks and tool-call IDs are omitted. Keep these calls aligned with the verified case records when editing the explanations.

## Deployment

Website: https://zhishanq.github.io/TraceDance/

Source files live in `main:page/`. GitHub Pages serves the root of the `gh-pages` branch, which contains only the contents of `page/`.

After committing the intended website changes, run this command from the repository root to publish them:

```bash
bash page/publish.sh
```

The script checks that `page/` has no uncommitted changes, creates a deployment commit containing that directory's committed files, and pushes it to `gh-pages`. It uses standard Git commands without extra tooling. A push to `main` alone does not publish the website.

The project README lives at the repository root; keep website development instructions here. Paper files must not be added or published without explicit author approval.
