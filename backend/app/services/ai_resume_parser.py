import os
import json

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

MODEL = "llama-3.3-70b-versatile"


def ai_parse_resume(text):

    prompt = f"""
You are an expert ATS Resume Parser.

Extract information from the resume.

Rules:

1. Return ONLY valid JSON.
2. Do NOT include explanations.
3. Do NOT leave missing fields as null. Use "" or [].
4. Preserve exact names of companies, universities and projects.
5. Experience, Education and Projects MUST be arrays of JSON objects.

Return JSON in EXACTLY this format:

{{
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "summary": "",

    "skills": [
        "Python",
        "AWS"
    ],

    "education": [
        {{
            "degree": "",
            "university": "",
            "dates": "",
            "location": ""
        }}
    ],

    "experience": [
        {{
            "title": "",
            "company": "",
            "dates": "",
            "location": "",
            "achievements": []
        }}
    ],

    "projects": [
        {{
            "name": "",
            "description": "",
            "github": "",
            "technologies": []
        }}
    ],

    "certifications": [
        {{
            "name": "",
            "issuer": "",
            "date": ""
        }}
    ],

    "github": [],
    "linkedin": ""
}}

Resume:

{text}
"""

    response = client.chat.completions.create(
        model=MODEL,
        response_format={"type": "json_object"},
        temperature=0.1,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return json.loads(response.choices[0].message.content)