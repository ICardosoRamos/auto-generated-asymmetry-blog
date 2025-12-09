#!/usr/bin/env bash
# Rascunho de script de deploy.
# - Fazer pull das imagens do ECR (backend e frontend) usando a tag desejada.
# - Criar/atualizar um docker-compose específico de produção (ex.: docker-compose.prod.yml).
# - Subir containers com `docker compose up -d`.
# - Opcional: aplicar migrações, rodar health checks e configurar logs.

set -euo pipefail

IMAGE_TAG=${IMAGE_TAG:-"latest"}
AWS_REGION=${AWS_REGION:-"us-east-1"}
ACCOUNT_ID="<preencher_com_account_id>"
BACKEND_IMAGE_REPO_NAME=${BACKEND_IMAGE_REPO_NAME:-"ai-blog-backend"}
FRONTEND_IMAGE_REPO_NAME=${FRONTEND_IMAGE_REPO_NAME:-"ai-blog-frontend"}

REPOSITORY_BACKEND="$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$BACKEND_IMAGE_REPO_NAME"
REPOSITORY_FRONTEND="$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$FRONTEND_IMAGE_REPO_NAME"

echo "Script de deploy placeholder. Complete os comandos de docker pull/compose antes de usar."
echo "Backend: $REPOSITORY_BACKEND:$IMAGE_TAG"
echo "Frontend: $REPOSITORY_FRONTEND:$IMAGE_TAG"
