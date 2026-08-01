from fastapi import APIRouter
from pydantic import BaseModel

from app.services.resume_rewriter import rewrite_resume_section

router = APIRouter(
    prefix="/rewrite",
    tags=["Resume Rewrite"]
)


class RewriteRequest(BaseModel):
    section: str
    analysis: dict
    job_description: str = ""


@router.post("")
def rewrite(request: RewriteRequest):

    rewritten = rewrite_resume_section(
        section=request.section,
        analysis=request.analysis,
        job_description=request.job_description,
    )

    return {
        "section": request.section,
        "rewritten_text": rewritten,
    }