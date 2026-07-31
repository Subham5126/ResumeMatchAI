from app.services.resume_parser import extract_resume_text
from app.utils.text_cleaner import clean_resume_text

from app.services.information_extractor import parse_resume
from app.services.ai_resume_parser import ai_parse_resume
from app.services.resume_merger import merge_resume_data
from app.services.resume_validator import validate_resume

from app.services.job_parser import parse_job_description
from app.services.scoring_engine import calculate_skill_score

# Semantic matcher disabled for Render Free Tier
# from app.services.semantic_matcher import semantic_skill_match

from app.services.recommendation_engine import generate_recommendations
from app.services.ats_checker import calculate_ats_score

from app.services.ai_interview_generator import generate_ai_interview_questions
from app.services.interview_questions import generate_interview_questions

from app.services.ai_roadmap_generator import generate_ai_roadmap
from app.services.learning_roadmap import generate_learning_roadmap


def analyze_resume(resume_path, job_description):
    """
    Resume Analysis Pipeline (Render Free Tier Optimized)
    """

    # ======================================================
    # Resume Processing
    # ======================================================

    resume_text = extract_resume_text(resume_path)
    resume_text = clean_resume_text(resume_text)

    # ----------------------------
    # Regex Resume Parser
    # ----------------------------

    resume_data = parse_resume(resume_text)

    # ----------------------------
    # AI Resume Parser
    # ----------------------------

    try:
        print("=" * 60)
        print("Generating AI Resume Parsing...")
        print("=" * 60)

        ai_resume_data = ai_parse_resume(resume_text)

        ai_resume_data = validate_resume(ai_resume_data)

        resume_data = merge_resume_data(
            resume_data,
            ai_resume_data
        )

        print("AI Resume Parsing Successful.")

    except Exception as e:

        print("=" * 60)
        print("AI Resume Parsing Failed")
        print(e)
        print("Using Regex Resume Parser...")
        print("=" * 60)

    # ======================================================
    # Job Description
    # ======================================================

    job_data = parse_job_description(job_description)

    # ======================================================
    # Keyword Matching
    # ======================================================

    keyword_result = calculate_skill_score(
        resume_data["skills"],
        job_data["required_skills"]
    )

    # ======================================================
    # Semantic Matching Disabled
    # ======================================================

    semantic_result = {
        "semantic_score": keyword_result["score"],
        "matched": [],
        "missing": keyword_result["missing_skills"]
    }

    # ======================================================
    # Recommendations
    # ======================================================

    recommendations = generate_recommendations(
        keyword_result,
        semantic_result,
        resume_data
    )

    # ======================================================
    # ATS Checker
    # ======================================================

    ats_report = calculate_ats_score(
        resume_data,
        job_data,
        keyword_result
    )

    # ======================================================
    # AI Interview Questions
    # ======================================================

    try:

        interview_questions = generate_ai_interview_questions(
            resume_data=resume_data,
            job_data=job_data,
            matched_skills=keyword_result["matched_skills"],
            missing_skills=keyword_result["missing_skills"]
        )

    except Exception as e:

        print("=" * 60)
        print("AI Interview Generation Failed")
        print(e)
        print("Using Rule-Based Questions...")
        print("=" * 60)

        interview_questions = generate_interview_questions(
            keyword_result["matched_skills"],
            keyword_result["missing_skills"]
        )

    # ======================================================
    # AI Learning Roadmap
    # ======================================================

    try:

        learning_roadmap = generate_ai_roadmap(
            resume_data=resume_data,
            job_data=job_data,
            matched_skills=keyword_result["matched_skills"],
            missing_skills=keyword_result["missing_skills"],
            recommendations=recommendations
        )

    except Exception as e:

        print("=" * 60)
        print("AI Roadmap Generation Failed")
        print(e)
        print("Using Rule-Based Roadmap...")
        print("=" * 60)

        learning_roadmap = generate_learning_roadmap(
            keyword_result["missing_skills"]
        )

    # ======================================================
    # Overall Score
    # ======================================================

    overall_score = keyword_result["score"]

    # ======================================================
    # Final Response
    # ======================================================

    response = {
        "overall_score": overall_score,
        "resume": resume_data,
        "job": job_data,
        "keyword_analysis": keyword_result,
        "semantic_analysis": semantic_result,
        "recommendations": recommendations,
        "ats_report": ats_report,
        "interview_questions": interview_questions,
        "learning_roadmap": learning_roadmap
    }

    return response