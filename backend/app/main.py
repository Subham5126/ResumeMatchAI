from fastapi import FastAPI
from app.api.routes.resume import router as resume_router
from app.api.routes.job import router as job_router
from app.api.routes.match import router as match_router
from app.api.routes.analyze import router as analyze_router


app = FastAPI(
    title="ResumeMatch AI",
    description="AI-powered Resume Analyzer API",
    version="1.0.0"
)
app.include_router(job_router)
app.include_router(resume_router)
app.include_router(match_router)
app.include_router(analyze_router)

@app.get("/")
def home():
    return {"message": "Welcome to ResumeMatch AI 🚀"}

@app.get("/health")
def health():
    return {"status": "Running"}