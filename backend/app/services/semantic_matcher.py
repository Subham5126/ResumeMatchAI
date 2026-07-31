import os

# Disable tokenizer parallelism to reduce memory usage
os.environ["TOKENIZERS_PARALLELISM"] = "false"

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import torch

# Lazy-loaded model
_model = None


def get_model():
    global _model

    if _model is None:
        print("Loading SentenceTransformer model...")
        _model = SentenceTransformer("all-MiniLM-L6-v2")

    return _model


def semantic_similarity(text1: str, text2: str):
    """
    Calculate cosine similarity between two texts using SentenceTransformer.
    """

    model = get_model()

    with torch.no_grad():
        emb1 = model.encode(
            [text1],
            convert_to_numpy=True
        )

        emb2 = model.encode(
            [text2],
            convert_to_numpy=True
        )

    score = cosine_similarity(emb1, emb2)[0][0]

    return float(score)


def semantic_skill_match(resume_skills, jd_skills, threshold=0.70):
    """
    Compare every resume skill with every job skill
    using semantic similarity.
    """

    matched = []
    missing = []

    for jd_skill in jd_skills:

        best_score = 0
        best_match = None

        for resume_skill in resume_skills:

            score = semantic_similarity(
                resume_skill,
                jd_skill
            )

            if score > best_score:
                best_score = score
                best_match = resume_skill

        if best_score >= threshold:

            matched.append({
                "job_skill": jd_skill,
                "matched_with": best_match,
                "similarity": round(best_score, 2)
            })

        else:
            missing.append(jd_skill)

    semantic_score = (
        round(len(matched) / len(jd_skills) * 100, 2)
        if jd_skills
        else 0
    )

    return {
        "semantic_score": semantic_score,
        "matched": matched,
        "missing": missing
    }