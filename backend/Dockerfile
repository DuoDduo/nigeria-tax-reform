# --- Builder Stage ---
FROM python:3.12-slim AS builder

# 1. Install 'uv' for high-speed pip installs
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvbin/uv

WORKDIR /app

# 2. Install minimal system dependencies for AI libraries (chromadb needs build-essential)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 3. Copy requirements from the ROOT
COPY requirements.txt .

# 4. Install dependencies into system python
RUN --mount=type=cache,target=/root/.cache/uv \
    /uvbin/uv pip install --system --no-cache -r requirements.txt

# --- Final Stage ---
FROM python:3.12-slim

WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# 5. Copy Backend Code & ChromaDB
# We assume the build command is run from the project root
COPY backend/app ./app
COPY backend/chroma_db ./chroma_db

# 6. Ensure directories exist for persistence
RUN mkdir -p /app/chroma_db /app/data

# 7. Security: Run as non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser && \
    chown -R appuser:appuser /app

# Give appuser permission to write to the database
RUN chmod -R 775 /app/chroma_db

USER appuser

EXPOSE 8000

# Use Uvicorn for the entry point
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]