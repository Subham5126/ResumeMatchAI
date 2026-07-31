import json

from app.services.ai_client import client, MODEL


def generate_ai_interview_questions(
    resume_data,
    job_data,
    matched_skills,
    missing_skills,
):
    prompt = f"""
You are a Senior Technical Interviewer.

Candidate Resume:
{resume_data}

Job Description:
{job_data}

Matched Skills:
{matched_skills}

Missing Skills:
{missing_skills}

Generate interview questions tailored specifically for this candidate and this job.

Requirements:

- 5 Easy questions
- 5 Medium questions
- 5 Hard questions
- 2 Behavioral questions
- 2 Project-based questions

The questions should:
- Match the job description
- Test the candidate's missing skills
- Ask about technologies present in the resume
- Be realistic interview questions
- Avoid duplicate questions

Return ONLY valid JSON.

Format:

{{
    "easy": [],
    "medium": [],
    "hard": [],
    "behavioral": [],
    "project": []
}}
"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an experienced technical interviewer. "
                    "Return only valid JSON."
                ),
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        response_format={"type": "json_object"},
        temperature=0.7,
        max_tokens=2000,
    )

    return json.loads(response.choices[0].message.content)