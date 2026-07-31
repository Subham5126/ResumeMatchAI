def generate_interview_questions(resume_skills, missing_skills):
    question_bank = {
        "python": "Explain Python decorators with an example.",
        "java": "What is the difference between Abstract Class and Interface?",
        "sql": "Explain SQL JOIN types with examples.",
        "mysql": "What are indexes in MySQL?",
        "mongodb": "Difference between MongoDB and MySQL.",
        "docker": "Explain Docker Images and Containers.",
        "aws": "What is AWS EC2 and when would you use it?",
        "fastapi": "Explain dependency injection in FastAPI.",
        "react": "Explain the React component lifecycle and hooks.",
        "javascript": "Explain closures in JavaScript.",
        "html": "What is Semantic HTML?",
        "css": "Difference between Flexbox and CSS Grid.",
        "machine learning": "What is overfitting and how do you avoid it?",
        "tensorflow": "Explain TensorFlow tensors.",
        "pandas": "Difference between Series and DataFrame.",
        "numpy": "Why is NumPy faster than Python lists?",
        "git": "Explain Git merge and rebase.",
        "linux": "Difference between chmod and chown."
    }

    questions = []

    for skill in resume_skills:
        skill_lower = skill.lower()

        if skill_lower in question_bank:
            questions.append(question_bank[skill_lower])

    for skill in missing_skills:
        questions.append(
            f"How would you learn and apply {skill} in a real-world project?"
        )

    return questions[:10]