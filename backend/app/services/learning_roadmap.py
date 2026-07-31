def generate_learning_roadmap(missing_skills):
    roadmap = []

    resources = {
        "docker": {
            "week": "Week 1",
            "title": "Learn Docker Basics",
            "resource": "https://docs.docker.com/get-started/",
            "project": "Containerize a FastAPI Application"
        },

        "aws": {
            "week": "Week 2",
            "title": "Learn AWS Fundamentals",
            "resource": "https://skillbuilder.aws/",
            "project": "Deploy FastAPI on EC2"
        },

        "machine learning": {
            "week": "Week 3",
            "title": "Machine Learning Basics",
            "resource": "https://scikit-learn.org/stable/tutorial/",
            "project": "Build a Movie Recommendation System"
        },

        "rest api": {
            "week": "Week 4",
            "title": "Master REST APIs",
            "resource": "https://fastapi.tiangolo.com/",
            "project": "Create a CRUD API"
        },

        "git": {
            "week": "Week 1",
            "title": "Git & GitHub",
            "resource": "https://git-scm.com/doc",
            "project": "Host your project on GitHub"
        },

        "mongodb": {
            "week": "Week 2",
            "title": "MongoDB Basics",
            "resource": "https://www.mongodb.com/docs/",
            "project": "Create a Student Database"
        }
    }

    for skill in missing_skills:
        key = skill.lower()

        if key in resources:
            roadmap.append(resources[key])

    return roadmap