def detect_intent(message: str) -> str:
    """
    Detect the user's intent from their message.
    """

    message = message.lower()

    if any(word in message for word in [
        "resume",
        "rewrite",
        "summary",
        "project",
        "experience"
    ]):
        return "resume"

    if any(word in message for word in [
        "ats",
        "score",
        "keyword"
    ]):
        return "ats"

    if any(word in message for word in [
        "interview",
        "question",
        "hr",
        "technical"
    ]):
        return "interview"

    if any(word in message for word in [
        "roadmap",
        "learn",
        "study",
        "career"
    ]):
        return "roadmap"

    if any(word in message for word in [
        "cover letter"
    ]):
        return "cover_letter"

    return "general"