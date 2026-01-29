# VitePress Migration Plan

Goal: replace the current Wyam-based build with VitePress as the Markdown renderer/static site generator, then update CI/CD to build and deploy the VitePress output to Netlify.

## 0) Baseline and inventory
- Confirm current content sources and build output locations:
  - Source content: `input/` (posts/pages), `drafts/` (drafts), `wwwroot/` (assets), and any custom pipelines/scripts.
  - Build scripts: `build-new.sh`, `upload-netlify.sh`.
  - Current output folder: `output/`.
- Identify any URL structure/slug conventions produced by Wyam that must be preserved.
- List existing custom features: tags, RSS/Atom, sitemap, redirects, pagination, search, etc.

## 1) Add VitePress to the repo
- Prereqs: Node.js 18+ is required for VitePress.
- Install VitePress in the existing repo:
  - `npm add -D vitepress@next`
- Ensure ESM compatibility: VitePress is ESM-only; set `"type": "module"` in `package.json` or use `.mjs/.mts` for config files.

## 2) Scaffold the VitePress site
- Run the init wizard (recommended for existing projects to generate baseline files):
  - `npx vitepress init`
- Choose a nested site directory (e.g., `docs/`) so it is separate from other repo files. The guide explicitly recommends a nested directory for existing projects.
- Resulting structure should include `docs/.vitepress/config.js` and starter pages under `docs/`.

## 3) Define content mapping and migrate Markdown
- Decide the VitePress project root (assume `docs/`).
- Create a mapping from current Wyam content to VitePress:
  - `input/` posts -> `docs/blog/` (or another subfolder), preserving slugs.
  - `input/index.md` or home content -> `docs/index.md`.
  - `drafts/` -> keep out of build or move to `docs/drafts/` with a build exclusion.
- Convert frontmatter as needed (YAML) for VitePress (e.g., `title`, `date`, `description`).
- If Wyam used special shortcodes/helpers, replace with:
  - standard Markdown
  - VitePress Markdown extensions or Vue components as needed (new `.vue` components in `docs/.vitepress/theme` if required).

## 4) Configure VitePress
- Update `docs/.vitepress/config.(js|mjs)`:
  - `title`, `description`, `base` (if the site is served from a subpath), `cleanUrls` if desired.
  - Define `themeConfig` with navbar, sidebar, and footer.
- Add routing patterns for blog posts (folders map to routes automatically; check the Routing Guide as needed).
- Add site metadata (Open Graph, social links, edit links).

## 5) Assets and static files
- Move shared assets into `docs/public/` (VitePress will serve them at the site root).
- Update Markdown image links to match the new asset paths.

## 6) Build scripts and local dev
- Add npm scripts (the init wizard usually injects these):
  - `docs:dev`, `docs:build`, `docs:preview` using `vitepress dev|build|preview`.
- Validate the build output path (default is `.vitepress/dist` under the project root).
- Add `.vitepress/cache` and `.vitepress/dist` to `.gitignore`.
- Replace any Wyam-specific scripts:
  - Update `build-new.sh` to call `npm run docs:build`.
  - Retire Wyam-specific tooling references in README.

## 7) Netlify configuration (CI/CD)
- Set Netlify build settings to use VitePress build and output:
  - Build command: `npm run docs:build` (or `vitepress build docs`).
  - Publish directory: `docs/.vitepress/dist` (default VitePress output).
- Update `netlify.toml` to include build settings:
  - `[build] command = "npm run docs:build"`
  - `[build] publish = "docs/.vitepress/dist"`
  - Netlify uses `command` and `publish` in `netlify.toml` for build configuration.
  - Paths in `netlify.toml` are relative to the base directory (repo root by default).
- If using Netlify UI instead of file-based configuration, update Build & deploy settings to match the above.

## 8) Update Netlify deploy tooling
- If you keep `upload-netlify.sh`:
  - Switch the deploy directory to `docs/.vitepress/dist`.
  - Ensure `netlify deploy --prod --dir=docs/.vitepress/dist`.
- If you rely on Netlify CI builds (recommended), remove manual deploy steps and let Netlify build from the repo using the new `netlify.toml`.

## 9) Validate output parity
- Compare key pages between Wyam output and VitePress output:
  - Home page, blog list, a recent post, a tag/category page (if implemented), RSS, sitemap.
- Validate that URLs are stable or add redirects (Netlify `_redirects` or `netlify.toml` redirects).
- Check asset URLs, canonical links, and SEO meta.

## 10) Clean up legacy build system
- Remove Wyam/Cake artifacts if no longer needed:
  - `config.wyam*`, Wyam packages, scripts referencing Wyam.
- Update documentation (`README.md`) to describe VitePress commands and deploy flow.

## 11) Rollout
- Create a preview deploy on Netlify to verify the new build.
- After verification, promote to production.
- Monitor for 404s and performance regressions.

## Deliverables checklist
- `docs/` VitePress site with migrated content and config.
- Updated `package.json` scripts for VitePress.
- Updated `.gitignore` for VitePress output/cache.
- Updated `netlify.toml` build settings and/or Netlify UI configuration.
- Updated `build-new.sh` and `upload-netlify.sh` (or removed if not needed).
- Updated `README.md` with VitePress dev/build instructions.
