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


def analyze_resume(resume_path, job_description):
    """
    Core Resume Analysis Pipeline — fast path, no expensive on-demand LLM calls.
    Interview questions & learning roadmap are generated on-demand via
    POST /generate/interview  and  POST /generate/roadmap.
    """

    # ======================================================
    # Resume Processing
    # ======================================================

    resume_text = extract_resume_text(resume_path)
    resume_text = clean_resume_text(resume_text)

    resume_data = parse_resume(resume_text)

    try:
        print("=" * 60)
        print("Generating AI Resume Parsing...")
        print("=" * 60)

        ai_resume_data = ai_parse_resume(resume_text)
        ai_resume_data = validate_resume(ai_resume_data)
        resume_data    = merge_resume_data(resume_data, ai_resume_data)

        print("AI Resume Parsing Successful.")

    except Exception as e:
        print("=" * 60)
        print("AI Resume Parsing Failed:", e)
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
    # Semantic Matching (disabled — mirrors keyword score)
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
    # Overall Score — weighted composite
    # ======================================================

    keyword_s  = keyword_result.get("score", 0)
    ats_s      = ats_report.get("ats_score", 0)
    semantic_s = semantic_result.get("semantic_score", keyword_s)
    overall_score = round(
        (keyword_s * 0.40) + (ats_s * 0.35) + (semantic_s * 0.25), 1
    )

    return {
        "overall_score": overall_score,
        "resume": resume_data,
        "job": job_data,
        "keyword_analysis": keyword_result,
        "semantic_analysis": semantic_result,
        "recommendations": recommendations,
        "ats_report": ats_report,
        # NOTE: interview_questions & learning_roadmap are NOT pre-generated.
        # They are fetched on-demand via /generate/interview & /generate/roadmap.
    }