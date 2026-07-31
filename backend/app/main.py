from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.rewrite import router as rewrite_router
from app.api.routes.resume import router as resume_router
from app.api.routes.job import router as job_router
from app.api.routes.match import router as match_router
from app.api.routes.analyze import router as analyze_router
from app.api.routes.chat import router as chat_router
from app.api.routes.cover_letter import router as cover_letter_router
app = FastAPI(
    title="ResumeMatch AI",
    description="AI-powered Resume Analyzer API",
    version="1.0.0"
)

# ===========================
# Register API Routes
# ===========================

app.include_router(job_router)
app.include_router(resume_router)
app.include_router(match_router)
app.include_router(analyze_router)
app.include_router(chat_router)
app.include_router(rewrite_router)
app.include_router(cover_letter_router)
# ===========================
# CORS Configuration
# ===========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===========================
# Root Endpoint
# ===========================

@app.get("/")
def home():
    return {
        "message": "Welcome to ResumeMatch AI 🚀"
    }

# ===========================
# Health Check
# ===========================

@app.get("/health")
def health():
    return {
        "status": "Running"
    }