from fastapi import APIRouter
from pydantic import BaseModel

from app.services.cover_letter import generate_cover_letter

router = APIRouter(
    prefix="/cover-letter",
    tags=["Cover Letter"]
)


class CoverLetterRequest(BaseModel):
    analysis: dict
    tone: str = "professional"
    length: str = "medium"


@router.post("/")
def create_cover_letter(request: CoverLetterRequest):

    cover_letter = generate_cover_letter(
        analysis=request.analysis,
        tone=request.tone,
        length=request.length,
    )

    return {
        "cover_letter": cover_letter
    }