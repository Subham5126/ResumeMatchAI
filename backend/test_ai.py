from app.services.ai_roadmap_generator import generate_ai_roadmap

print("Starting test...")

result = generate_ai_roadmap(
    {},
    "",
    [],
    [],
    []
)

print(result)