from app.prompts.rewrite_prompt import REWRITE_PROMPT
from app.services.ai_client import client, MODEL


def extract_section(section: str, analysis: dict) -> str:
    """
    Extract the requested section from the analyzed resume.
    """

    resume = analysis.get("resume", {})

    mapping = {
        "summary": resume.get("summary", ""),
        "projects": resume.get("projects", []),
        "experience": resume.get("experience", []),
        "skills": resume.get("skills", []),
        "education": resume.get("education", []),
    }

    value = mapping.get(section.lower())

    if isinstance(value, list):
        return "\n".join(str(item) for item in value)

    return str(value or "")


def rewrite_resume_section(
    section: str,
    analysis: dict,
    job_description: str = "",
):
    content = extract_section(section, analysis)

    if not content.strip():
        return "The selected section was not found in your resume."

    user_prompt = f"""
Resume Section:
{section}

Current Content:
{content}

Job Description:
{job_description}

Rewrite this section professionally.
Return ONLY the improved version.
"""

    response = client.chat.completions.create(
        model=MODEL,
        temperature=0.4,
        max_tokens=1000,
        messages=[
            {
                "role": "system",
                "content": REWRITE_PROMPT,
            },
            {
                "role": "user",
                "content": user_prompt,
            },
        ],
    )

    return response.choices[0].message.content.strip()