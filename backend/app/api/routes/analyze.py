from fastapi import APIRouter, UploadFile, File, Form

from app.services.resume_parser import extract_resume_text
from app.utils.text_cleaner import clean_resume_text
from app.services.information_extractor import parse_resume
from app.services.job_parser import parse_job_description
from app.services.scoring_engine import calculate_skill_score

router = APIRouter(prefix="/analyze", tags=["Resume Analysis"])


@router.post("/")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):

    # Save uploaded resume
    file_path = f"uploads/{resume.filename}"

    with open(file_path, "wb") as f:
        f.write(await resume.read())

    # Extract text
    resume_text = extract_resume_text(file_path)

    # Clean text
    resume_text = clean_resume_text(resume_text)

    # Parse resume
    resume_data = parse_resume(resume_text)

    # Parse job description
    jd_data = parse_job_description(job_description)

    # Skill matching
    skill_result = calculate_skill_score(
        resume_data["skills"],
        jd_data["required_skills"]
    )

    return {
        "resume": resume_data,
        "job": jd_data,
        "skill_analysis": skill_result
    }