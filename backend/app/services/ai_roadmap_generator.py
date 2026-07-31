import json

from app.services.ai_client import client, MODEL


def generate_ai_roadmap(
    resume_data,
    job_data,
    matched_skills,
    missing_skills,
    recommendations,
):
    prompt = f"""
You are an expert AI Career Mentor.

Resume Information:
{resume_data}

Job Description:
{job_data}

Matched Skills:
{matched_skills}

Missing Skills:
{missing_skills}

Recommendations:
{recommendations}

Create a highly personalized learning roadmap.

Requirements:

- Duration should be between 4 and 8 weeks.
- Focus mainly on missing skills.
- Every week should include:
  - Topics
  - Resources
  - Mini Project
- Resources should be names of official documentation, courses or websites.
- Return ONLY valid JSON.
- Do not include markdown.
- Do not include explanations.

Return JSON exactly like this:

{{
  "title": "",
  "duration": "",
  "weeks": [
    {{
      "week": 1,
      "topics": [],
      "resources": [],
      "project": ""
    }}
  ]
}}
"""

    print("=" * 60)
    print(f"Generating roadmap using Groq ({MODEL})...")
    print("=" * 60)

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an expert AI Career Mentor. "
                        "Always respond with valid JSON only."
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

        roadmap = json.loads(
            response.choices[0].message.content
        )

        print("✅ Roadmap generated successfully using Groq.")

        return roadmap

    except Exception as e:
        print("=" * 60)
        print("❌ Groq Roadmap Generation Failed")
        print(e)
        print("=" * 60)

        raise e