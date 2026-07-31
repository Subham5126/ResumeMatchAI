from app.prompts.cover_letter_prompt import COVER_LETTER_PROMPT
from app.services.ai_client import client, MODEL


def generate_cover_letter(
    analysis: dict,
    tone: str = "professional",
    length: str = "medium",
):
    """
    Generate an AI cover letter from the resume analysis.
    """

    resume = analysis.get("resume", {})
    job = analysis.get("job", {})

    user_prompt = f"""
Resume Information:
{resume}

Job Description:
{job}

Tone:
{tone}

Length:
{length}

Write a personalized cover letter.
Return ONLY the cover letter.
"""

    response = client.chat.completions.create(
        model=MODEL,
        temperature=0.6,
        max_tokens=1200,
        messages=[
            {
                "role": "system",
                "content": COVER_LETTER_PROMPT,
            },
            {
                "role": "user",
                "content": user_prompt,
            },
        ],
    )

    return response.choices[0].message.content.strip()