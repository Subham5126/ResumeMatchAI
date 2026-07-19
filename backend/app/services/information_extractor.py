import re
import json
import os

import spacy

nlp = spacy.load("en_core_web_sm")


# ------------------------------
# Load Skills Database
# ------------------------------

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
SKILLS_PATH = os.path.join(BASE_DIR, "data", "skills.json")

with open(SKILLS_PATH, "r") as file:
    SKILLS_DB = json.load(file)


# ------------------------------
# Email
# ------------------------------

def extract_email(text):

    match = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )

    return match.group(0) if match else None


# ------------------------------
# Phone
# ------------------------------

def extract_phone(text):

    match = re.search(
        r"(\+91[- ]?)?[6-9]\d{9}",
        text
    )

    return match.group(0) if match else None


# ------------------------------
# Skills
# ------------------------------

def extract_skills(text):

    found = []

    lower_text = text.lower()

    for skill in SKILLS_DB:

        if skill.lower() in lower_text:
            found.append(skill)

    return sorted(list(set(found)))


# ------------------------------
# Name
# ------------------------------

def extract_name(text):
    """
    Extract candidate name from the first few lines of a resume.
    Falls back to spaCy if needed.
    """

    lines = text.split("\n")

    # Check only the first few non-empty lines
    for line in lines[:5]:

        line = line.strip()

        if not line:
            continue

        # Ignore lines containing email or phone
        if "@" in line:
            continue

        if any(char.isdigit() for char in line):
            continue

        # Ignore very long lines
        if len(line.split()) <= 4:

            return line.title()

    # Fallback to spaCy
    doc = nlp(text)

    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text.title()

    return None


# ------------------------------
# Education
# ------------------------------

def extract_education(text):

    education = []

    keywords = [
        "10th",
        "12th",
        "B.E",
        "B.Tech",
        "Bachelor",
        "Master",
        "M.Tech",
        "Diploma"
    ]

    for word in keywords:

        if word.lower() in text.lower():
            education.append(word)

    return education


# ------------------------------
# Final Parser
# ------------------------------

def parse_resume(text):

    return {

        "name": extract_name(text),

        "email": extract_email(text),

        "phone": extract_phone(text),

        "skills": extract_skills(text),

        "education": extract_education(text)
    }