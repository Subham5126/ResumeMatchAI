import os
from dotenv import load_dotenv

loaded = load_dotenv()

print("Dotenv loaded:", loaded)
print("Current directory:", os.getcwd())
print("GEMINI_API_KEY:", os.getenv("GEMINI_API_KEY"))
