# Use Python 3.12 slim for a small footprint
FROM python:3.12-slim AS builder

# 1. Install 'uv' from the official distroless image (extremely fast)
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvbin/uv

WORKDIR /app

# 2. Install minimal system dependencies for C-extensions (needed for AI libs)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 3. Cache Management: Copy only requirements first
COPY requirements.txt .

# 4. Use 'uv' with a cache mount. 
# This skips redownloading packages even if the build fails or you clear local cache.
RUN --mount=type=cache,target=/root/.cache/uv \
    /uvbin/uv pip install --system --no-cache -r requirements.txt

# --- Final Stage ---
FROM python:3.12-slim

WORKDIR /app

# Copy only the installed packages from the builder
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy application code (This layer is fast and changes often)
COPY backend/app ./app

# Setup persistence
RUN mkdir -p /app/chroma_db /app/data

# Security: Non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser && \
    chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

# Use Uvicorn for the entry point
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]