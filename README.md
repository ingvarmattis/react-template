# react-template

Minimal starter: React 18, TypeScript, and Vite. Single page with the word **TEMPLATE** centered on screen.

## Commands

There is **no Vite dev server** — the app is always built as **production** (`vite build --mode production`).

- `npm install` — install dependencies
- `npm run build` — typecheck + production build to `dist/`
- `npm run preview` — serve the existing `dist/` (run `build` first)
- `npm start` — build, then open the preview server (port 3000)

## GitHub Actions

Same Docker pipeline as `moving/frontend`: [`.github/workflows/docker-pipeline.yml`](.github/workflows/docker-pipeline.yml).

- Triggers: push to `main` / `master`, tags `v*`, and pull requests to `main` / `master` (the image is **not** pushed on PRs — `if: github.event_name != 'pull_request'`).
- Pushes the image to **Google Artifact Registry** (`us-east4-docker.pkg.dev`), image path: `{PROJECT_ID}/containers/frontend`.
- Requires GitHub **environment** `moving-frontend`, repository **variable** `GCP_PROJECT_ID`, and **secrets** `GCP_REGISTRY_SA_KEY`, `VITE_API_TOKEN` (the workflow passes the token as a Docker build-arg; same pattern as the moving app).

`Dockerfile` and `nginx.conf` match the moving frontend layout so `docker build` in CI matches that project.
