# Arquitetura

## Visão geral
- Browser → **Frontend (React + Vite + Material UI)** → **Backend (Node.js + Express)** → **Postgres**.
- O frontend consome endpoints REST para listar e detalhar artigos.
- O backend expõe `/health`, `/articles` e `/articles/:id`, além de um endpoint protegido para gerar artigos.

## Geração automática de artigos
- Um job diário (node-cron) chama `aiClient` (placeholder) para gerar conteúdo.
- `articleService` persiste o resultado em Postgres (tabela `articles`).
- Ao subir a API, pelo menos 3 artigos são criados automaticamente caso o banco esteja vazio.

## Fluxo de deploy (conceitual)
- Código → CodeBuild → build das imagens (frontend e backend) → push para ECR.
- EC2 consome as imagens do ECR.
- Scripts `init-ec2.sh` e `deploy.sh` servem como rascunho para preparar a instância e subir containers.
