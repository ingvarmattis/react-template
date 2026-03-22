# react-template

Minimal starter: React 19, TypeScript, and Vite. Single page with the word **TEMPLATE** centered on screen.

## Commands

There is **no Vite dev server** — the app is always built as **production** (`vite build --mode production`).

- `npm install` — install dependencies
- `npm run build` — typecheck + production build to `dist/`
- `npm run preview` — serve the existing `dist/` (run `build` first)
- `npm start` — build, then open the preview server (port 3000)

Use **Node.js 22.12+** locally (required by Vite 8). The **Dockerfile** uses **`node:25-alpine`** (current Node line as of the template update).

## GitHub Actions

Same Docker pipeline as `moving/frontend`: [`.github/workflows/docker-pipeline.yml`](.github/workflows/docker-pipeline.yml).

- Triggers: push to `main` / `master`, tags `v*`, and pull requests to `main` / `master` (the image is **not** pushed on PRs — `if: github.event_name != 'pull_request'`).
- Pushes the image to **Google Artifact Registry** (`us-west2-docker.pkg.dev`), image path: `{PROJECT_ID}/containers/frontend`.
- Requires GitHub **environment** `environments`, repository **variable** `GCP_PROJECT_ID`, and secret **`GCP_REGISTRY_SA_KEY`**.
- **No `VITE_*` variables or secrets** are required in GitHub for this template. The app does not use `import.meta.env` yet, so Docker/CI do not pass build-time Vite env vars. When you add a backend (like `moving/frontend` with `src/utils/api.ts`), define `VITE_API_BASE_URL` / `VITE_API_TOKEN` in the workflow `build-args` and Dockerfile `ARG`/`ENV`, and add matching values in the `environments` environment (or repository secrets).

The **`Dockerfile`** builds the app with Node and serves **`dist/`** with the static server [**serve**](https://github.com/vercel/serve) (no nginx). The container listens on **port 3000**.
