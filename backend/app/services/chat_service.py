from app.services.ai_client import client, MODEL
from app.utils.prompt_builder import build_prompt
from app.utils.intent_detector import detect_intent


def ask_career_coach(
    question: str,
    analysis: dict,
    history: list | None = None
):
    """
    Main AI Career Coach function.
    """

    if history is None:
        history = []

    # Detect user's intent (reserved for future routing)
    intent = detect_intent(question)

    # Build prompts
    system_prompt, user_prompt = build_prompt(question, analysis)

    # Start messages with system prompt
    messages = [
        {
            "role": "system",
            "content": system_prompt
        }
    ]

    # Add previous conversation
    for message in history:
        if (
            isinstance(message, dict)
            and "role" in message
            and "content" in message
        ):
            messages.append(message)

    # Add current user message
    messages.append(
        {
            "role": "user",
            "content": user_prompt
        }
    )

    response = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        temperature=0.4,
        max_tokens=1200,
    )

    return {
        "intent": intent,
        "response": response.choices[0].message.content
    }