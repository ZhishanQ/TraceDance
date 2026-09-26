# TraceDance website

Run the preview command below from the repository root.

The website uses plain HTML, CSS, and JavaScript. No build step is required.

```bash
python -m http.server 8000 --bind 127.0.0.1 --directory page
```

Open `http://localhost:8000/`.

- `index.html`: research overview, results, case study, and citation.
- `styles.css`: responsive page styles.
- `site.js`: result and case selectors, citation copying.
- `site-config.js`: public links. The code link remains empty until the system code is released.
- `assets/`: method and result figures, plus institution logos. The project README also uses these figures. `assets/models/` holds the small model logos shown next to each model in the result charts.

The chart reads its values from the HTML results table. When updating the paper, also check the website's statistics, case descriptions, and citation.

## Deployment

Website: https://zhishanq.github.io/TraceDance/

Source files live in `main:page/`. GitHub Pages serves the root of the `gh-pages` branch, which contains only the contents of `page/`.

After committing the intended website changes, run this command from the repository root to publish them:

```bash
bash page/publish.sh
```

The script checks that `page/` has no uncommitted changes, creates a deployment commit containing that directory's committed files, and pushes it to `gh-pages`. It uses standard Git commands without extra tooling. A push to `main` alone does not publish the website.

The project README lives at the repository root; keep website development instructions here. Paper files must not be added or published without explicit author approval.
