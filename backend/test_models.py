import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY"),
    http_options=types.HttpOptions(api_version="v1")
)

models = [
    "gemini-flash-latest",
    "gemini-flash-lite-latest",
    "gemini-3.5-flash"
]

for model in models:
    print("=" * 50)
    print(model)

    try:
        response = client.models.generate_content(
            model=model,
            contents="Say Hello"
        )

        print("SUCCESS")
        print(response.text)

    except Exception as e:
        print("FAILED")
        print(e)