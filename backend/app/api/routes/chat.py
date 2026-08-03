from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

from app.services.chat_service import ask_career_coach

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


class ChatRequest(BaseModel):
    question: str
    analysis: Optional[dict] = {}
    history: list = []


@router.post("")
def chat(request: ChatRequest):
    return ask_career_coach(
        question=request.question,
        analysis=request.analysis,
        history=request.history
    )