from fastapi import APIRouter, UploadFile, File, Form
import os

from app.services.analysis_engine import analyze_resume

router = APIRouter(
    prefix="/analyze",
    tags=["Resume Analysis"]
)

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/")
async def analyze(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    file_path = os.path.join(
        UPLOAD_DIR,
        resume.filename
    )

    with open(file_path, "wb") as f:
        f.write(await resume.read())

    result = analyze_resume(
        file_path,
        job_description
    )

    return result