import re
import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
SKILLS_PATH = os.path.join(BASE_DIR, "data", "skills.json")

with open(SKILLS_PATH, "r", encoding="utf-8") as file:
    SKILLS_DB = json.load(file)


def extract_required_skills(job_description):

    found = []

    text = job_description.lower()

    for skill in SKILLS_DB:

        if skill.lower() in text:
            found.append(skill)

    return sorted(set(found))


def parse_job_description(job_description):

    return {
        "required_skills": extract_required_skills(job_description)
    }