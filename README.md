# AI Generated Blog (Monorepo)

Monorepo com **frontend** em React + Vite + Material UI, **backend** em Node.js/Express com Postgres e cron diário, e **infra** básica com Docker Compose.

## Tecnologias
- Frontend: React, Vite, Material UI, react-router-dom, axios.
- Backend: Node.js, Express, PostgreSQL (pg), node-cron, axios, dotenv.
- Infra: Docker, Docker Compose, buildspec CodeBuild (placeholder).

## Como rodar localmente
```bash
cd infra
docker compose up --build
```
- Frontend: http://localhost:8080
- Backend: http://localhost:4000

## Principais endpoints do backend
- `GET /health` — status simples.
- `GET /articles` — lista artigos.
- `GET /articles/:id` — detalhe de artigo.
- `POST /articles/generate` — gera novo artigo (protegido com header `X-ADMIN-SECRET`).

## Estrutura
- `backend/` — API, cron, integração com Postgres.
- `frontend/` — SPA com Material UI consumindo a API.
- `infra/` — Dockerfiles, docker-compose e scripts/buildspec de referência.
- `docs/` — visão de arquitetura.
