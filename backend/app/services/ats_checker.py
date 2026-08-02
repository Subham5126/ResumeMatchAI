import re


def calculate_ats_score(resume_data, job_data, keyword_result):
    score = 0
    passed_checks = []
    warnings = []
    failed_checks = []

    # ─────────────────────────────────────────
    # 1. CONTACT INFORMATION  (max 12 pts)
    # ─────────────────────────────────────────
    contact_pts = 0

    if resume_data.get("name"):
        contact_pts += 3
    else:
        failed_checks.append("Full Name Missing")

    email = resume_data.get("email", "")
    if email and re.match(r"[^@]+@[^@]+\.[^@]+", email):
        contact_pts += 4
    else:
        failed_checks.append("Email Address")

    phone = resume_data.get("phone", "")
    if phone and re.search(r"\d{7,}", re.sub(r"[\s\-\(\)\+]", "", phone)):
        contact_pts += 3
    else:
        failed_checks.append("Phone Number")

    if resume_data.get("location"):
        contact_pts += 2
    else:
        warnings.append("Location not specified (city/country recommended)")

    if contact_pts >= 10:
        passed_checks.append("Contact Information Complete")
    elif contact_pts >= 6:
        warnings.append("Contact information is partially complete")

    score += contact_pts

    # ─────────────────────────────────────────
    # 2. PROFESSIONAL SUMMARY  (max 8 pts)
    # ─────────────────────────────────────────
    summary = resume_data.get("summary", "")
    if len(summary) >= 100:
        score += 8
        passed_checks.append("Professional Summary")
    elif len(summary) >= 40:
        score += 5
        warnings.append("Professional summary is too short (aim for 3–5 sentences)")
    else:
        failed_checks.append("Professional Summary Missing")

    # ─────────────────────────────────────────
    # 3. SKILLS SECTION  (max 15 pts)
    # ─────────────────────────────────────────
    skills = resume_data.get("skills", [])
    num_skills = len(skills)

    if num_skills >= 12:
        score += 15
        passed_checks.append("Comprehensive Skills Section")
    elif num_skills >= 8:
        score += 12
        passed_checks.append("Strong Skills Section")
        warnings.append("Adding 4+ more skills can push you into the top tier")
    elif num_skills >= 5:
        score += 8
        warnings.append("Skills section is below average — aim for 10+ skills")
    elif num_skills >= 2:
        score += 4
        failed_checks.append("Insufficient Technical Skills Listed")
    else:
        failed_checks.append("Skills Section Empty or Missing")

    # ─────────────────────────────────────────
    # 4. WORK EXPERIENCE  (max 20 pts)
    # ─────────────────────────────────────────
    experience = resume_data.get("experience", [])
    num_exp = len(experience)

    exp_pts = 0
    if num_exp >= 3:
        exp_pts += 14
        passed_checks.append("Strong Work Experience (3+ roles)")
    elif num_exp == 2:
        exp_pts += 11
        passed_checks.append("Work Experience")
        warnings.append("A third experience entry would strengthen your profile")
    elif num_exp == 1:
        exp_pts += 7
        warnings.append("Only one experience entry found — add internships or freelance work")
    else:
        failed_checks.append("Work Experience Section Missing")

    # Check bullet quality: experiences with achievements
    exp_with_bullets = sum(
        1 for e in experience if len(e.get("achievements", [])) >= 2
    )
    if num_exp > 0:
        if exp_with_bullets == num_exp:
            exp_pts += 6
            passed_checks.append("Achievement-Driven Bullet Points")
        elif exp_with_bullets > 0:
            exp_pts += 3
            warnings.append("Some experience entries lack achievement bullets — quantify results")
        else:
            failed_checks.append("No Achievement Bullets in Experience")

    score += exp_pts

    # ─────────────────────────────────────────
    # 5. EDUCATION  (max 8 pts)
    # ─────────────────────────────────────────
    education = resume_data.get("education", [])

    if education:
        score += 8
        passed_checks.append("Education Section")
        # Bonus: check degree field is populated
        has_degree = any(e.get("degree") for e in education)
        if not has_degree:
            warnings.append("Degree name not clearly listed in education")
    else:
        failed_checks.append("Education Section Missing")

    # ─────────────────────────────────────────
    # 6. PROJECTS  (max 10 pts)
    # ─────────────────────────────────────────
    projects = resume_data.get("projects", [])
    num_proj = len(projects)

    if num_proj >= 3:
        score += 10
        passed_checks.append("Multiple Projects Showcased")
    elif num_proj >= 1:
        score += 7
        passed_checks.append("Projects Section")
        # Check for GitHub links in projects
        proj_with_github = sum(1 for p in projects if p.get("github"))
        if proj_with_github == 0:
            warnings.append("Add GitHub links to your projects for ATS and recruiter trust")
    else:
        failed_checks.append("Projects Section Missing")

    # Check projects have descriptions & tech stack
    proj_with_desc = sum(1 for p in projects if len(p.get("description", "")) > 30)
    proj_with_tech = sum(1 for p in projects if len(p.get("technologies", [])) >= 2)
    if num_proj > 0:
        if proj_with_desc < num_proj:
            warnings.append("Some projects lack sufficient descriptions")
        if proj_with_tech < num_proj:
            warnings.append("List technologies used in each project")

    # ─────────────────────────────────────────
    # 7. CERTIFICATIONS  (max 7 pts)
    # ─────────────────────────────────────────
    certifications = resume_data.get("certifications", [])

    if len(certifications) >= 2:
        score += 7
        passed_checks.append("Multiple Certifications")
    elif len(certifications) == 1:
        score += 4
        passed_checks.append("Certifications")
        warnings.append("More certifications (especially cloud/tech) improve recruiter trust")
    else:
        warnings.append("No certifications found — relevant certs can boost your score significantly")

    # ─────────────────────────────────────────
    # 8. ONLINE PRESENCE  (max 5 pts)
    # ─────────────────────────────────────────
    github = resume_data.get("github", [])
    linkedin = resume_data.get("linkedin", "")

    online_pts = 0
    if github and any(github):
        online_pts += 3
        passed_checks.append("GitHub Profile Linked")
    else:
        warnings.append("GitHub profile not found on resume")

    if linkedin:
        online_pts += 2
        passed_checks.append("LinkedIn Profile Linked")
    else:
        warnings.append("LinkedIn profile not found on resume")

    score += online_pts

    # ─────────────────────────────────────────
    # 9. KEYWORD MATCH  (max 15 pts)
    # ─────────────────────────────────────────
    keyword_score = keyword_result.get("score", 0)
    matched = keyword_result.get("matched_skills", [])
    missing = keyword_result.get("missing_skills", [])

    kw_pts = round(keyword_score * 0.15, 2)
    score += kw_pts

    if keyword_score >= 85:
        passed_checks.append("Excellent Keyword Match")
    elif keyword_score >= 70:
        passed_checks.append("Good Keyword Match")
        warnings.append(f"Add these keywords to hit 85%+: {', '.join(missing[:3])}" if missing else "Keyword match can still be improved")
    elif keyword_score >= 50:
        warnings.append(f"Keyword match is average — consider adding: {', '.join(missing[:4])}" if missing else "Keyword match needs improvement")
        failed_checks.append("Job-Specific Keyword Gap")
    else:
        failed_checks.append("Poor Keyword Match with Job Description")

    # Keyword density bonus: skills matching job keywords
    if matched and len(matched) >= 8:
        score += 2
        passed_checks.append("High Skill-to-Job Keyword Alignment")

    # ─────────────────────────────────────────
    # FINALIZE
    # ─────────────────────────────────────────
    score = round(min(score, 100), 1)

    if score >= 85:
        overall_feedback = (
            "Excellent ATS compatibility. Your resume is well-structured, "
            "keyword-optimised, and highly readable by applicant tracking systems."
        )
    elif score >= 70:
        overall_feedback = (
            "Good ATS compatibility. Minor improvements to keywords, bullet quality, "
            "or missing sections can push you into the top tier."
        )
    elif score >= 50:
        overall_feedback = (
            "Average ATS compatibility. Focus on enriching your experience bullets, "
            "adding more relevant skills, and matching the job description keywords."
        )
    else:
        overall_feedback = (
            "Poor ATS compatibility. Significant improvements are needed — "
            "add missing sections, quantify achievements, and align with job keywords."
        )

    return {
        "ats_score": score,
        "passed_checks": passed_checks,
        "warnings": warnings,
        "failed_checks": failed_checks,
        "feedback": overall_feedback,
    }