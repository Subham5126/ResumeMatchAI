def calculate_skill_score(resume_skills, jd_skills):
    """
    Calculates skill match percentage.
    """

    resume_set = {skill.lower() for skill in resume_skills}
    jd_set = {skill.lower() for skill in jd_skills}

    matched = resume_set.intersection(jd_set)
    missing = jd_set - resume_set

    if len(jd_set) == 0:
        score = 0
    else:
        score = round((len(matched) / len(jd_set)) * 100, 2)

    return {
        "score": score,
        "matched_skills": sorted(matched),
        "missing_skills": sorted(missing)
    }