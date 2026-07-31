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
# Phone (International)
# ------------------------------

def extract_phone(text):
    pattern = r'(\+\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{4}'
    match = re.search(pattern, text)
    return match.group(0).strip() if match else None


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

    lines = text.split("\n")

    ignore = {
        "resume",
        "summary",
        "education",
        "experience",
        "skills",
        "projects",
        "certifications",
        "contact",
        "profile"
    }

    for line in lines[:8]:

        line = line.strip()

        if not line:
            continue

        if len(line) > 40:
            continue

        if any(char.isdigit() for char in line):
            continue

        if "@" in line:
            continue

        if line.lower() in ignore:
            continue

        words = line.split()

        if 1 < len(words) <= 4:
            return line.title()

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
        "Bachelor",
        "B.E",
        "B.Tech",
        "M.Tech",
        "Master",
        "MCA",
        "MBA",
        "Diploma",
        "PhD"
    ]

    lower = text.lower()

    for word in keywords:
        if word.lower() in lower:
            education.append(word)

    return list(set(education))


# ------------------------------
# GitHub
# ------------------------------

def extract_github(text):

    match = re.search(
        r"(https?://)?(www\.)?github\.com/[A-Za-z0-9_.-]+",
        text,
        re.IGNORECASE
    )

    return match.group(0) if match else None


# ------------------------------
# LinkedIn
# ------------------------------

def extract_linkedin(text):

    match = re.search(
        r"(https?://)?(www\.)?linkedin\.com/[A-Za-z0-9/_-]+",
        text,
        re.IGNORECASE
    )

    return match.group(0) if match else None


# ------------------------------
# Location
# ------------------------------

def extract_location(text):

    lines = text.split("\n")

    for line in lines[:15]:

        line = line.strip()

        if "," in line:

            if len(line) < 50:
                return line

    return None


# ------------------------------
# Summary
# ------------------------------

def extract_summary(text):

    match = re.search(
        r"SUMMARY(.*?)(EXPERIENCE|EDUCATION|PROJECTS|SKILLS|CERTIFICATIONS|$)",
        text,
        re.DOTALL | re.IGNORECASE
    )

    if match:
        return " ".join(match.group(1).split())

    return None


# ------------------------------
# Experience
# ------------------------------

def extract_experience(text):

    match = re.search(
        r"EXPERIENCE(.*?)(PROJECTS|EDUCATION|SKILLS|CERTIFICATIONS|KEY ACHIEVEMENTS|$)",
        text,
        re.DOTALL | re.IGNORECASE
    )

    if not match:
        return []

    content = match.group(1)

    jobs = []

    for line in content.split("\n"):

        line = line.strip()

        if len(line) > 4:
            jobs.append(line)

    return jobs


# ------------------------------
# Projects
# ------------------------------

def extract_projects(text):

    match = re.search(
        r"PROJECTS(.*?)(EDUCATION|SKILLS|CERTIFICATIONS|KEY ACHIEVEMENTS|$)",
        text,
        re.DOTALL | re.IGNORECASE
    )

    if not match:
        return []

    content = match.group(1)

    projects = []

    for line in content.split("\n"):

        line = line.strip()

        if len(line) > 4:
            projects.append(line)

    return projects


# ------------------------------
# Certifications
# ------------------------------

def extract_certifications(text):

    match = re.search(
        r"CERTIFICATIONS(.*?)(PROJECTS|EDUCATION|SKILLS|EXPERIENCE|$)",
        text,
        re.DOTALL | re.IGNORECASE
    )

    if not match:
        return []

    certs = []

    for line in match.group(1).split("\n"):

        line = line.strip()

        if len(line) > 3:
            certs.append(line)

    return certs


# ------------------------------
# Final Parser
# ------------------------------

def parse_resume(text):

    return {

        "name": extract_name(text),

        "email": extract_email(text),

        "phone": extract_phone(text),

        "location": extract_location(text),

        "summary": extract_summary(text),

        "skills": extract_skills(text),

        "education": extract_education(text),

        "experience": extract_experience(text),

        "projects": extract_projects(text),

        "certifications": extract_certifications(text),

        "github": extract_github(text),

        "linkedin": extract_linkedin(text)

    }