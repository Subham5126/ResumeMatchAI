from fastapi import FastAPI

# Create FastAPI application
app = FastAPI(
    title="ResumeMatch AI",
    description="AI-powered Resume Analyzer API",
    version="1.0.0"
)

# Home Route
@app.get("/")
def home():
    return {
        "message": "Welcome to ResumeMatch AI 🚀"
    }

# Health Check Route
@app.get("/health")
def health():
    return {
        "status": "Running",
        "version": "1.0.0"
    }