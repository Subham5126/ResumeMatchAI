def validate_resume(data):
    defaults = {
        "name": "",
        "email": "",
        "phone": "",
        "location": "",
        "summary": "",
        "skills": [],
        "education": [],
        "experience": [],
        "projects": [],
        "certifications": [],
        "github": [],
        "linkedin": ""
    }

    for key, default in defaults.items():
        if key not in data:
            data[key] = default

    return data