from app.services.semantic_matcher import semantic_skill_match

resume = [
    "Python",
    "FastAPI",
    "RESTful API Development",
    "Git"
]

job = [
    "Python",
    "REST API",
    "Docker",
    "SQL"
]

result = semantic_skill_match(resume, job)

print(result)