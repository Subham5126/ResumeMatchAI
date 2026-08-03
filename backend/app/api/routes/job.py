from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.job_parser import parse_job_description
from app.services.job_url_scraper import fetch_job_from_url

router = APIRouter(prefix="/job", tags=["Job Description"])


class JobRequest(BaseModel):
    job_description: str


class JobUrlRequest(BaseModel):
    url: str


@router.post("/parse")
def parse_job(request: JobRequest):
    return parse_job_description(request.job_description)


@router.post("/fetch-url")
def fetch_job_url(request: JobUrlRequest):
    """Fetch and extract job description text from a job posting URL."""
    try:
        result = fetch_job_from_url(request.url)
        return {"success": True, "text": result["text"], "source": result["source"]}
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch URL: {str(e)}")