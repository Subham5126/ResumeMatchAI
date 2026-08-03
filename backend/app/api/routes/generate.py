from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.ai_interview_generator import generate_ai_interview_questions
from app.services.interview_questions import generate_interview_questions
from app.services.ai_roadmap_generator import generate_ai_roadmap
from app.services.learning_roadmap import generate_learning_roadmap

router = APIRouter(prefix="/generate", tags=["On-Demand Generation"])


class GenerateRequest(BaseModel):
    analysis: dict


@router.post("/interview")
def gen_interview(request: GenerateRequest):
    """Generate AI interview questions on-demand from a completed analysis payload."""
    analysis = request.analysis
    resume_data     = analysis.get("resume", {})
    job_data        = analysis.get("job", {})
    keyword_result  = analysis.get("keyword_analysis", {})
    matched_skills  = keyword_result.get("matched_skills", [])
    missing_skills  = keyword_result.get("missing_skills", [])

    try:
        questions = generate_ai_interview_questions(
            resume_data=resume_data,
            job_data=job_data,
            matched_skills=matched_skills,
            missing_skills=missing_skills,
        )
    except Exception as e:
        print("AI Interview Generation failed, falling back:", e)
        questions = generate_interview_questions(matched_skills, missing_skills)

    return {"interview_questions": questions}


@router.post("/roadmap")
def gen_roadmap(request: GenerateRequest):
    """Generate AI learning roadmap on-demand from a completed analysis payload."""
    analysis = request.analysis
    resume_data     = analysis.get("resume", {})
    job_data        = analysis.get("job", {})
    keyword_result  = analysis.get("keyword_analysis", {})
    recommendations = analysis.get("recommendations", [])
    matched_skills  = keyword_result.get("matched_skills", [])
    missing_skills  = keyword_result.get("missing_skills", [])

    try:
        roadmap = generate_ai_roadmap(
            resume_data=resume_data,
            job_data=job_data,
            matched_skills=matched_skills,
            missing_skills=missing_skills,
            recommendations=recommendations,
        )
    except Exception as e:
        print("AI Roadmap Generation failed, falling back:", e)
        roadmap = generate_learning_roadmap(missing_skills)

    return {"learning_roadmap": roadmap}
