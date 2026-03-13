# Render Deployment

This repo is set up to deploy as one Docker-based web service on Render.

## What it does

- Uses the production frontend assets already in `backend/public/`
- Runs FastAPI with `backend.asgi:app`
- Serves the frontend and API from the same domain

## Deploy steps

1. Push this repository to GitHub.
2. In Render, create a new `Blueprint` or `Web Service` from the repo.
3. If using Blueprint, Render will pick up `render.yaml` automatically.
4. If using a plain Web Service, choose `Docker` as the runtime and point it at the repo root.
5. After deploy, open `/health` to verify the API and `/` to verify the app.

## Notes

- The app currently uses SQLite, so data is ephemeral unless you attach a persistent disk or move to Postgres.
- The frontend uses same-origin API calls by default, so no separate frontend host is required.
- If you change frontend code, rebuild it locally and copy the generated `dist` files into `backend/public/` before deploying.