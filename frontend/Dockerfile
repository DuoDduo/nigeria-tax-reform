# --- Stage 1: Build ---
FROM node:22-slim AS build
WORKDIR /app

# 1. Copy only package files first for better caching
COPY package*.json ./

# 2. Install ALL dependencies (Docker will fetch Linux-specific ones)
RUN npm install

# 3. Copy the rest of the source code
COPY . .

# 4. Build the application
RUN npm run build

# --- Stage 2: Production ---
FROM nginx:stable-alpine
RUN apk add --no-cache curl

# Security: Set up permissions for non-root user
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /usr/share/nginx/html /etc/nginx/conf.d

COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

USER nginx
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]