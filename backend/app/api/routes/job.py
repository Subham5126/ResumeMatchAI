from fastapi import APIRouter
from pydantic import BaseModel

from app.services.job_parser import parse_job_description

router = APIRouter(prefix="/job", tags=["Job Description"])


class JobRequest(BaseModel):
    job_description: str


@router.post("/parse")
def parse_job(request: JobRequest):

    return parse_job_description(request.job_description)