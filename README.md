# AI Generated Blog (Monorepo)

Monorepo with **frontend** (React + Vite + Material UI), **backend** (Node.js/Express with Postgres and daily cron), and basic **infra** using Docker Compose.

## Stack
- Frontend: React, Vite, Material UI, react-router-dom, axios.
- Backend: Node.js, Express, PostgreSQL (pg), node-cron, axios, dotenv.
- Infra: Docker, Docker Compose, placeholder CodeBuild buildspec.

## How to run locally
```bash
cd infra
docker compose up --build
```
- Frontend: http://localhost:8080
- Backend: http://localhost:4000

## Main backend endpoints
- `GET /health` — simple status.
- `GET /articles` — list articles (supports pagination, topic/search filters, and sort).
- `GET /articles/:id` — article details.
- `POST /articles/generate` — generate a new article (protected with header `X-ADMIN-SECRET`).

## Structure
- `backend/` — API, cron, integration with Postgres.
- `frontend/` — SPA with Material UI consuming the API.
- `infra/` — Dockerfiles, docker-compose, and reference scripts/buildspec.
- `docs/` — architecture overview.
