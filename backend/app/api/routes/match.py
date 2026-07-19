from fastapi import APIRouter
from pydantic import BaseModel

from app.services.scoring_engine import calculate_skill_score

router = APIRouter(prefix="/match", tags=["Resume Matching"])


class MatchRequest(BaseModel):
    resume_skills: list[str]
    job_skills: list[str]


@router.post("/skills")
def match_skills(request: MatchRequest):
    return calculate_skill_score(
        request.resume_skills,
        request.job_skills
    )