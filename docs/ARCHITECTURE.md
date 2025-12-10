# Architecture

## Overview
- Browser → **Frontend (React + Vite + Material UI)** → **Backend (Node.js + Express)** → **Postgres**.
- The frontend consumes REST endpoints to list and view articles.
- The backend exposes `/health`, `/articles`, and `/articles/:id`, plus a protected endpoint to generate articles.

## Automatic article generation
- A daily job (node-cron) calls `aiClient` (placeholder/OpenAI) to generate content.
- `articleService` persists the result in Postgres (table `articles`), applying basic deduplication.
- When the API starts, at least 3 articles are created automatically if the database is empty.

## Deploy flow (conceptual)
- Code → CodeBuild → build images (frontend and backend) → push to ECR.
- EC2 pulls images from ECR.
- Scripts `init-ec2.sh` and `deploy.sh` are sketches to prepare the instance and run containers.
