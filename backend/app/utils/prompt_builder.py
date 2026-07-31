from app.prompts.career_prompt import CAREER_COACH_PROMPT
from app.utils.context_formatter import format_analysis_context


def build_prompt(question: str, analysis: dict) -> tuple:
    """
    Build the system prompt and user prompt
    for the AI Career Coach.
    """

    system_prompt = CAREER_COACH_PROMPT

    context = format_analysis_context(analysis)

    user_prompt = f"""
Resume Analysis:

{context}

User Question:

{question}
"""

    return system_prompt, user_prompt