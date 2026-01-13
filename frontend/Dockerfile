# --- Stage 1: Build ---
FROM node:22-alpine AS build

# Set production environment
ENV NODE_ENV=production

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm ci --include=dev --silent

# Copy source and build the app
COPY . .
RUN npm run build

# --- Stage 2: Production ---
FROM nginx:stable-alpine

# Security: Set up non-root user and required permissions
# We use the default 'nginx' user but must give it access to specific folders
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /usr/share/nginx/html

# Copy the built files from the build stage
# NOTE: Ensure your framework builds to /dist (Vite) or /build (CRA)
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Copy our hardened nginx configuration
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

# Switch to the non-root user
USER nginx

# Standard port for non-root Nginx is 8080
EXPOSE 8080

# Health check using the internal port
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]