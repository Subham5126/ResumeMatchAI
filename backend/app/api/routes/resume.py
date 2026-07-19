from fastapi import APIRouter, UploadFile, File
import shutil
import os
from app.services.information_extractor import parse_resume

from app.services.resume_parser import extract_resume_text

router = APIRouter(prefix="/resume", tags=["Resume"])

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_resume_text(file_path)
    from app.utils.text_cleaner import clean_resume_text
    text = clean_resume_text(text)
    parsed_data = parse_resume(text)

    return {
        "filename": file.filename,
        "parsed_data": parsed_data
    }