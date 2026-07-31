import re


def calculate_ats_score(resume_data, job_data, keyword_result):
    score = 0

    passed_checks = []
    warnings = []
    failed_checks = []

    # -------------------------
    # Contact Information (10)
    # -------------------------

    contact_score = 0

    if resume_data.get("name"):
        contact_score += 3

    if resume_data.get("email"):
        contact_score += 4
    else:
        failed_checks.append("Email Address")

    if resume_data.get("phone"):
        contact_score += 3
    else:
        failed_checks.append("Phone Number")

    if contact_score == 10:
        passed_checks.append("Contact Information")
    else:
        warnings.append("Contact information is incomplete")

    score += contact_score

    # -------------------------
    # Education (10)
    # -------------------------

    education = resume_data.get("education", [])

    if education:
        score += 10
        passed_checks.append("Education Section")
    else:
        failed_checks.append("Education Section")

    # -------------------------
    # Skills (20)
    # -------------------------

    skills = resume_data.get("skills", [])

    if len(skills) >= 10:
        score += 20
        passed_checks.append("Strong Skills Section")

    elif len(skills) >= 7:
        score += 17
        passed_checks.append("Skills Section")
        warnings.append("Adding more relevant skills can improve ATS score")

    elif len(skills) >= 5:
        score += 14
        warnings.append("Skills section is average")

    elif len(skills) >= 3:
        score += 10
        warnings.append("Add more technical skills")

    else:
        score += 5
        failed_checks.append("Technical Skills")

    # -------------------------
    # Projects (10)
    # -------------------------

    projects = resume_data.get("projects", [])

    if projects:
        score += 10
        passed_checks.append("Projects Section")
    else:
        failed_checks.append("Projects Section")

    # -------------------------
    # Experience (20)
    # -------------------------

    experience = resume_data.get("experience", [])

    if len(experience) >= 2:
        score += 20
        passed_checks.append("Professional Experience")

    elif len(experience) == 1:
        score += 15
        warnings.append("More experience would strengthen the resume")

    else:
        score += 10
        failed_checks.append("Work Experience")

    # -------------------------
    # Certifications (10)
    # -------------------------

    certifications = resume_data.get("certifications", [])

    if certifications:
        score += 10
        passed_checks.append("Certifications")
    else:
        warnings.append("No certifications found")

    # -------------------------
    # Keyword Match (20)
    # -------------------------

    keyword_score = keyword_result.get("score", 0)

    score += keyword_score * 0.2

    if keyword_score >= 80:
        passed_checks.append("Keyword Optimization")

    elif keyword_score >= 60:
        warnings.append("Keyword match can be improved")

    else:
        failed_checks.append("Job-Specific Keywords")

    # -------------------------

    score = round(min(score, 100), 2)

    if score >= 85:
        overall_feedback = (
            "Excellent ATS compatibility. Your resume is well structured and highly optimized."
        )

    elif score >= 70:
        overall_feedback = (
            "Good ATS compatibility. A few improvements can further increase your chances."
        )

    elif score >= 50:
        overall_feedback = (
            "Average ATS compatibility. Improve missing sections and keyword matching."
        )

    else:
        overall_feedback = (
            "Poor ATS compatibility. Significant improvements are recommended."
        )

    return {
        "ats_score": score,
        "passed_checks": passed_checks,
        "warnings": warnings,
        "failed_checks": failed_checks,
        "feedback": overall_feedback,
    }