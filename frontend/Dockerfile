
FROM public.ecr.aws/docker/library/node:20-alpine AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

FROM public.ecr.aws/docker/library/nginx:alpine
# copia os arquivos estáticos buildados
COPY --from=build /app/dist /usr/share/nginx/html

# sobrescreve a configuração padrão com a nossa, que tem o try_files
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
