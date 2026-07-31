"""
Recommendation Engine

Generates JOB-SPECIFIC recommendations.

NOTE:
Resume structure recommendations (email, phone,
education, etc.) belong to ATS Report and should
NOT be generated here.
"""


def generate_recommendations(
    keyword_result,
    semantic_result,
    resume_data
):
    recommendations = []

    # ---------------------------------------
    # Missing Skills (Highest Priority)
    # ---------------------------------------

    for skill in semantic_result.get("missing", []):

        recommendations.append({
            "category": "Skills",
            "priority": "High",
            "title": f"Add {skill}",
            "description": f"{skill} is required for this job but was not found in your resume.",
            "reason": "The job description explicitly mentions this skill.",
            "action": f"If you have experience with {skill}, include it in your Skills, Projects or Experience section."
        })

    # ---------------------------------------
    # Low Keyword Match
    # ---------------------------------------

    keyword_score = keyword_result.get("score", 0)

    if keyword_score < 60:

        recommendations.append({
            "category": "Optimization",
            "priority": "High",
            "title": "Improve Keyword Match",
            "description": "Your resume contains too few keywords from the job description.",
            "reason": "Recruiters and ATS systems search for job-specific keywords.",
            "action": "Use the terminology from the job description naturally throughout your resume."
        })

    # ---------------------------------------
    # Projects
    # ---------------------------------------

    projects = resume_data.get("projects", [])

    if projects:

        recommendations.append({
            "category": "Projects",
            "priority": "Medium",
            "title": "Add More Technical Details",
            "description": "Describe the technologies and your specific contributions in each project.",
            "reason": "Detailed projects help recruiters evaluate practical experience.",
            "action": "Mention frameworks, tools, APIs, databases and measurable results."
        })

    # ---------------------------------------
    # Experience
    # ---------------------------------------

    experience = resume_data.get("experience", [])

    if experience:

        recommendations.append({
            "category": "Experience",
            "priority": "Medium",
            "title": "Quantify Your Achievements",
            "description": "Use measurable achievements instead of generic responsibilities.",
            "reason": "Numbers make your impact easier to understand.",
            "action": "Example: Improved API response time by 35%."
        })

    # ---------------------------------------
    # Skills Ordering
    # ---------------------------------------

    matched = keyword_result.get("matched_skills", [])

    if len(matched) > 5:

        recommendations.append({
            "category": "Skills",
            "priority": "Low",
            "title": "Highlight Important Skills First",
            "description": "Place the most relevant job skills at the beginning of your Skills section.",
            "reason": "Recruiters scan resumes quickly.",
            "action": "Reorder your skills based on relevance to this role."
        })

    # ---------------------------------------
    # Remove duplicate titles
    # ---------------------------------------

    unique = {}

    for rec in recommendations:
        unique[rec["title"]] = rec

    recommendations = list(unique.values())

    # ---------------------------------------
    # Sort by priority
    # ---------------------------------------

    priority_order = {
        "High": 0,
        "Medium": 1,
        "Low": 2
    }

    recommendations.sort(
        key=lambda x: priority_order[x["priority"]]
    )

    return recommendations