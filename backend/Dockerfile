FROM python:3.11-slim
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1

# System deps (optional)
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

# Copy backend source
COPY backend/ /app/backend/

# Requirements (adjust path/name if your file differs)
COPY backend/requirements.txt /app/
RUN pip install --no-cache-dir -r /app/requirements.txt

# Serve ASGI wrapper (adds CORS) on port 8080
ENV PORT=8080
CMD ["uvicorn", "backend.asgi:app", "--host", "0.0.0.0", "--port", "8080"]
