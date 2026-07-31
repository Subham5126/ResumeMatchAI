# Use an official lightweight Python runtime
FROM python:3.10-slim

# Prevent Python from writing .pyc files and enable unbuffered output
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies (needed for lxml / PDF tools if applicable)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file first (enables Docker layer caching)
COPY requirements.txt .

# Install CPU-only PyTorch FIRST, then remaining dependencies
RUN pip install --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu && \
    pip install --no-cache-dir -r requirements.txt

# Copy application source code
COPY . .

# Expose default Cloud Run port
EXPOSE 8080

# Run FastAPI app with Uvicorn bound to 0.0.0.0 and PORT env variable
CMD exec uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}